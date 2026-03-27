import { pgTable, serial, integer, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const guessesTable = pgTable("guesses", {
  id: serial("id").primaryKey(),
  clipId: integer("clip_id").notNull(),
  userId: integer("user_id"),
  sessionId: text("session_id"),
  guessedRank: text("guessed_rank").notNull(),
  isCorrect: boolean("is_correct").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertGuessSchema = createInsertSchema(guessesTable).omit({
  id: true,
  createdAt: true,
});

export type InsertGuess = z.infer<typeof insertGuessSchema>;
export type Guess = typeof guessesTable.$inferSelect;
