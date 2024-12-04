export const decide = async (): Promise<any> => {
  // Simple decision logic for now
  const types = ["tweet", "reply", "story"];
  // const type = types[Math.floor(Math.random() * types.length)];
  const type = "tweet";
  return type;
};
