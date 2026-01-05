// import { TRPCError } from "@trpc/server";
// import { z } from "zod";
import { db } from "@/server/db/index";
import { Projects, ProjectPhotos } from "@/server/db/schema";
// import { eq } from "drizzle-orm";
import { 
  publicProcedure,
  createTRPCRouter,
} from "../trpc";


export const projectsRouter = createTRPCRouter({

    getAllProjects: publicProcedure.query(async () => {
        const projects = await db.select().from(Projects);
        return projects;

    }),

    getAllProjectPhotos: publicProcedure.query(async () => {
            const projectPhotos = await db.select().from(ProjectPhotos);
            return projectPhotos;
    }),



})