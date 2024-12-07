import { replyTable } from "./schema";
import { db } from "./index";
import { eq, and } from "drizzle-orm";

export const getReplies = async () => {
  const replies = await db.select().from(replyTable);
  return replies;
};

export const insertReply = async (reply: typeof replyTable.$inferInsert) => {
  const [result] = await db.insert(replyTable).values(reply).returning();
  return result;
};

export const checkReplyExists = async ({
  tweetId,
  replyId,
}: {
  tweetId: string;
  replyId: string;
}) => {
  const existingReply = await db
    .select()
    .from(replyTable)
    .where(
      and(eq(replyTable.tweetId, tweetId), eq(replyTable.replyId, replyId))
    );

  return existingReply.length > 0;
};
