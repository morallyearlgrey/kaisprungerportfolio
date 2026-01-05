// import { TRPCError } from "@trpc/server";
// import { z } from "zod";
import { db } from "@/server/db/index";
import { Songs } from "@/server/db/schema";
// import { eq } from "drizzle-orm";
import { 
  publicProcedure,
  createTRPCRouter,
} from "../trpc";


export const musicRouter = createTRPCRouter({

    getAllSongs: publicProcedure.query(async () => {
        const songs = await db.select().from(Songs);
        return songs;

    }),


});