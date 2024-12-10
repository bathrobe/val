import { getTwitter } from "./store";

export const replyToTweet = async (tweetId: string, content: string) => {
  const twitter = getTwitter();
  return;
  // return await twitter.sendTweet(content, tweetId);
};
