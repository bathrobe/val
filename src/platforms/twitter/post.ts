import { getTwitter } from "./store";

export const createTweet = async (content: string) => {
  const twitter = getTwitter();
  await twitter.sendTweet(content);
};
