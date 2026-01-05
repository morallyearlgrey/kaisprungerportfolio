import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

import { projectsRouter } from "@/server/api/routers/projects";
import { experiencesRouter } from "@/server/api/routers/experiences";
import { eventsRouter } from "@/server/api/routers/events";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    projects: projectsRouter,
    experiences: experiencesRouter,
    events: eventsRouter,

});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
