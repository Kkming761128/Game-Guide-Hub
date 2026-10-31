import { getCollection } from "astro:content";
import type { SearchIndexEntry } from "../../lib/searchLevels";
import { getGames } from "../../lib/games";

export async function getStaticPaths() {
  const games = await getGames();
  return games.map((game) => ({ params: { game: game.data.slug } }));
}

export async function GET({ params }: { params: { game: string } }) {
  const allLevels = await getCollection("levels");
  const index: SearchIndexEntry[] = allLevels
    .filter((level) => level.data.game === params.game)
    .sort((a, b) => a.data.levelNumber - b.data.levelNumber)
    .map((level) => ({
      levelId: level.data.levelId,
      levelNumber: level.data.levelNumber,
      title: level.data.title,
      route: level.data.route,
      treasureNames: level.data.treasures.map((treasure) => treasure.name),
    }));

  return new Response(JSON.stringify(index), {
    headers: { "Content-Type": "application/json" },
  });
}
