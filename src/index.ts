import { initializeTwitter } from "./platforms/twitter/initialize";
import { setTwitter } from "./platforms/twitter/store";
import { createRuntime } from "./core/runtime";

const main = async () => {
  try {
    console.log("Initializing Twitter...");
    const twitter = await initializeTwitter();
    setTwitter(twitter);

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
