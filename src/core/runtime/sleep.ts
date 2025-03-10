import { getCurrentAgent } from "../../cms/agents";

// Default sleep values
let sleepStartHour = 1;
let sleepEndHour = 5;
let lastAwakeState: boolean | null = null;

// Cache agent sleep settings
let cachedSleepSettings: {
  sleepStartHour: number;
  sleepEndHour: number;
} | null = null;

const getSleepSettings = async () => {
  if (cachedSleepSettings) return cachedSleepSettings;

  try {
    const agent = await getCurrentAgent();
    if (agent?.scheduling) {
      sleepStartHour = agent.scheduling.sleepStartHour ?? sleepStartHour;
      sleepEndHour = agent.scheduling.sleepEndHour ?? sleepEndHour;

      cachedSleepSettings = {
        sleepStartHour,
        sleepEndHour,
      };
    }
  } catch (error) {
    console.error("Error loading agent sleep settings:", error);
  }

  return { sleepStartHour, sleepEndHour };
};

export const isAwakeHour = async (): Promise<boolean> => {
  const { sleepStartHour, sleepEndHour } = await getSleepSettings();
  const hour = new Date().getHours();
  const isAwake = hour < sleepStartHour || hour >= sleepEndHour;

  // Only log on state changes to reduce spam
  if (isAwake !== lastAwakeState) {
    console.log(
      `Sleep window: ${sleepStartHour}:00 to ${sleepEndHour}:00\nIs awake? ${isAwake}\nCurrent hour: ${hour}`
    );
    lastAwakeState = isAwake;
  }

  return isAwake;
};

export const getNextAwakeTime = async (): Promise<Date> => {
  const { sleepStartHour, sleepEndHour } = await getSleepSettings();
  const now = new Date();
  const wakeTime = new Date(now);
  const currentHour = now.getHours();

  // Only calculate next wake time if we're in sleep period
  if (currentHour >= sleepStartHour && currentHour < sleepEndHour) {
    wakeTime.setHours(sleepEndHour, 0, 0, 0);
  }

  console.log(`Next wake time: ${wakeTime}`);
  return wakeTime;
};
