import { Tweet } from "goat-x";
import { replyTemplate } from "../../../prompts/templates/reply";
import { complete } from "../../../tools/llm";

export const generateReplies = async (replies: Tweet[]) => {
  return Promise.all(replies.map(generateSingleReply));
};

const generateSingleReply = async (reply: Tweet) => {
  const prompt = replyTemplate(reply.text);
  const content = await complete(prompt);
  console.log("reply: ", content.content);

  return {
    originalReply: reply,
    generatedContent: content.content.trim(),
  };
};
