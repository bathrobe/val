import { replyToMyPostsReplies } from "./reply";
import { composeTweetAndSave } from "./post";

export const executeAction = async (messageType: string) => {
  switch (messageType) {
    case "tweetAndReply":
      try {
        await composeTweetAndSave();
        console.log("tweet posted")
        await replyToMyPostsReplies();
        console.log("replies replied to")
      } catch (error) {
        console.error("Error in tweetAndReply action:", error);
      }
      break;
    default:
      console.log("No action for message type:", messageType);
  }
};
