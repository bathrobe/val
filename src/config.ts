import dotenv from "dotenv";
import path from "path";
import { environments, Environment } from "./environments";

// Load environment variables
dotenv.config();

// Validate required env vars
const requireEnvVar = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

const env = (process.env.NODE_ENV || "development") as Environment;
const envConfig = environments[env];

export const config = {
  // Environment-specific settings
  TEST_MODE: envConfig.TEST_MODE,
  VERBOSE: envConfig.VERBOSE,
  NODE_ENV: env,

  // Runtime settings from environment config
  runtime: {
    baseInterval: envConfig.baseInterval,
    jitter: envConfig.jitter,
    sleepStart: parseInt(process.env.SLEEP_START_HOUR || "1"),
    sleepEnd: parseInt(process.env.SLEEP_END_HOUR || "5"),
    retryDelay: 60000,
  },

  // Twitter configuration
  twitter: {
    username: requireEnvVar("TWITTER_USERNAME"),
    password: requireEnvVar("TWITTER_PASSWORD"),
    email: requireEnvVar("TWITTER_EMAIL"),
    cookiePath: path.join(process.cwd(), requireEnvVar("TWITTER_COOKIE_PATH")),
  },

  // Service configuration
  services: {
    llm: {
      anthropic: {
        apiKey: requireEnvVar("ANTHROPIC_API_KEY"),
      },
    },
  },
} as const;
