// import { TRPCError } from "@trpc/server";
// import { z } from "zod";
import { db } from "@/server/db/index";
import { Events } from "@/server/db/schema";
import { desc } from "drizzle-orm";
// import { eq } from "drizzle-orm";
import { 
  publicProcedure,
  createTRPCRouter,
} from "../trpc";


export const eventsRouter = createTRPCRouter({

    getAllEvents: publicProcedure.query(async () => {
        const events = await db.select().from(Events).orderBy(desc(Events.index));;
        return events;
    }),

});