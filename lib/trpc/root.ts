import { router } from './trpc'
import { campaignRouter } from './routers/campaign'

export const appRouter = router({
  campaign: campaignRouter,
  // Add more routers here as we build them:
  // event: eventRouter,
  // job: jobRouter,
  // profile: profileRouter,
  // review: reviewRouter,
})

export type AppRouter = typeof appRouter
