import { initializeTwitter } from "./platforms/twitter/initialize";
import { setTwitter } from "./platforms/twitter/store";
import { createRuntime } from "./core/runtime";
import { config } from "./config";

const log = (...args: any[]) => config.VERBOSE && console.log(...args);

const main = async () => {
  try {
    log("Initializing Twitter...");
    const twitter = await initializeTwitter();
    setTwitter(twitter);

    if (config.TEST_MODE) {
      console.log(
        "Running in test mode - actions will be logged but not executed"
      );
    }

    const runtime = createRuntime();
    await runtime.start();

    // Handle graceful shutdown
    process.on("SIGINT", async () => {
      console.log("\nGracefully shutting down...");
      runtime.stop();
      process.exit(0);
    });
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

main();
