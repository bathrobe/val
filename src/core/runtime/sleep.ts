import { config } from "../../config";

export const isAwakeHour = (): boolean => {
  const hour = new Date().getHours();
  const isAwake = hour < 1 || hour >= 5;
  // Only log on state changes to reduce spam
  if (isAwake !== lastAwakeState) {
    console.log(
      `Sleep window: 1:00 to 5:00\nIs awake? ${isAwake}\nCurrent EST hour: ${hour}`
    );
    lastAwakeState = isAwake;
  }
  return isAwake;
};

let lastAwakeState: boolean | null = null;

export const getNextAwakeTime = (): Date => {
  const now = new Date();
  const wakeTime = new Date(now);
  const currentEstHour = (now.getUTCHours() - 5 + 24) % 24;

  // Only calculate next wake time if we're in sleep period
  if (
    currentEstHour >= config.runtime.sleepStart &&
    currentEstHour < config.runtime.sleepEnd
  ) {
    wakeTime.setUTCHours(config.runtime.sleepEnd + 5, 0, 0, 0); // +5 to convert EST to UTC
  }

  console.log(`Next wake time: ${wakeTime}`);
  return wakeTime;
};
