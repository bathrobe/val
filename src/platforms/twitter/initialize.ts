import { Scraper } from "goat-x";
import { Cookie } from "tough-cookie";
import fs from "fs/promises";
import { config } from "../../config";

async function loadStoredCookies(): Promise<Cookie[] | null> {
  try {
    const fileExists = await fs
      .access(config.twitter.cookiePath)
      .then(() => true)
      .catch(() => false);

    if (!fileExists) return null;

    const cookiesJson = await fs.readFile(config.twitter.cookiePath, "utf-8");
    const cookiesData = JSON.parse(cookiesJson);

    return cookiesData
      .map((c: any) => Cookie.fromJSON(c))
      .filter((c: Cookie | null): c is Cookie => c !== null);
  } catch (error) {
    console.error("Error loading cookies:", error);
    return null;
  }
}

async function storeCookies(cookies: Cookie[]): Promise<void> {
  try {
    await fs.writeFile(
      config.twitter.cookiePath,
      JSON.stringify(cookies, null, 2)
    );
  } catch (error) {
    console.error("Error storing cookies:", error);
  }
}

export const initializeTwitter = async () => {
  const scraper = new Scraper();

  // Try loading cookies first
  const cookies = await loadStoredCookies();
  if (cookies) {
    await scraper.setCookies(cookies);
    if (await scraper.isLoggedIn()) {
      return scraper;
    }
  }

  // Fall back to login
  await scraper.login(
    process.env.TWITTER_USERNAME!,
    process.env.TWITTER_PASSWORD!,
    process.env.TWITTER_EMAIL
  );

  // Store cookies for next time
  const newCookies = await scraper.getCookies();
  await storeCookies(newCookies);

  return scraper;
};
