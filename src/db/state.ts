import { db } from "./index";
import { personaState } from "./schema";
import { desc } from "drizzle-orm";

export const getCurrentState = async () => {
  const [latestState] = await db
    .select()
    .from(personaState)
    .orderBy(desc(personaState.updatedAt))
    .limit(1);

  return latestState?.state;
};

export const updateState = async (newState: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return db
    .insert(personaState)
    .values({
      id: crypto.randomUUID(),
      state: newState,
      updatedAt: new Date(Date.now()), // This ensures millisecond precision
    })
    .returning();
};
// Optionally, add a function to get state history
export const getStateHistory = async (limit = 10) => {
  return db
    .select()
    .from(personaState)
    .orderBy(desc(personaState.updatedAt))
    .limit(limit);
};
