import dotenv from "dotenv";

dotenv.config();

export const config = {
  core: {
    agentName: process.env.AGENT_NAME || "",
  },
  twitter: {
    username: process.env.TWITTER_USERNAME || "",
    password: process.env.TWITTER_PASSWORD || "",
    email: process.env.TWITTER_EMAIL || "",
    cookiePath: process.env.TWITTER_COOKIE_PATH || "./twitter_cookie.json",
  },
  shouldTweetLive: process.env.SHOULD_TWEET_LIVE === "true",
  nodeEnv: process.env.NODE_ENV || "development",
  anthropicApiKey: process.env.ANTHROPIC_API_KEY || "",
};
