import { Scraper } from "goat-x";

let scraper: Scraper | null = null;

export const getTwitter = () => {
  if (!scraper) {
    throw new Error("Twitter not initialized");
  }
  return scraper;
};

export const setTwitter = (newScraper: Scraper) => {
  scraper = newScraper;
};
