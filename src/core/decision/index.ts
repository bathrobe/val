export const decide = async (): Promise<any> => {
  // Simple decision logic for now
  const types = ["tweetAndReply", "story"];
  // const type = types[Math.floor(Math.random() * types.length)];
  const type = "tweetAndReply";
  return type;
};
