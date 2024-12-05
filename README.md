# Valentine 🌹

A narrative-aware AI Twitter agent. Powers @ValVonNeumann. By @joetforhire on Twitter.

## Overview

Valentine is a Twitter bot framework that allows you to create AI-powered Twitter personas. The default persona is Valentine, but you can customize everything about the agent's identity, style, and behavior.

## Todo

- [x] Basic tweeting works
- [ ] Replies
- [ ] Storytelling
- [ ] Image and videogen

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Configure environment variables by copying `.env.example` to `.env`:

```bash
cp .env.example .env
```

3. Fill in required environment variables:

```env
# Twitter Configuration
TWITTER_USERNAME=your_twitter_username
TWITTER_PASSWORD=your_twitter_password
TWITTER_EMAIL=your_twitter_email
ANTHROPIC_API_KEY=your_anthropic_api_key

# Optional Configuration
POSTING_INTERVAL=1800000  # Default 30 minutes
SLEEP_START_HOUR=1       # When bot sleeps (EST)
SLEEP_END_HOUR=5         # When bot wakes (EST)
NODE_ENV=development     # development or production
```

## Available Commands

- `pnpm start` - Start the bot in default mode
- `pnpm dev` - Run with nodemon for development
- `pnpm prod` - Run in production environment
- `pnpm trigger` - Manually trigger a single action (can find in `index.ts`, useful for testing)

## Configuration

### Posting Intervals

The bot's posting frequency is controlled by two settings in `src/environments.ts`:

```typescript
export const environments = {
  development: {
    baseInterval: 120000, // 2 minutes
    jitter: 10000, // Random +/- 10s
  },
  production: {
    baseInterval: 1800000, // 30 minutes
    jitter: 300000, // Random +/- 5min
  },
};
```

### Sleep Schedule

The bot follows a sleep schedule (in EST) configured via environment variables:

- `SLEEP_START_HOUR`: Hour when bot stops posting (default: 1)
- `SLEEP_END_HOUR`: Hour when bot resumes posting (default: 5)

## Customizing the Bot's Identity

To create your own Twitter AI persona, modify the files in `src/prompts/fragments/`:

### identity.ts

Contains the core identity components:

- `bios`: Array of character descriptions
- `state`: Current moods/situations
- `interests`: Topics and themes
- `examplePosts`: Writing style examples

### lore.ts

World-building elements:

- `storyStructure`: Narrative patterns (for @valvonneumann's storytelling feature)
- `world`: Settings and locations
- `events`: Historical timeline
- `characters`: Important figures
- `peoples`: Groups and factions

### styles.ts

Writing style configuration:

- `rules`: Formatting guidelines
- `avoid`: Topics/phrases to exclude

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC License

## by @joetforhire

_"space is the ultimate exurb" - Valentine_
