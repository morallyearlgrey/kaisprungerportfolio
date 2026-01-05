import { pgTable, uuid, varchar, text, boolean, timestamp, integer, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import type { AdapterAccountType } from "next-auth/adapters";

// ==== Auth Tables ====

export const Users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  email: text("email").notNull().unique(),
  emailVerified: timestamp("email_verified", { mode: "date" }),
  image: text("image"),
  discordId: varchar("discordId", { length: 64 }),
});

export const Accounts = pgTable("accounts", {
  userId: uuid("user_id").notNull().references(() => Users.id, { onDelete: "cascade" }),
  type: text("type").$type<AdapterAccountType>().notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("provider_account_id").notNull(),
  refresh_token: text("refresh_token"),
  access_token: text("access_token"),
  expires_at: integer("expires_at"),
  token_type: text("token_type"),
  scope: text("scope"),
  id_token: text("id_token"),
  session_state: text("session_state"),
}, (account) => ({
  compoundKey: primaryKey({
    columns: [account.provider, account.providerAccountId],
  }),
}));

export const Sessions = pgTable("sessions", {
  sessionToken: text("session_token").primaryKey(),
  userId: uuid("user_id").notNull().references(() => Users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const VerificationTokens = pgTable("verification_tokens", {
  identifier: text("identifier").notNull(),
  token: text("token").notNull(),
  expires: timestamp("expires", { mode: "date" }).notNull(),
}, (vt) => ({
  compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
}));


// ==== Skills Table ====

export const Skills = pgTable("skills", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 100 }).notNull(), // "languages", "frameworks", "tools"
  icon: text("icon"), // URL or icon identifier
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

// ==== Experience Tables ====

export const Experiences = pgTable("experiences", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }).notNull(),
  dateRange: varchar("date_range", { length: 100 }).notNull(), // e.g., "Jan 2020 - Dec 2022"
  location: varchar("location", { length: 255 }),
  description: text("description"),
  responsibilities: text("responsibilities"), // Can store as JSON array or newline-separated
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

export const ExperiencePhotos = pgTable("experience_photos", {
  id: uuid("id").primaryKey().defaultRandom(),
  experienceId: uuid("experience_id").notNull().references(() => Experiences.id, { onDelete: "cascade" }),
  photoUrl: text("photo_url").notNull(),
  caption: text("caption"),
  order: integer("order").notNull().default(0), // For ordering photos
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

export const ExperienceSkills = pgTable("experience_skills", {
  experienceId: uuid("experience_id").notNull().references(() => Experiences.id, { onDelete: "cascade" }),
  skillId: uuid("skill_id").notNull().references(() => Skills.id, { onDelete: "cascade" }),
}, (table) => ({
  pk: primaryKey({ columns: [table.experienceId, table.skillId] }),
}));

// ==== Events Tables ====

export const Events = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  headline: varchar("headline", { length: 255 }).notNull(),
  date: varchar("date", { length: 255 }).notNull(),
  location: varchar("location", { length: 255 }),
  description: varchar("description", { length: 255 }).notNull(),
  photoUrl: text("photo_url").notNull(),
  caption: text("caption"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

// export const EventPhotos = pgTable("event_photos", {
//   id: uuid("id").primaryKey().defaultRandom(),
//   eventId: uuid("project_id").notNull().references(() => Events.id, { onDelete: "cascade" }),
//   photoUrl: text("photo_url").notNull(),
//   caption: text("caption"),
//   order: integer("order").notNull().default(0), // For ordering photos
//   createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
// });

// ==== Songs Tables ====

export const Songs = pgTable("songs", {
  id: uuid("id").primaryKey().defaultRandom(),
  songName: varchar("date", { length: 255 }).notNull(),
  artistName: varchar("date", { length: 255 }).notNull(),
  url: varchar("date", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),

});

// ==== Projects Tables ====

export const Projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  location: text("project_location"),
  shortDescription: varchar("short_description", { length: 500 }),
  longDescription: text("long_description"),
  projectLink: text("project_link"),
  winnerTags: text("winner_tags"), // Store as JSON array or comma-separated
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

export const ProjectPhotos = pgTable("project_photos", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id").notNull().references(() => Projects.id, { onDelete: "cascade" }),
  photoUrl: text("photo_url").notNull(),
  caption: text("caption"),
  order: integer("order").notNull().default(0), // For ordering photos
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
});

export const ProjectSkills = pgTable("project_skills", {
  projectId: uuid("project_id").notNull().references(() => Projects.id, { onDelete: "cascade" }),
  skillId: uuid("skill_id").notNull().references(() => Skills.id, { onDelete: "cascade" }),
}, (table) => ({
  pk: primaryKey({ columns: [table.projectId, table.skillId] }),
}));

// ==== Recipes Tables ====

export const Recipes = pgTable("recipes", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  source: varchar("source", { length: 255 }),
  description: text("description"), // Can store steps here or in separate field
  steps: text("steps"), // Optional: separate field for steps
  photoUrl: text("photo_url"),
  isVerified: boolean("is_verified").notNull().default(false),
  providerName: varchar("provider_name", { length: 255 }), // Name of person who provided recipe
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});

// ==== Relations ====

export const UsersRelations = relations(Users, ({ many }) => ({
  accounts: many(Accounts),
  sessions: many(Sessions),
}));

export const AccountsRelations = relations(Accounts, ({ one }) => ({
  user: one(Users, {
    fields: [Accounts.userId],
    references: [Users.id],
  }),
}));

export const SessionsRelations = relations(Sessions, ({ one }) => ({
  user: one(Users, {
    fields: [Sessions.userId],
    references: [Users.id],
  }),
}));

export const SkillsRelations = relations(Skills, ({ many }) => ({
  experienceSkills: many(ExperienceSkills),
  projectSkills: many(ProjectSkills),
}));

export const ExperiencesRelations = relations(Experiences, ({ many }) => ({
  photos: many(ExperiencePhotos),
  skills: many(ExperienceSkills),
}));

export const ExperiencePhotosRelations = relations(ExperiencePhotos, ({ one }) => ({
  experience: one(Experiences, {
    fields: [ExperiencePhotos.experienceId],
    references: [Experiences.id],
  }),
}));

export const ExperienceSkillsRelations = relations(ExperienceSkills, ({ one }) => ({
  experience: one(Experiences, {
    fields: [ExperienceSkills.experienceId],
    references: [Experiences.id],
  }),
  skill: one(Skills, {
    fields: [ExperienceSkills.skillId],
    references: [Skills.id],
  }),
}));

export const ProjectsRelations = relations(Projects, ({ many }) => ({
  skills: many(ProjectSkills),
  photos: many(ProjectPhotos)
}));

export const ProjectPhotosRelations = relations(ProjectPhotos, ({ one }) => ({
  project: one(Projects, {
    fields: [ProjectPhotos.projectId],
    references: [Projects.id],
  }),
}));

export const ProjectSkillsRelations = relations(ProjectSkills, ({ one }) => ({
  project: one(Projects, {
    fields: [ProjectSkills.projectId],
    references: [Projects.id],
  }),
  skill: one(Skills, {
    fields: [ProjectSkills.skillId],
    references: [Skills.id],
  }),
}));

// export const EventRelations = relations(Events, ({ many }) => ({
//   photos: many(EventPhotos),
// }));

// export const EventPhotosRelations = relations(EventPhotos, ({ one }) => ({
//   experience: one(Events, {
//     fields: [EventPhotos.eventId],
//     references: [Events.id],
//   }),
// }));


// ==== Type Inference ====

// Auth types
export type User = typeof Users.$inferSelect;
export type NewUser = typeof Users.$inferInsert;
export type Account = typeof Accounts.$inferSelect;
export type NewAccount = typeof Accounts.$inferInsert;
export type Session = typeof Sessions.$inferSelect;
export type NewSession = typeof Sessions.$inferInsert;
export type VerificationToken = typeof VerificationTokens.$inferSelect;
export type NewVerificationToken = typeof VerificationTokens.$inferInsert;

// Skills types
export type Skill = typeof Skills.$inferSelect;
export type NewSkill = typeof Skills.$inferInsert;

// Experience types
export type Experience = typeof Experiences.$inferSelect;
export type NewExperience = typeof Experiences.$inferInsert;
export type ExperiencePhoto = typeof ExperiencePhotos.$inferSelect;
export type NewExperiencePhoto = typeof ExperiencePhotos.$inferInsert;
export type ExperienceSkill = typeof ExperienceSkills.$inferSelect;
export type NewExperienceSkill = typeof ExperienceSkills.$inferInsert;

// Project types
export type Project = typeof Projects.$inferSelect;
export type NewProject = typeof Projects.$inferInsert;
export type ProjectPhoto = typeof ProjectPhotos.$inferSelect;
export type NewProjectPhoto = typeof ProjectPhotos.$inferSelect;
export type ProjectSkill = typeof ProjectSkills.$inferSelect;
export type NewProjectSkill = typeof ProjectSkills.$inferInsert;

// Event types
export type Event = typeof Events.$inferSelect;
export type NewEvent = typeof Events.$inferInsert;
// export type EventPhoto = typeof EventPhotos.$inferSelect;
// export type NewEventPhoto = typeof EventPhotos.$inferSelect;

// Recipe types
export type Recipe = typeof Recipes.$inferSelect;
export type NewRecipe = typeof Recipes.$inferInsert;