import { config } from "../../config";

export const isAwakeHour = (): boolean => {
  const now = new Date();
  const estHour = (now.getUTCHours() - 5 + 24) % 24; // Convert UTC to EST

  const isAsleep =
    estHour >= config.runtime.sleepStart && estHour < config.runtime.sleepEnd;
  const isAwake = !isAsleep;

  console.log(`Current EST hour: ${estHour}`);
  console.log(
    `Sleep window: ${config.runtime.sleepStart}:00 to ${config.runtime.sleepEnd}:00`
  );
  console.log(`Is awake? ${isAwake}`);

  return isAwake;
};

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
