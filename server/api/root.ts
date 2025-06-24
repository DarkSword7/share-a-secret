import { createTRPCRouter } from "@/lib/trpc";
import { secretRouter } from "./routers/secret";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  secret: secretRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
