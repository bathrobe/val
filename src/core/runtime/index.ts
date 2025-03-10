import { composeTweet } from "../actions/post";
import { getCurrentAgent } from "../../cms/agents";
import { isAwakeHour } from "./sleep";

export const createRuntime = () => {
  let timer: NodeJS.Timeout | null = null;
  let runtimeConfig = {
    postingInterval: 7200000, // 2hr default
    jitter: 1800000, // 30 min default
  };

  const loadAgentConfig = async () => {
    try {
      const agent = await getCurrentAgent();
      if (agent?.scheduling) {
        runtimeConfig = {
          postingInterval:
            agent.scheduling.postingInterval || runtimeConfig.postingInterval,
          jitter: agent.scheduling.jitter || runtimeConfig.jitter,
        };
      }
    } catch (error) {
      console.error("Error loading agent config:", error);
    }
  };

  const scheduleNext = () => {
    const jitter =
      Math.random() * runtimeConfig.jitter * 2 - runtimeConfig.jitter;
    return runtimeConfig.postingInterval + jitter;
  };

  const tick = async () => {
    try {
      await loadAgentConfig();
      console.log("Runtime config:", runtimeConfig);
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
