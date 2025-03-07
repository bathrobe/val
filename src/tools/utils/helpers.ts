export const getRandomElementsAndFormat = (arr: string[], count = 1): string =>
  [...arr]
    .sort(() => 0.5 - Math.random())
    .slice(0, count)
    .join("\n");
