import { createAnthropicAdapter } from "./providers/anthropic";

export interface CompletionResponse {
  content: string;
  model: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface CompletionConfig {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

const provider = createAnthropicAdapter();

export const complete = async (
  prompt: string,
  config?: CompletionConfig
): Promise<CompletionResponse> => {
  return provider.complete(prompt, config);
};
