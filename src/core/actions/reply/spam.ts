export const spamUsers = [
  // Usernames to ignore (without @ symbol)
  "Sol485_",
];

export const spamPhrases = [
  // Common spam phrases or patterns
  "Send me a DM",
];

export const isSpam = (username: string, content: string): boolean => {
  // Case insensitive checks
  const lowerUsername = username.toLowerCase();
  const lowerContent = content.toLowerCase();
  const isSpamUser = spamUsers.some((user) =>
    lowerUsername.includes(user.toLowerCase())
  );
  const isSpamPhrase = spamPhrases.some((phrase) =>
    lowerContent.includes(phrase.toLowerCase())
  );

  return isSpamUser || isSpamPhrase;
};
