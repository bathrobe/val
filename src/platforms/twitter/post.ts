import { getTwitter } from "./store";

export const postTweet = async (content: string): Promise<{ id: string }> => {
  const twitter = getTwitter();
  if (process.env.SHOULD_TWEET_LIVE === "true") {
    await twitter.sendTweet(content);
    // Get the latest tweet to get its ID
    const latestTweet = await twitter.getLatestTweet(process.env.TWITTER_USERNAME!);
    if (!latestTweet) {
      throw new Error("Failed to get tweet ID after posting");
    }
    return { id: latestTweet.id };
  } else {
    console.log("Would have tweeted:", content);
    return { id: `mock_${Date.now()}` };
  }
};
