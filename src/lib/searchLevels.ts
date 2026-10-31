export interface SearchIndexEntry {
  levelId: string;
  levelNumber: number;
  title: string;
  route?: string;
  treasureNames: string[];
}

export function filterLevels(index: SearchIndexEntry[], query: string): SearchIndexEntry[] {
  const needle = query.trim().toLowerCase();
  if (needle === "") return index;

  return index.filter((entry) => {
    if (String(entry.levelNumber).includes(needle)) return true;
    if (entry.title.toLowerCase().includes(needle)) return true;
    return entry.treasureNames.some((name) => name.toLowerCase().includes(needle));
  });
}
