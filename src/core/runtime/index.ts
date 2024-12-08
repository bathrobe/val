import { decide } from "../decision";
import { executeAction } from "../actions";
import { config } from "../../config";
import { isAwakeHour, getNextAwakeTime } from "./sleep";

const log = (...args: any[]) => config.VERBOSE && console.log(...args);

export const createRuntime = () => {
  let isRunning = false;
  let lastActionTime = 0;

  const getNextInterval = () => {
    const jitter =
      Math.random() * config.runtime.jitter * 2 - config.runtime.jitter;
    return config.runtime.baseInterval + jitter;
  };

  const start = async () => {
    isRunning = true;
    log("Runtime starting...");

    while (isRunning) {
      try {
        if (!isAwakeHour()) {
          const nextWake = getNextAwakeTime();
          const sleepDuration = nextWake.getTime() - Date.now();
          log(`Sleeping until ${nextWake}`);
          await new Promise((r) => setTimeout(r, sleepDuration));
          continue;
        }

        const now = Date.now();
        const timeSinceLastAction = now - lastActionTime;
        const interval = getNextInterval();
        log(
          `Time since last action: ${Math.round(timeSinceLastAction / 1000)}s, Interval: ${Math.round(
            interval / 1000
          )}s`
        );

        if (timeSinceLastAction < interval) {
          const waitTime = interval - timeSinceLastAction;
          log(`Waiting ${Math.round(waitTime / 1000)}s until next action`);
          await new Promise((r) => setTimeout(r, waitTime));
          continue;
        }

        const messageType = await decide();
        log("Decided message type:", messageType);
        await executeAction(messageType);
        log("Action executed");
        const nextActionIn = Math.round((interval - timeSinceLastAction) / 1000);
        log(`Next action in: ${nextActionIn}s`);


        lastActionTime = Date.now();
      } catch (error) {
        log("Error in runtime loop:", error);
        await new Promise((r) => setTimeout(r, config.runtime.retryDelay));
      }
    }
  };

  const stop = () => {
    isRunning = false;
    log("Runtime stopping...");
  };

  return { start, stop };
};
