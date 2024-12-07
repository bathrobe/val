import { postTable } from "./schema";
import { db } from "./index";
import { eq } from "drizzle-orm";

export const getPosts = async () => {
  const posts = await db.select().from(postTable);
  return posts;
};

export const insertPost = async (post: typeof postTable.$inferInsert) => {
  const [result] = await db.insert(postTable).values(post).returning();
  return result;
};
