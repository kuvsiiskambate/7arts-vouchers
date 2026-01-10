import { initTRPC, TRPCError } from '@/server/trpc'
import { type Session } from 'next-auth'
import { db } from '@/lib/db'
import superjson from 'superjson'

interface CreateContextOptions {
  session: Session | null
}

export const createTRPCContext = async (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    db,
  }
}

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape
  },
})

export const router = t.router
export const publicProcedure = t.procedure

// Protected procedure (requires authentication)
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  })
})

// Admin procedure (requires admin role)
export const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.session.user.role !== 'ADMIN' && ctx.session.user.role !== 'MODERATOR') {
    throw new TRPCError({ code: 'FORBIDDEN' })
  }
  return next({ ctx })
})
