import { composeTweet } from "../actions/post";
import { config } from "../../config";
import { isAwakeHour } from "./sleep";

export const createRuntime = () => {
  let timer: NodeJS.Timeout | null = null;

  const scheduleNext = () => {
    const jitter =
      Math.random() * config.runtime.jitter * 2 - config.runtime.jitter;
    return config.runtime.baseInterval + jitter;
  };

  const tick = async () => {
    try {
      if (isAwakeHour()) {
        await composeTweet().catch(console.error);
      }
      timer = setTimeout(tick, scheduleNext());
    } catch (error) {
      console.error("Error in runtime tick:", error);
      timer = setTimeout(tick, scheduleNext());
    }
  };

  return {
    start: () => tick(),
    stop: () => timer && clearTimeout(timer),
  };
};
