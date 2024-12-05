import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const repliedTweetsTable = sqliteTable("replied_tweets", {
  tweetId: text("tweet_id").primaryKey().notNull(),
  replyId: text("reply_id").notNull(),
});
