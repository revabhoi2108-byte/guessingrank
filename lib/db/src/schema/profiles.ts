import { pgTable, serial, text, integer, timestamp, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const profilesTable = pgTable("profiles", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  username: text("username").notNull().unique(),
  avatarUrl: text("avatar_url"),
  bio: text("bio"),
  totalClips: integer("total_clips").notNull().default(0),
  totalGuesses: integer("total_guesses").notNull().default(0),
  correctGuesses: integer("correct_guesses").notNull().default(0),
  accuracyPercent: real("accuracy_percent").notNull().default(0),
  streakDays: integer("streak_days").notNull().default(0),
  coins: integer("coins").notNull().default(0),
  weeklyCoins: integer("weekly_coins").notNull().default(0),
  weeklyGuesses: integer("weekly_guesses").notNull().default(0),
  weeklyCorrect: integer("weekly_correct").notNull().default(0),
  weeklyClips: integer("weekly_clips").notNull().default(0),
  lastGuessDate: text("last_guess_date"),
  lastLoginDate: text("last_login_date"),
  weekResetDate: text("week_reset_date"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertProfileSchema = createInsertSchema(profilesTable).omit({
  id: true,
  createdAt: true,
  totalClips: true,
  totalGuesses: true,
  correctGuesses: true,
  accuracyPercent: true,
  streakDays: true,
  coins: true,
  weeklyCoins: true,
  weeklyGuesses: true,
  weeklyCorrect: true,
  weeklyClips: true,
  lastGuessDate: true,
  lastLoginDate: true,
  weekResetDate: true,
});

export type InsertProfile = z.infer<typeof insertProfileSchema>;
export type Profile = typeof profilesTable.$inferSelect;
