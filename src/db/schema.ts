import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const replyTable = sqliteTable("replies", {
  tweetId: text("tweet_id").primaryKey(),
  replyId: text("reply_id").notNull(),
  username: text("username").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const postTable = sqliteTable("posts", {
  id: text("id").primaryKey(),
  post: text("post").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
