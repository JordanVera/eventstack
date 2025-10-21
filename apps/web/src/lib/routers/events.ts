import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { prisma } from '../db';

export const eventsRouter = router({
  // Get all events
  getAll: publicProcedure.query(async () => {
    return await prisma.event.findMany({
      include: {
        user: true,
        tickets: true,
      },
    });
  }),

  // Get events by user ID
  getByUserId: publicProcedure.input(z.object({ userId: z.string() })).query(async ({ input }) => {
    return await prisma.event.findMany({
      where: { userId: input.userId },
      include: {
        user: true,
        tickets: true,
      },
    });
  }),

  // Get event by ID
  getById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    return await prisma.event.findUnique({
      where: { id: input.id },
      include: {
        user: true,
        tickets: true,
      },
    });
  }),

  // Create a new event
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        shortSummary: z.string().optional(),
        description: z.string().optional(),
        startDate: z.date(),
        endDate: z.date(),
        timezone: z.string().default('GMT -5'),
        isRecurringSeries: z.boolean().default(false),
        location: z.string().optional(),
        venueName: z.string().optional(),
        guestlistEnabled: z.boolean().default(false),
        eventFeaturesEnabled: z.boolean().default(false),
        youtubeVideoEnabled: z.boolean().default(false),
        youtubeVideoUrl: z.string().optional(),
        imageGalleryEnabled: z.boolean().default(false),
        imageGalleryUrls: z.string().optional(),
        showOnExplore: z.boolean().default(true),
        isPasswordProtected: z.boolean().default(false),
        eventPassword: z.string().optional(),
        userId: z.string(),
        tickets: z
          .array(
            z.object({
              name: z.string(),
              description: z.string().optional(),
              grossPrice: z.number().default(0),
              displayPrice: z.string().default('Free'),
              quantity: z.number().nullable(),
              isUnlimited: z.boolean().default(true),
              limitSalesPeriod: z.boolean().default(false),
              salesStartDate: z.date().optional(),
              salesEndDate: z.date().optional(),
              limitTicketValidity: z.boolean().default(false),
              validityStartDate: z.date().optional(),
              validityEndDate: z.date().optional(),
              limitPurchaseQuantity: z.boolean().default(false),
              minPurchaseQuantity: z.number().optional(),
              maxPurchaseQuantity: z.number().optional(),
            })
          )
          .optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { tickets, ...eventData } = input;

      return await prisma.event.create({
        data: {
          ...eventData,
          tickets: tickets
            ? {
                create: tickets,
              }
            : undefined,
        },
        include: {
          user: true,
          tickets: true,
        },
      });
    }),

  // Update event
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().min(1).optional(),
        shortSummary: z.string().optional(),
        description: z.string().optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        timezone: z.string().optional(),
        isRecurringSeries: z.boolean().optional(),
        location: z.string().optional(),
        venueName: z.string().optional(),
        guestlistEnabled: z.boolean().optional(),
        eventFeaturesEnabled: z.boolean().optional(),
        youtubeVideoEnabled: z.boolean().optional(),
        youtubeVideoUrl: z.string().optional(),
        imageGalleryEnabled: z.boolean().optional(),
        imageGalleryUrls: z.string().optional(),
        showOnExplore: z.boolean().optional(),
        isPasswordProtected: z.boolean().optional(),
        eventPassword: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return await prisma.event.update({
        where: { id },
        data,
        include: {
          user: true,
          tickets: true,
        },
      });
    }),

  // Delete event
  delete: publicProcedure.input(z.object({ id: z.string() })).mutation(async ({ input }) => {
    return await prisma.event.delete({
      where: { id: input.id },
    });
  }),
});
