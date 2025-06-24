import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/lib/trpc";
import { TRPCError } from "@trpc/server";
import {
  encryptText,
  decryptText,
  hashPassword,
  verifyPassword,
} from "@/lib/crypto";

export const secretRouter = createTRPCRouter({
  // Create a new secret
  create: protectedProcedure
    .input(
      z.object({
        content: z.string().min(1).max(10000),
        isOneTimeView: z.boolean().default(false),
        expiresIn: z
          .number()
          .min(1)
          .max(7 * 24 * 60 * 60 * 1000)
          .optional(), // Max 7 days in milliseconds
        password: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { content, isOneTimeView, expiresIn, password } = input;

      const encryptedContent = encryptText(content);
      const expiresAt = expiresIn ? new Date(Date.now() + expiresIn) : null;
      const hasPassword = !!password;
      const passwordHash = password ? hashPassword(password) : null;

      const secret = await ctx.prisma.secret.create({
        data: {
          encryptedContent,
          isOneTimeView,
          expiresAt,
          hasPassword,
          passwordHash,
          userId: ctx.session.user.id,
        },
      });

      return {
        id: secret.id,
        token: secret.token,
        url: `/secret/${secret.token}`,
      };
    }),
  // View a secret by token
  getByToken: publicProcedure
    .input(
      z.object({
        token: z.string(),
        password: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { token, password } = input;

      const secret = await ctx.prisma.secret.findUnique({
        where: { token },
        include: { user: { select: { name: true } } },
      });

      if (!secret) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Secret not found or has been deleted",
        });
      }

      // Check if secret is expired
      if (secret.expiresAt && secret.expiresAt < new Date()) {
        await ctx.prisma.secret.update({
          where: { id: secret.id },
          data: { status: "EXPIRED" },
        });
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "This secret has expired",
        });
      }

      // Check if secret was already viewed (one-time)
      if (secret.isOneTimeView && secret.isViewed) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "This secret has already been viewed",
        });
      }

      // Check if secret is not active
      if (secret.status !== "ACTIVE") {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "This secret is no longer available",
        });
      }

      // Check password if required
      if (secret.hasPassword) {
        if (!password) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Password required",
          });
        }
        if (
          !secret.passwordHash ||
          !verifyPassword(password, secret.passwordHash)
        ) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Invalid password",
          });
        }
      }

      // Mark as viewed if one-time view
      if (secret.isOneTimeView) {
        await ctx.prisma.secret.update({
          where: { id: secret.id },
          data: {
            isViewed: true,
            viewedAt: new Date(),
            status: "VIEWED",
          },
        });
      }

      // Decrypt and return content
      const content = decryptText(secret.encryptedContent);

      return {
        content,
        createdAt: secret.createdAt,
        createdBy: secret.user?.name || "Anonymous",
        isOneTimeView: secret.isOneTimeView,
      };
    }),

  // Get user's secrets (dashboard)
  getMySecrets: protectedProcedure.query(async ({ ctx }) => {
    const secrets = await ctx.prisma.secret.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        token: true,
        isOneTimeView: true,
        hasPassword: true,
        expiresAt: true,
        isViewed: true,
        viewedAt: true,
        status: true,
        createdAt: true,
      },
    });
    return secrets.map((secret: (typeof secrets)[0]) => ({
      ...secret,
      url: `/secret/${secret.token}`,
      isExpired: secret.expiresAt ? secret.expiresAt < new Date() : false,
    }));
  }),

  // Delete a secret
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const secret = await ctx.prisma.secret.findUnique({
        where: { id: input.id },
        select: { userId: true },
      });

      if (!secret || secret.userId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Secret not found",
        });
      }

      await ctx.prisma.secret.update({
        where: { id: input.id },
        data: { status: "DELETED" },
      });

      return { success: true };
    }),

  // Get secret info without content (for preview)
  getInfo: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ ctx, input }) => {
      const secret = await ctx.prisma.secret.findUnique({
        where: { token: input.token },
        select: {
          hasPassword: true,
          isOneTimeView: true,
          expiresAt: true,
          isViewed: true,
          status: true,
          createdAt: true,
          user: { select: { name: true } },
        },
      });

      if (!secret) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Secret not found",
        });
      }

      const isExpired = secret.expiresAt
        ? secret.expiresAt < new Date()
        : false;
      const isAvailable =
        secret.status === "ACTIVE" &&
        !isExpired &&
        !(secret.isOneTimeView && secret.isViewed);

      return {
        hasPassword: secret.hasPassword,
        isOneTimeView: secret.isOneTimeView,
        expiresAt: secret.expiresAt,
        isExpired,
        isAvailable,
        createdAt: secret.createdAt,
        createdBy: secret.user?.name || "Anonymous",
      };
    }),
});
