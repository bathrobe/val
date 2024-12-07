import { Tweet } from "goat-x";
import { getTwitter } from "../../../platforms/twitter/store";
import { SearchMode } from "goat-x";

export const getRepliesToRecentTweets = async (limit: number = 3) => {
  const twitter = getTwitter();
  const username = process.env.TWITTER_USERNAME!;

  // Search for replies to our username
  const repliesGenerator = twitter.searchTweets(
    `to:${username}`,
    limit,
    SearchMode.Latest
  );

  const replies: Tweet[] = [];
  for await (const reply of repliesGenerator) {
    replies.push(reply);
  }

  return replies;
};
