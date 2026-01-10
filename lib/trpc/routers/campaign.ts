import { z } from 'zod'
import { router, publicProcedure, protectedProcedure } from '../trpc'
import { TRPCError } from '@trpc/server'
import { generateSlug } from '@/lib/utils/format'

// Zod schemas for validation
const createCampaignSchema = z.object({
  title: z.string().min(5, 'Заглавието трябва да е поне 5 символа').max(100),
  description: z.string().min(50, 'Описанието трябва да е поне 50 символа'),
  shortDescription: z.string().max(200).optional(),
  category: z.enum(['THEATER', 'MUSIC', 'FILM', 'VISUAL_ARTS', 'DANCE', 'LITERATURE', 'PHOTOGRAPHY', 'DESIGN', 'CRAFTS', 'OTHER']),
  fundingMode: z.enum(['ALL_OR_NOTHING', 'FLEXIBLE', 'PRE_SALE', 'PATRONAGE']),
  goalAmount: z.number().positive('Целта трябва да е положително число'),
  endDate: z.date().min(new Date(), 'Крайният срок трябва да е в бъдещето'),
  coverImage: z.string().url().optional(),
  videoUrl: z.string().url().optional(),
  budgetBreakdown: z.array(z.object({
    category: z.string(),
    amount: z.number(),
    description: z.string().optional(),
  })).optional(),
})

const listCampaignsSchema = z.object({
  category: z.enum(['THEATER', 'MUSIC', 'FILM', 'VISUAL_ARTS', 'DANCE', 'LITERATURE', 'PHOTOGRAPHY', 'DESIGN', 'CRAFTS', 'OTHER']).optional(),
  status: z.enum(['DRAFT', 'UNDER_REVIEW', 'ACTIVE', 'SUCCESSFUL', 'FAILED', 'CANCELED', 'COMPLETED']).optional(),
  search: z.string().optional(),
  limit: z.number().min(1).max(100).default(20),
  cursor: z.string().optional(),
})

const pledgeSchema = z.object({
  campaignId: z.string(),
  amount: z.number().positive('Сумата трябва да е положителна'),
  rewardId: z.string().optional(),
  anonymous: z.boolean().default(false),
  backerName: z.string().optional(),
  backerEmail: z.string().email().optional(),
  shippingAddress: z.object({
    line1: z.string(),
    line2: z.string().optional(),
    city: z.string(),
    zip: z.string(),
    country: z.string().default('Bulgaria'),
  }).optional(),
})

export const campaignRouter = router({
  // List campaigns with filtering and pagination
  list: publicProcedure
    .input(listCampaignsSchema)
    .query(async ({ ctx, input }) => {
      const { category, status, search, limit, cursor } = input

      const where: any = {}

      // Filter by category
      if (category) {
        where.category = category
      }

      // Filter by status (default to ACTIVE for public listing)
      where.status = status || 'ACTIVE'

      // Search in title and description
      if (search) {
        where.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ]
      }

      const campaigns = await ctx.db.campaign.findMany({
        where,
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: 'desc' },
        include: {
          creator: {
            select: {
              id: true,
              name: true,
              image: true,
              profile: {
                select: {
                  verified: true,
                  location: true,
                },
              },
            },
          },
          _count: {
            select: {
              pledges: true,
              updates: true,
            },
          },
        },
      })

      let nextCursor: typeof cursor | undefined = undefined
      if (campaigns.length > limit) {
        const nextItem = campaigns.pop()
        nextCursor = nextItem!.id
      }

      return {
        campaigns,
        nextCursor,
      }
    }),

  // Get single campaign by slug
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      const campaign = await ctx.db.campaign.findUnique({
        where: { slug: input.slug },
        include: {
          creator: {
            select: {
              id: true,
              name: true,
              image: true,
              profile: {
                select: {
                  bio: true,
                  verified: true,
                  location: true,
                  reputationScore: true,
                  totalProjects: true,
                  successfulProjects: true,
                },
              },
            },
          },
          rewards: {
            orderBy: { position: 'asc' },
          },
          pledges: {
            where: { status: 'SUCCEEDED' },
            include: {
              backer: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
            orderBy: { createdAt: 'desc' },
          },
          updates: {
            orderBy: { createdAt: 'desc' },
            take: 5,
          },
          _count: {
            select: {
              pledges: true,
              updates: true,
            },
          },
        },
      })

      if (!campaign) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Campaign not found',
        })
      }

      // Increment views
      await ctx.db.campaign.update({
        where: { id: campaign.id },
        data: { views: { increment: 1 } },
      })

      return campaign
    }),

  // Create new campaign (protected)
  create: protectedProcedure
    .input(createCampaignSchema)
    .mutation(async ({ ctx, input }) => {
      const slug = generateSlug(input.title)

      // Calculate duration in days
      const durationDays = Math.ceil(
        (input.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
      )

      const campaign = await ctx.db.campaign.create({
        data: {
          ...input,
          slug,
          duration: durationDays,
          creatorId: ctx.session.user.id,
          status: 'DRAFT',
        },
      })

      return campaign
    }),

  // Update campaign (protected, owner only)
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        data: createCampaignSchema.partial(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Check ownership
      const existing = await ctx.db.campaign.findUnique({
        where: { id: input.id },
        select: { creatorId: true },
      })

      if (!existing || existing.creatorId !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only edit your own campaigns',
        })
      }

      return await ctx.db.campaign.update({
        where: { id: input.id },
        data: input.data,
      })
    }),

  // Publish campaign (submit for review)
  publish: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const campaign = await ctx.db.campaign.findUnique({
        where: { id: input.id },
        select: { creatorId: true, status: true },
      })

      if (!campaign || campaign.creatorId !== ctx.session.user.id) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only publish your own campaigns',
        })
      }

      if (campaign.status !== 'DRAFT') {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Campaign is already published',
        })
      }

      // Auto-approve campaigns under 5000 BGN, otherwise send for review
      const updated = await ctx.db.campaign.update({
        where: { id: input.id },
        data: {
          status: 'UNDER_REVIEW', // Will be auto-approved by background job or admin
          publishedAt: new Date(),
        },
      })

      return updated
    }),

  // Create pledge (protected)
  pledge: protectedProcedure
    .input(pledgeSchema)
    .mutation(async ({ ctx, input }) => {
      const campaign = await ctx.db.campaign.findUnique({
        where: { id: input.campaignId },
        include: { reward: true },
      })

      if (!campaign) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Campaign not found',
        })
      }

      if (campaign.status !== 'ACTIVE') {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Campaign is not active',
        })
      }

      if (new Date() > campaign.endDate) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Campaign has ended',
        })
      }

      // Check reward availability if reward selected
      if (input.rewardId) {
        const reward = await ctx.db.reward.findUnique({
          where: { id: input.rewardId },
        })

        if (!reward) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Reward not found',
          })
        }

        if (reward.quantityTotal && reward.quantityClaimed >= reward.quantityTotal) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Reward is sold out',
          })
        }
      }

      // Create pledge (payment will be handled separately via Stripe)
      const pledge = await ctx.db.pledge.create({
        data: {
          campaignId: input.campaignId,
          backerId: ctx.session.user.id,
          rewardId: input.rewardId,
          amount: input.amount,
          anonymous: input.anonymous,
          backerName: input.backerName,
          backerEmail: input.backerEmail,
          shippingAddress: input.shippingAddress as any,
          status: 'PENDING',
        },
      })

      return pledge
    }),

  // Get user's campaigns (protected)
  myCampaigns: protectedProcedure
    .query(async ({ ctx }) => {
      return await ctx.db.campaign.findMany({
        where: { creatorId: ctx.session.user.id },
        include: {
          _count: {
            select: {
              pledges: true,
              updates: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      })
    }),

  // Get user's pledges (protected)
  myPledges: protectedProcedure
    .query(async ({ ctx }) => {
      return await ctx.db.pledge.findMany({
        where: { backerId: ctx.session.user.id },
        include: {
          campaign: {
            select: {
              id: true,
              title: true,
              slug: true,
              coverImage: true,
              status: true,
              goalAmount: true,
              raisedAmount: true,
            },
          },
          reward: true,
        },
        orderBy: { createdAt: 'desc' },
      })
    }),
})
