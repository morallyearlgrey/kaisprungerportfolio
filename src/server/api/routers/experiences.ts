// import { TRPCError } from "@trpc/server";
// import { z } from "zod";
import { db } from "@/server/db/index";
import { ExperiencePhotos, Experiences, ExperienceVideos } from "@/server/db/schema";
// import { eq } from "drizzle-orm";
import { 
  publicProcedure,
  createTRPCRouter,
} from "../trpc";


export const experiencesRouter = createTRPCRouter({

    getAllExperiences: publicProcedure.query(async () => {
        const experiences = await db.select().from(Experiences);
        return experiences;
    }),

    getAllExperiencePhotos: publicProcedure.query(async () => {
        const experiencePhotos = await db.select().from(ExperiencePhotos);
        return experiencePhotos;
    }),

    getAllExperienceVideos: publicProcedure.query(async () => {
        const experienceVideos = await db.select().from(ExperienceVideos);
        return experienceVideos;
    }),

});