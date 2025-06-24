/* eslint-disable no-unused-vars */
import { initTRPC, TRPCError } from "@trpc/server";
import { auth } from "./auth";
import { prisma } from "./prisma";
import superjson from "superjson";
import { ZodError } from "zod";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 */
export const createTRPCContext = async (opts: { req?: Request }) => {
  const session = await auth();

  return {
    session,
    prisma,
  };
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer.
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * 3. ROUTER & PROCEDURE HELPERS
 */
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

/**
 * Protected (authenticated) procedure
 */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      ...ctx,
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});
