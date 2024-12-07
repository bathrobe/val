import { complete } from "../../../tools/llm";
import { tweetTemplate } from "../../../prompts/templates/tweet";
import { postTweet } from "../../../platforms/twitter/post";
import { insertPost } from "../../../db/posts";

export const writeTweet = async (context: any = {}) => {
  const prompt = tweetTemplate();
  const response = await complete(prompt, {
    temperature: 0.7,
    maxTokens: 300,
  });

  return response.content;
};

export const composeTweetAndSave = async () => {
  const message = await writeTweet();
  console.log("tweet: ", message);
  
  if (process.env.SHOULD_TWEET_LIVE === "true") {
    const tweet = await postTweet(message);

    await insertPost({
      id: tweet.id,
      post: message,
      createdAt: new Date(),
    });
  }
  
  return message;
};
