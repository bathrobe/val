import { replyToMyPostsReplies } from "./reply";
import { composeTweetAndSave } from "./post";

export const executeAction = async (messageType: string) => {
  switch (messageType) {
    case "tweetAndReply":
      try {
        await composeTweetAndSave();
        await replyToMyPostsReplies();
      } catch (error) {
        console.error("Error in tweetAndReply action:", error);
      }
      break;
    default:
      console.log("No action for message type:", messageType);
  }
};
