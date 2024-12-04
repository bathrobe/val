import { createTweet } from "../../platforms/twitter/post";
import { composeMessage } from "./compose";

export const executeAction = async (messageType: string) => {
  switch (messageType) {
    case "tweet":
      const message = await composeMessage();
      console.log("executing tweet action:", message);
      // await createTweet(message);
      break;
    // Add more cases for other message types
    default:
      console.log("No action for message type:", messageType);
  }
};
