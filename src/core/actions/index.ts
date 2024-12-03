import { createTweet } from "../../platforms/twitter/post";

export const executeAction = async (message: any) => {
  switch (message.type) {
    case "tweet":
      await createTweet(message.content);
      break;
    // Add more cases for other message types
    default:
      console.log("No action for message type:", message.type);
  }
};
