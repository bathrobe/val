import { Tweet } from "goat-x";
import { isSpam } from "./spam";
import { checkReplyExists } from "../../../db/replies";

export const filterReplies = async (replies: Tweet[]) => {
  const validReplies = [];

  for (const reply of replies) {
    // Skip spam
    if (isSpam(reply.username, reply.text)) continue;

    // Skip if we've already replied
    const alreadyReplied = await checkReplyExists({
      tweetId: reply.id,
      replyId: reply.inReplyToStatusId!,
    });
    if (alreadyReplied) continue;

    // Skip if the reply is a retweet
    if (reply.retweetedStatus) continue;

    // Skip if the post is by the user
    if (reply.username === process.env.TWITTER_USERNAME) continue;

    validReplies.push(reply);
  }

  return validReplies;
};
