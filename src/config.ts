import dotenv from "dotenv";
import path from "path";

// Load environment variables
const envFile =
  process.env.NODE_ENV === "development" ? ".env.development" : ".env";
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

// Validate required env vars
const requireEnvVar = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

// Parse command line arguments
const args = process.argv.slice(2);

export const config = {
  // Runtime modes
  TEST_MODE: args.includes("--test"),
  VERBOSE: args.includes("--verbose"),
  NODE_ENV: process.env.NODE_ENV || "development",

  // Runtime configuration
  runtime: {
    baseInterval: parseInt(process.env.POSTING_INTERVAL || "1800000"), // 30 minutes
    jitter: 300000, // 5 minutes
    sleepStart: parseInt(process.env.SLEEP_START_HOUR || "1"),
    sleepEnd: parseInt(process.env.SLEEP_END_HOUR || "5"),
    retryDelay: 60000, // 1 minute
  },

  // Twitter configuration
  twitter: {
    username: requireEnvVar("TWITTER_USERNAME"),
    password: requireEnvVar("TWITTER_PASSWORD"),
    email: requireEnvVar("TWITTER_EMAIL"),
  },

  // Service configuration
  services: {
    llm: {
      //   url: requireEnvVar("MODEL_URL"),
      //   apiKey: requireEnvVar("DEEPINFRA_API_KEY"),
    },
  },
} as const;
