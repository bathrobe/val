import { complete } from "../../../tools/llm";
import { tweetTemplate } from "../../../prompts/templates/tweet";
import { postTweet } from "../../../platforms/twitter/post";
import { postTweetToPayload } from "../../../cms/agents";
import { config } from "../../../config";

export const composeTweet = async () => {
  try {
    const currentTask = "Journal";
    const prompt = await tweetTemplate(currentTask);
    const response = await complete(prompt, {
      temperature: 0.8,
      maxTokens: 300,
    });

    if (config.shouldTweetLive) {
      await postTweet(response.content);
      await postTweetToPayload(response.content, currentTask);
      // TODO: add a check to see if it posted to socials correctly and get the URL and post it to the payload
    } else {
      console.log("Would have tweeted:", response.content);
    }

    return response.content;
  } catch (error) {
    console.error("Error composing tweet:", error);
    throw error;
  }
};
