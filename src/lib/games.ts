import { getCollection } from "astro:content";

/** Shared by every route that needs one static path per game (index.astro, search-index.json.ts, [level].astro). */
export async function getGames() {
  return getCollection("games");
}
