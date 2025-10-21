import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { prisma } from '../db';

export const usersRouter = router({
  // Get all users
  getAll: publicProcedure.query(async () => {
    return await prisma.user.findMany({
      include: {
        events: true,
      },
    });
  }),

  // Get user by ID
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await prisma.user.findUnique({
        where: { id: input.id },
        include: {
          events: true,
        },
      });
    }),

  // Create a new user
  create: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.user.create({
        data: {
          email: input.email,
          name: input.name,
        },
        include: {
          events: true,
        },
      });
    }),

  // Update user
  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        email: z.string().email().optional(),
        name: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return await prisma.user.update({
        where: { id },
        data,
        include: {
          events: true,
        },
      });
    }),

  // Delete user
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return await prisma.user.delete({
        where: { id: input.id },
      });
    }),
});
