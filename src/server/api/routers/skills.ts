import { db } from "@/server/db/index";
import { Skills } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import {
  publicProcedure,
  createTRPCRouter,
} from "../trpc";

export const skillsRouter = createTRPCRouter({

    getAllSkills: publicProcedure.query(async () => {
        return await db.select().from(Skills);
    }),

    getSkillsByCategory: publicProcedure
        .input(z.object({ category: z.string() }))
        .query(async ({ input }) => {
            return await db
                .select()
                .from(Skills)
                .where(eq(Skills.category, input.category));
        }),

    getSkillCategories: publicProcedure.query(async () => {
        const skills = await db.select({ category: Skills.category }).from(Skills);
        const unique = [...new Set(skills.map((s) => s.category))];
        return unique;
    }),
});