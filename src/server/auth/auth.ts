import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/server/db/index";
import { Accounts, Users, Sessions } from "@/server/db/schema";

interface DiscordProfile {
  id: string;
  username: string;
  email: string | null;
  avatar: string | null;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: Users,
    accountsTable: Accounts,
    sessionsTable: Sessions,
  }),

  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization:
        "https://discord.com/api/oauth2/authorize?scope=identify+email",

      profile(profile: DiscordProfile) {
        const id: string = profile.id;
        const name: string = profile.username;
        const email: string | null = profile.email;
        const avatar: string | null = profile.avatar;
        return {
          id,
          name,
          email,
          image: avatar
            ? `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`
            : null,
        };
      },
    }),
  ],

  session: {
    strategy: "database",
    maxAge: 10 * 24 * 60 * 60,
  },

  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return baseUrl + url;
      if (url.startsWith(baseUrl)) return url;
      return baseUrl;
    },
  },

  debug: process.env.NODE_ENV === "development",
});