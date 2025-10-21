import { z } from 'zod';
import { router, publicProcedure } from '../trpc';
import { prisma } from '../db';
import bcrypt from 'bcryptjs';
import { TRPCError } from '@trpc/server';

export const authRouter = router({
  // Sign up a new user
  signup: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, 'Name is required'),
        email: z.string().email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
      })
    )
    .mutation(async ({ input }) => {
      const { name, email, password } = input;

      // Check if user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'User with this email already exists',
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      });

      return {
        success: true,
        user,
      };
    }),
});
