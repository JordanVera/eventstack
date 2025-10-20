import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { prisma } from '../db';

export const eventsRouter = router({
  // Get all events
  getAll: publicProcedure.query(async () => {
    return await prisma.event.findMany({
      include: {
        user: true,
      },
    });
  }),

  // Get events by user ID
  getByUserId: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(async ({ input }) => {
      return await prisma.event.findMany({
        where: { userId: input.userId },
        include: {
          user: true,
        },
      });
    }),

  // Get event by ID
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return await prisma.event.findUnique({
        where: { id: input.id },
        include: {
          user: true,
        },
      });
    }),

  // Create a new event
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        description: z.string().optional(),
        startDate: z.date(),
        endDate: z.date(),
        userId: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      return await prisma.event.create({
        data: {
          title: input.title,
          description: input.description,
          startDate: input.startDate,
          endDate: input.endDate,
          userId: input.userId,
        },
        include: {
          user: true,
        },
      });
    }),

  // Update event
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1).optional(),
        description: z.string().optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        userId: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return await prisma.event.update({
        where: { id },
        data,
        include: {
          user: true,
        },
      });
    }),

  // Delete event
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return await prisma.event.delete({
        where: { id: input.id },
      });
    }),
});
