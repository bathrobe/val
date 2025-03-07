import { getTwitter } from "./store";
import { config } from "../../config";

export const postTweet = async (content: string): Promise<{ id: string }> => {
  const twitter = getTwitter();
  try {
    if (config.shouldTweetLive) {
      await twitter.sendTweet(content);
      // Get the latest tweet to get its ID
      const latestTweet = await twitter.getLatestTweet(config.twitter.username);
      if (!latestTweet) {
        throw new Error("Failed to get tweet ID after posting");
      }
      return { id: latestTweet.id };
    } else {
      console.log("Would have tweeted:", content);
      return { id: `mock_${Date.now()}` };
    }
  } catch (error) {
    console.error("Error posting tweet:", error);
    throw error;
  }
};
