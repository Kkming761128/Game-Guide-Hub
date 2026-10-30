import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const games = defineCollection({
  loader: glob({ pattern: "**/game.md", base: "./src/content/games" }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    summary: z.string().optional(),
    sourceSite: z.string().url().optional(),
  }),
});

const treasure = z.object({
  name: z.string(),
  condition: z.string(),
  relatedLevel: z.string().optional(),
  coordinates: z.string().optional(),
  requiresSkin: z.string().optional(),
});

const relatedLevel = z.object({
  levelId: z.string(),
  relation: z.string(),
});

const storyChoice = z.object({
  description: z.string(),
  options: z.array(z.string()),
});

const levels = defineCollection({
  loader: glob({ pattern: "**/level-*.md", base: "./src/content/games" }),
  schema: z.object({
    game: z.string(),
    levelNumber: z.number(),
    levelId: z.string(),
    title: z.string(),
    treasures: z.array(treasure).default([]),
    coordinateTreasures: z.array(treasure).default([]),
    storyChoices: z.array(storyChoice).default([]),
    seal: z.string().optional(),
    specialEvents: z.array(z.string()).default([]),
    relatedLevels: z.array(relatedLevel).default([]),
    sourceUrl: z.string().url(),
    sourceLang: z.enum(["zh-Hans", "ja"]).optional(),
  }),
});

export const collections = { games, levels };
