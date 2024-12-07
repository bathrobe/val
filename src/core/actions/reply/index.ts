import { getRepliesToRecentTweets } from "./fetch";
import { filterReplies } from "./filter";
import { generateReplies } from "./generate";
import { insertReply } from "../../../db/replies";
import { replyToTweet } from "../../../platforms/twitter/reply";

const REPLY_DELAY = 30 * 1000; // 30 seconds between replies

export const replyToMyPostsReplies = async () => {
  const replies = await getRepliesToRecentTweets();
  const validReplies = await filterReplies(replies);
  console.log("Found valid replies:", validReplies.length);

  const generatedReplies = await generateReplies(validReplies);

  for (const { originalReply, generatedContent } of generatedReplies) {
    try {
      if (process.env.SHOULD_TWEET_LIVE === "true") {
        await replyToTweet(originalReply.id, generatedContent);
        await insertReply({
          tweetId: originalReply.id,
          replyId: originalReply.inReplyToStatusId!,
          username: originalReply.username,
          createdAt: new Date(),
        });
      }

      // Add delay between replies
      await new Promise((resolve) => setTimeout(resolve, REPLY_DELAY));
    } catch (error) {
      console.error(`Error processing reply ${originalReply.id}:`, error);
    }
  }

  return generatedReplies.length;
};
