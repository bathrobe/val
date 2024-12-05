import { getTwitter } from "./store";

export const replyToTweet = async (tweetId: string, content: string) => {
  const twitter = getTwitter();
  await twitter.sendTweet(content, tweetId);
};
