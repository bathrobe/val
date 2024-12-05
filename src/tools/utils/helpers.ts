export const getRandomElements = (arr: string[], count: number = 1): string => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).join("\n");
};
