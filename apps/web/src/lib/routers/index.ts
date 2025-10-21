import { router } from '../trpc';
import { usersRouter } from './users';
import { eventsRouter } from './events';

export const appRouter = router({
  users: usersRouter,
  events: eventsRouter,
});

export type AppRouter = typeof appRouter;
