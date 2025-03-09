import { complete } from "../../../tools/llm";
import { tweetTemplate } from "../../../prompts/templates/tweet";
import { postTweet } from "../../../platforms/twitter/post";
import { config } from "../../../config";

export const composeTweet = async () => {
  try {
    const prompt = await tweetTemplate();
    const response = await complete(prompt, {
      temperature: 0.7,
      maxTokens: 300,
    });

    if (config.shouldTweetLive) {
      await postTweet(response.content);
    } else {
      console.log("Would have tweeted:", response.content);
    }

    return response.content;
  } catch (error) {
    console.error("Error composing tweet:", error);
    throw error;
  }
};
