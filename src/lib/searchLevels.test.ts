import { describe, expect, it } from "vitest";
import { filterLevels, type SearchIndexEntry } from "./searchLevels";

const index: SearchIndexEntry[] = [
  { levelId: "level-01", levelNumber: 1, title: "新手村", treasureNames: ["生鏽的鑰匙"] },
  { levelId: "level-02", levelNumber: 2, title: "森林遺跡", treasureNames: ["遺跡寶箱"] },
];

describe("filterLevels", () => {
  it("matches by level title substring", () => {
    expect(filterLevels(index, "森林")).toEqual([index[1]]);
  });

  it("matches by level number", () => {
    expect(filterLevels(index, "1")).toEqual([index[0]]);
  });

  it("matches by treasure name substring", () => {
    expect(filterLevels(index, "鑰匙")).toEqual([index[0]]);
  });

  it("matches case-insensitively", () => {
    const english: SearchIndexEntry[] = [
      { levelId: "level-03", levelNumber: 3, title: "Dragon's Lair", treasureNames: ["Golden Sword"] },
    ];
    expect(filterLevels(english, "dragon")).toEqual(english);
  });

  it("returns an empty array when nothing matches", () => {
    expect(filterLevels(index, "不存在的關鍵字")).toEqual([]);
  });
});
