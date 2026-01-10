# hub.7arts.bg — Technical Stack & Implementation Plan

## Architecture Overview

### Full-Stack TypeScript Architecture
```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js 14)                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  App Router  │  │   Tailwind   │  │   Components │  │
│  │  (RSC + SSR) │  │   7Arts CSS  │  │   Brutal UI  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│              API LAYER (Next.js API Routes)             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   tRPC v11   │  │  NextAuth.js │  │   Webhooks   │  │
│  │  (Type-safe) │  │   (Auth)     │  │   (Stripe)   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│            BUSINESS LOGIC (Server Actions)              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Campaigns  │  │    Events    │  │     Jobs     │  │
│  │   Pledges    │  │   Ticketing  │  │     Gigs     │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│              DATA LAYER (Prisma ORM)                    │
│  ┌──────────────────────────────────────────────────┐  │
│  │              PostgreSQL Database                  │  │
│  │  Users • Campaigns • Events • Jobs • Venues      │  │
│  │  Pledges • Reviews • Transactions • Analytics    │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                  EXTERNAL SERVICES                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │    Stripe    │  │  Google Maps │  │   SendGrid   │  │
│  │   Connect    │  │     API      │  │    (Email)   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend
- **Framework**: Next.js 14.2+ (App Router, React Server Components)
- **Language**: TypeScript 5.8+
- **Styling**: Tailwind CSS 3.4+ (7Arts brutal theme)
- **State Management**: Zustand (client state) + React Query (server state)
- **Forms**: React Hook Form + Zod validation
- **UI Components**: shadcn/ui (customized with 7Arts theme)
- **Icons**: Lucide React
- **Maps**: Mapbox GL JS (for Cultural Map)
- **Charts**: Recharts (for dashboards)

### Backend
- **API**: Next.js API Routes + tRPC v11 (type-safe APIs)
- **ORM**: Prisma 6+ (PostgreSQL)
- **Authentication**: NextAuth.js v5 (with credentials, OAuth, magic links)
- **Validation**: Zod (shared schemas between client/server)
- **File Upload**: UploadThing or AWS S3 + Presigned URLs
- **Background Jobs**: Inngest or BullMQ (for email, notifications, cleanup)
- **Rate Limiting**: Upstash Redis

### Database
- **Primary**: PostgreSQL 16+ (hosted on Neon, Supabase, or Railway)
- **Schema**: Prisma schema with full-text search, JSON fields, relations
- **Cache**: Redis (Upstash for serverless)
- **Search**: PostgreSQL full-text search + pg_trgm extension

### Payments
- **Provider**: Stripe Connect (Express accounts for artists)
- **Features**: Escrow, split payments, subscriptions, invoicing
- **Compliance**: PSD2, SCA (3D Secure), GDPR

### Infrastructure
- **Hosting**: Vercel (frontend + API routes, serverless)
- **Database**: Neon PostgreSQL (serverless, free tier)
- **CDN**: Vercel Edge Network
- **Monitoring**: Sentry (errors) + Vercel Analytics
- **CI/CD**: GitHub Actions (automated tests, deployment)

---

## Design System (7Arts Brutal Theme)

### Color Palette
```typescript
const colors = {
  brand: {
    dark: '#0B1120',      // Primary background
    surface: '#111827',   // Card backgrounds
    blue: '#1E3A8A',      // Secondary accent
    neon: '#00E5FF',      // Primary neon cyan
    neonHover: '#00B8CC', // Neon hover state
    neonDim: '#0080A0',   // Dimmed neon for borders
  },
  semantic: {
    success: '#10B981',   // Green
    warning: '#F59E0B',   // Amber
    error: '#EF4444',     // Red
    info: '#3B82F6',      // Blue
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#9CA3AF',
    muted: '#6B7280',
  }
}
```

### Typography
- **Primary Font**: Montserrat (300, 400, 600, 700)
- **Heading Scale**: text-4xl, text-3xl, text-2xl, text-xl
- **Body**: text-base (16px), text-sm (14px)

### Components Style Guide
1. **Glass Cards**: `backdrop-blur-lg bg-brand-blue/15 border border-brand-neon/10`
2. **Neon Buttons**: `bg-brand-neon hover:bg-brand-neonHover shadow-[0_0_15px_rgba(0,229,255,0.3)]`
3. **Input Fields**: Dark with neon focus ring
4. **Modals**: Full-screen glass overlay with centered card
5. **Navigation**: Fixed top bar, glass effect, neon active states

---

## Database Schema (Prisma)

### Core Models

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
  previewFeatures = ["fullTextSearch", "postgresqlExtensions"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  extensions = [pg_trgm]
}

// ============================================
// USERS & AUTHENTICATION
// ============================================

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  emailVerified DateTime?
  name          String?
  image         String?
  role          UserRole  @default(ARTIST)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  accounts      Account[]
  sessions      Session[]
  profile       Profile?
  campaigns     Campaign[]
  pledges       Pledge[]
  events        Event[]
  jobs          Job[]
  reviews       Review[]

  @@index([email])
}

enum UserRole {
  ARTIST
  VENUE
  ORGANIZATION
  SPONSOR
  BACKER
  ADMIN
}

model Profile {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Basic info
  bio             String?  @db.Text
  location        String?
  website         String?
  socialLinks     Json?    // { facebook, instagram, youtube, etc }

  // Artist-specific
  genres          String[]
  skills          String[]
  portfolio       Json?    // Array of media items

  // Verification
  verified        Boolean  @default(false)
  verifiedAt      DateTime?
  idVerified      Boolean  @default(false)

  // Reputation
  reputationScore Float    @default(0)
  completionRate  Float    @default(0)

  // Stripe
  stripeAccountId String?  @unique

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([userId])
}

// ============================================
// CAMPAIGNS (FUNDING & CROWDFUNDING)
// ============================================

model Campaign {
  id              String         @id @default(cuid())
  creatorId       String
  creator         User           @relation(fields: [creatorId], references: [id])

  // Basic info
  title           String
  slug            String         @unique
  description     String         @db.Text
  category        CampaignCategory
  coverImage      String
  mediaGallery    Json?          // Array of images/videos

  // Funding
  fundingMode     FundingMode
  goalAmount      Decimal        @db.Decimal(10, 2)
  raisedAmount    Decimal        @default(0) @db.Decimal(10, 2)
  currency        String         @default("BGN")

  // Timeline
  startDate       DateTime       @default(now())
  endDate         DateTime

  // Status
  status          CampaignStatus @default(DRAFT)
  publishedAt     DateTime?

  // Budget (transparent breakdown)
  budgetBreakdown Json?          // Array of line items

  // Relations
  rewards         Reward[]
  pledges         Pledge[]
  updates         CampaignUpdate[]

  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt

  @@index([creatorId])
  @@index([status])
  @@index([category])
  @@index([endDate])
}

enum CampaignCategory {
  THEATER
  MUSIC
  FILM
  VISUAL_ARTS
  DANCE
  LITERATURE
  OTHER
}

enum FundingMode {
  ALL_OR_NOTHING
  FLEXIBLE
  PRE_SALE
  PATRONAGE
}

enum CampaignStatus {
  DRAFT
  UNDER_REVIEW
  ACTIVE
  SUCCESSFUL
  FAILED
  CANCELED
}

model Reward {
  id              String   @id @default(cuid())
  campaignId      String
  campaign        Campaign @relation(fields: [campaignId], references: [id], onDelete: Cascade)

  title           String
  description     String   @db.Text
  price           Decimal  @db.Decimal(10, 2)
  deliveryDate    DateTime?
  quantityTotal   Int?
  quantityClaimed Int      @default(0)

  // Fulfillment
  shippingRequired Boolean @default(false)
  digitalDelivery  Boolean @default(false)

  pledges         Pledge[]

  createdAt       DateTime @default(now())

  @@index([campaignId])
}

model Pledge {
  id              String       @id @default(cuid())
  campaignId      String
  campaign        Campaign     @relation(fields: [campaignId], references: [id])
  backerId        String
  backer          User         @relation(fields: [backerId], references: [id])
  rewardId        String?
  reward          Reward?      @relation(fields: [rewardId], references: [id])

  amount          Decimal      @db.Decimal(10, 2)
  status          PledgeStatus @default(PENDING)

  // Payment
  stripePaymentIntentId String?
  stripeFee       Decimal?     @db.Decimal(10, 2)
  platformFee     Decimal?     @db.Decimal(10, 2)

  // Fulfillment
  fulfilled       Boolean      @default(false)
  fulfilledAt     DateTime?
  trackingNumber  String?

  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt

  @@index([campaignId])
  @@index([backerId])
  @@index([status])
}

enum PledgeStatus {
  PENDING
  AUTHORIZED
  CAPTURED
  REFUNDED
  FAILED
  CHARGEBACK
}

model CampaignUpdate {
  id         String   @id @default(cuid())
  campaignId String
  campaign   Campaign @relation(fields: [campaignId], references: [id], onDelete: Cascade)

  title      String
  content    String   @db.Text
  media      Json?    // Array of images/videos

  createdAt  DateTime @default(now())

  @@index([campaignId])
}

// ============================================
// EVENTS & TICKETING
// ============================================

model Event {
  id              String       @id @default(cuid())
  organizerId     String
  organizer       User         @relation(fields: [organizerId], references: [id])
  venueId         String?
  venue           Venue?       @relation(fields: [venueId], references: [id])

  // Basic info
  title           String
  slug            String       @unique
  description     String       @db.Text
  category        EventCategory
  coverImage      String

  // Location
  locationName    String
  address         String
  city            String
  latitude        Float?
  longitude       Float?

  // Schedule
  startDate       DateTime
  endDate         DateTime?
  timezone        String       @default("Europe/Sofia")

  // Ticketing
  capacity        Int?
  ticketsSold     Int          @default(0)

  // Status
  status          EventStatus  @default(DRAFT)
  publishedAt     DateTime?

  // Relations
  tickets         Ticket[]
  reviews         Review[]

  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt

  @@index([organizerId])
  @@index([venueId])
  @@index([status])
  @@index([startDate])
  @@index([city])
}

enum EventCategory {
  THEATER
  CONCERT
  EXHIBITION
  SCREENING
  WORKSHOP
  FESTIVAL
  OTHER
}

enum EventStatus {
  DRAFT
  PUBLISHED
  SOLD_OUT
  CANCELED
  COMPLETED
}

model Ticket {
  id              String       @id @default(cuid())
  eventId         String
  event           Event        @relation(fields: [eventId], references: [id])

  name            String       // e.g., "Early Bird", "VIP"
  description     String?
  price           Decimal      @db.Decimal(10, 2)
  quantity        Int
  sold            Int          @default(0)

  // Sales period
  salesStart      DateTime?
  salesEnd        DateTime?

  createdAt       DateTime     @default(now())

  @@index([eventId])
}

model Venue {
  id              String   @id @default(cuid())
  name            String
  slug            String   @unique
  description     String?  @db.Text

  // Location
  address         String
  city            String
  latitude        Float
  longitude       Float

  // Capacity
  capacity        Int?
  amenities       String[]

  // Contact
  website         String?
  email           String?
  phone           String?

  // Relations
  events          Event[]

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([city])
  @@index([slug])
}

// ============================================
// JOBS & GIGS
// ============================================

model Job {
  id              String     @id @default(cuid())
  posterId        String
  poster          User       @relation(fields: [posterId], references: [id])

  title           String
  description     String     @db.Text
  category        JobCategory
  type            JobType

  // Budget
  budgetMin       Decimal?   @db.Decimal(10, 2)
  budgetMax       Decimal?   @db.Decimal(10, 2)
  currency        String     @default("BGN")

  // Location
  location        String
  remote          Boolean    @default(false)

  // Timeline
  startDate       DateTime?
  endDate         DateTime?

  // Requirements
  skills          String[]
  experienceLevel String?

  // Status
  status          JobStatus  @default(OPEN)

  createdAt       DateTime   @default(now())
  updatedAt       DateTime   @updatedAt

  @@index([posterId])
  @@index([status])
  @@index([category])
}

enum JobCategory {
  PERFORMANCE
  TECHNICAL_CREW
  CREATIVE
  ADMINISTRATIVE
  TEACHING
  OTHER
}

enum JobType {
  FULL_TIME
  PART_TIME
  GIG
  PROJECT
}

enum JobStatus {
  OPEN
  CLOSED
  FILLED
}

// ============================================
// REVIEWS & REPUTATION
// ============================================

model Review {
  id          String   @id @default(cuid())
  reviewerId  String
  reviewer    User     @relation(fields: [reviewerId], references: [id])
  eventId     String?
  event       Event?   @relation(fields: [eventId], references: [id])

  rating      Int      // 1-5
  content     String?  @db.Text
  verified    Boolean  @default(false) // Did reviewer attend/back?

  createdAt   DateTime @default(now())

  @@index([reviewerId])
  @@index([eventId])
}

// ============================================
// NEXTAUTH MODELS
// ============================================

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}
```

---

## API Structure (tRPC)

### Router Organization
```
app/api/trpc/
├── routers/
│   ├── campaign.ts      # Campaign CRUD, pledge, updates
│   ├── event.ts         # Event CRUD, ticketing
│   ├── job.ts           # Job CRUD, applications
│   ├── profile.ts       # Profile management
│   ├── review.ts        # Review CRUD
│   ├── payment.ts       # Stripe integration
│   └── admin.ts         # Admin operations
├── context.ts           # tRPC context (user session, db)
└── root.ts              # Root router
```

### Example tRPC Router
```typescript
// app/api/trpc/routers/campaign.ts
import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';

export const campaignRouter = router({
  // Public: List campaigns
  list: publicProcedure
    .input(z.object({
      category: z.nativeEnum(CampaignCategory).optional(),
      status: z.nativeEnum(CampaignStatus).optional(),
      limit: z.number().min(1).max(100).default(20),
      cursor: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      const campaigns = await ctx.db.campaign.findMany({
        where: {
          category: input.category,
          status: input.status || 'ACTIVE',
        },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: 'desc' },
        include: {
          creator: {
            select: { id: true, name: true, image: true },
          },
          _count: {
            select: { pledges: true },
          },
        },
      });

      let nextCursor: typeof input.cursor | undefined = undefined;
      if (campaigns.length > input.limit) {
        const nextItem = campaigns.pop();
        nextCursor = nextItem!.id;
      }

      return { campaigns, nextCursor };
    }),

  // Protected: Create campaign
  create: protectedProcedure
    .input(z.object({
      title: z.string().min(5).max(100),
      description: z.string().min(50),
      category: z.nativeEnum(CampaignCategory),
      fundingMode: z.nativeEnum(FundingMode),
      goalAmount: z.number().positive(),
      endDate: z.date(),
    }))
    .mutation(async ({ ctx, input }) => {
      const slug = generateSlug(input.title);

      return await ctx.db.campaign.create({
        data: {
          ...input,
          slug,
          creatorId: ctx.session.user.id,
          status: 'DRAFT',
        },
      });
    }),

  // Protected: Pledge to campaign
  pledge: protectedProcedure
    .input(z.object({
      campaignId: z.string(),
      amount: z.number().positive(),
      rewardId: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // 1. Create Stripe PaymentIntent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: input.amount * 100, // cents
        currency: 'bgn',
        metadata: {
          campaignId: input.campaignId,
          backerId: ctx.session.user.id,
        },
      });

      // 2. Create pledge record
      return await ctx.db.pledge.create({
        data: {
          campaignId: input.campaignId,
          backerId: ctx.session.user.id,
          rewardId: input.rewardId,
          amount: input.amount,
          status: 'PENDING',
          stripePaymentIntentId: paymentIntent.id,
        },
      });
    }),
});
```

---

## Authentication (NextAuth.js)

### Configuration
```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/db';

export const authOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Verify email/password
        const user = await verifyCredentials(credentials);
        return user;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

---

## Deployment

### Environment Variables
```bash
# Database
DATABASE_URL="postgresql://user:pass@host:5432/hub7arts"

# NextAuth
NEXTAUTH_URL="https://hub.7arts.bg"
NEXTAUTH_SECRET="<random-secret>"

# OAuth
GOOGLE_CLIENT_ID="<google-oauth-id>"
GOOGLE_CLIENT_SECRET="<google-oauth-secret>"

# Stripe
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email
SENDGRID_API_KEY="<sendgrid-key>"

# Maps
NEXT_PUBLIC_MAPBOX_TOKEN="<mapbox-token>"

# Redis
UPSTASH_REDIS_URL="<redis-url>"
```

### Vercel Deployment
1. Push to GitHub
2. Import project to Vercel
3. Set environment variables
4. Deploy automatically on push to `main`

---

## Next Steps

1. **Initialize Next.js project** with TypeScript + Tailwind
2. **Set up Prisma** with PostgreSQL database
3. **Create design system** components (buttons, cards, inputs)
4. **Build authentication** flow (login, register, profile)
5. **Implement Campaign module** (create, pledge, view)
6. **Integrate Stripe** Connect for payments
7. **Build other modules** (events, jobs, profiles)
8. **Deploy to production** on Vercel

This is the foundation for building Bulgaria's national cultural operating system.
