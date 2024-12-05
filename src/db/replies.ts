import { repliedTweetsTable } from "./schema";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import path from "path";

// Initialize database
const dbPath = path.join(process.cwd(), process.env.DB_FILE_NAME!);
const sqlite = new Database(dbPath, {
  // Enable foreign keys
  verbose: process.env.NODE_ENV === "development" ? console.log : undefined,
});

// Enable WAL mode for better performance
sqlite.pragma("journal_mode = WAL");

export const db = drizzle(sqlite);

export const repliesDb = {
  hasRepliedTo: (tweetId: string) => {
    return (
      db
        .select()
        // @ts-expect-error
        .from(repliedTweetsTable)
        // @ts-expect-error
        .where(eq(repliedTweetsTable.tweetId, tweetId))
        .get()
    );
  },

  markAsReplied: (tweetId: string, replyId: string) => {
    // @ts-expect-error
    return db.insert(repliedTweetsTable).values({ tweetId, replyId }).run();
  },
};
