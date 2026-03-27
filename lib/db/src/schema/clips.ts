import { pgTable, serial, text, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const clipsTable = pgTable("clips", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  youtubeUrl: text("youtube_url").notNull(),
  correctRank: text("correct_rank").notNull(),
  uploaderId: integer("uploader_id").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  description: text("description"),
  map: text("map"),
  mode: text("mode"),
  likes: integer("likes").notNull().default(0),
  dislikes: integer("dislikes").notNull().default(0),
  views: integer("views").notNull().default(0),
  totalGuesses: integer("total_guesses").notNull().default(0),
  approved: boolean("approved").notNull().default(true),
  isFeatured: boolean("is_featured").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertClipSchema = createInsertSchema(clipsTable).omit({
  id: true,
  createdAt: true,
  likes: true,
  dislikes: true,
  views: true,
  totalGuesses: true,
  approved: true,
  isFeatured: true,
});

export type InsertClip = z.infer<typeof insertClipSchema>;
export type Clip = typeof clipsTable.$inferSelect;
