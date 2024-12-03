export const decideMessage = async (): Promise<any> => {
  // Simple decision logic for now
  const types = ["tweet", "reply", "story"];
  const type = types[Math.floor(Math.random() * types.length)];

  return {
    content: `This is a ${type} message.`,
    type,
  };
};
