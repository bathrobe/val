import { initializeTwitter } from "./platforms/twitter/initialize";
import { setTwitter } from "./platforms/twitter/store";
import { createRuntime } from "./core/runtime";
import { config } from "./config";
import { decide } from "./core/decision";
import { executeAction } from "./core/actions";
import "dotenv/config";

const log = (...args: any[]) => config.VERBOSE && console.log(...args);

// Debug/test function
// --------MODIFY THIS TO TEST FEATURES------------------
const triggerTest = async () => {
  // Example: Test decision + action pipeline
  const message = await decide();
  console.log("Test generated:", message);

  if (!config.TEST_MODE) {
    await executeAction(message);
    console.log("Action executed!");
  }
};
// --------------------------------------------------------

const main = async () => {
  try {
    log("Initializing Twitter...");
    const twitter = await initializeTwitter();
    setTwitter(twitter);

    // Check for --trigger flag
    if (process.argv.includes("--trigger")) {
      await triggerTest();
      process.exit(0);
    }

    // Normal runtime continues here
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
