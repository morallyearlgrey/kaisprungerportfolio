import { db } from "@/server/db/index";
import { ExperiencePhotos, Experiences, ExperienceVideos } from "@/server/db/schema";
import { eq, sql } from "drizzle-orm";
import { z } from "zod";
import { 
  publicProcedure,
  createTRPCRouter,
} from "../trpc";

export const experiencesRouter = createTRPCRouter({

    getAllExperiences: publicProcedure.query(async () => {
        return await db.select().from(Experiences);
    }),

    getAllExperiencePhotos: publicProcedure.query(async () => {
        return await db.select().from(ExperiencePhotos);
    }),

    getAllExperienceVideos: publicProcedure.query(async () => {
        return await db.select().from(ExperienceVideos);
    }),

    likeExperience: publicProcedure
        .input(z.object({ id: z.string().uuid() }))
        .mutation(async ({ input }) => {
            const [updated] = await db
                .update(Experiences)
                .set({ numberLikes: sql`${Experiences.numberLikes} + 1` })
                .where(eq(Experiences.id, input.id))
                .returning({ numberLikes: Experiences.numberLikes });
            return updated;
        }),

    unlikeExperience: publicProcedure
        .input(z.object({ id: z.string().uuid() }))
        .mutation(async ({ input }) => {
            const [updated] = await db
                .update(Experiences)
                .set({ numberLikes: sql`GREATEST(${Experiences.numberLikes} - 1, 0)` })
                .where(eq(Experiences.id, input.id))
                .returning({ numberLikes: Experiences.numberLikes });
            return updated;
        }),
});