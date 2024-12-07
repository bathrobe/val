import { Tweet } from "goat-x";
import { replyTemplate } from "../../../prompts/templates/reply";
import { complete } from "../../../tools/llm";

export const generateReplies = async (replies: Tweet[]) => {
  try {
    return await Promise.all(replies.map(generateSingleReply));
  } catch (error) {
    console.error("Error generating replies:", error);
    return [];
  }
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
