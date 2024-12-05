import { complete } from "../../../tools/llm";
import { tweetTemplate } from "../../../prompts/templates/tweet";

export const composeMessage = async (context: any = {}) => {
  const prompt = tweetTemplate();
  console.log(prompt);
  const response = await complete(tweetTemplate(), {
    temperature: 0.7,
    maxTokens: 100,
  });

  return response.content;
};
