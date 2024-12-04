export const environments = {
  development: {
    TEST_MODE: true,
    VERBOSE: true,
    baseInterval: 120000, // 2 minute for faster testing
    jitter: 10000,
  },
  production: {
    TEST_MODE: false,
    VERBOSE: false,
    baseInterval: 1800000,
    jitter: 300000,
  },
} as const;

export type Environment = keyof typeof environments;
