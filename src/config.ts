import dotenv from "dotenv";

dotenv.config();

export const config = {
  runtime: {
    baseInterval: parseInt(process.env.BASE_INTERVAL || "1800000"), // 30 min default
    jitter: parseInt(process.env.JITTER || "300000"), // 5 min default
    sleepStart: parseInt(process.env.SLEEP_START_HOUR || "1"),
    sleepEnd: parseInt(process.env.SLEEP_END_HOUR || "5"),
  },
  twitter: {
    username: process.env.TWITTER_USERNAME || "",
    password: process.env.TWITTER_PASSWORD || "",
    email: process.env.TWITTER_EMAIL || "",
    cookiePath: process.env.TWITTER_COOKIE_PATH || "./twitter_cookie.json",
  },
  shouldTweetLive: process.env.SHOULD_TWEET_LIVE === "true",
  postingInterval: parseInt(process.env.POSTING_INTERVAL || "18000000"),
  nodeEnv: process.env.NODE_ENV || "development",
  anthropicApiKey: process.env.ANTHROPIC_API_KEY || "",
};
