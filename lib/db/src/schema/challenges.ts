import { pgTable, serial, integer, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const userChallengesTable = pgTable("user_challenges", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  challengeKey: text("challenge_key").notNull(),
  progress: integer("progress").notNull().default(0),
  claimed: boolean("claimed").notNull().default(false),
  periodDate: text("period_date").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export type UserChallenge = typeof userChallengesTable.$inferSelect;
