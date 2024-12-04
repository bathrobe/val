import { complete } from "../../tools/llm";

export const composeMessage = async (context: any = {}) => {
  const response = await complete("Generate a tweet about technology", {
    temperature: 0.7,
    maxTokens: 100,
  });

  return response.content;
};
