import { router } from '../trpc';
import { usersRouter } from './users';
import { eventsRouter } from './events';
import { authRouter } from './auth';

export const appRouter = router({
  users: usersRouter,
  events: eventsRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
