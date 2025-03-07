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
  try {
    const scraper = new Scraper();

    // Try loading cookies first
    try {
      const cookies = await loadStoredCookies();
      if (cookies) {
        try {
          await scraper.setCookies(cookies);
          try {
            if (await scraper.isLoggedIn()) {
              return scraper;
            }
          } catch (error) {
            console.error("Error checking login status:", error);
          }
        } catch (error) {
          console.error("Error setting cookies:", error);
        }
      }
    } catch (error) {
      console.error("Error in cookie authentication flow:", error);
    }

    // Fall back to login
    try {
      await scraper.login(
        config.twitter.username,
        config.twitter.password,
        config.twitter.email
      );
    } catch (error) {
      console.error("Error logging in to Twitter:", error);
      throw error; // Re-throw as this is critical
    }

    // Store cookies for next time
    try {
      const newCookies = await scraper.getCookies();
      try {
        await storeCookies(newCookies);
      } catch (error) {
        console.error("Error storing new cookies:", error);
      }
    } catch (error) {
      console.error("Error getting cookies after login:", error);
    }

    return scraper;
  } catch (error) {
    console.error("Fatal error initializing Twitter:", error);
    throw error;
  }
};
