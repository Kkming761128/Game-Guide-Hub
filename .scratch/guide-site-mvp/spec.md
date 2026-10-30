# Guide Site MVP

Status: ready-for-agent

## Problem Statement

遊戲攻略分散在簡體中文、日文等各種來源網站上,格式不統一,關卡資訊、寶物取得條件、關卡間的關聯常常混在一大段連續文字裡,找起來很花時間。使用者想要一個自己掌控、整理過的繁體中文版本,放在網路上隨時能瀏覽,搜尋關卡或寶物時能立刻找到對應內容。

## Solution

建立一個通用、靜態的多遊戲攻略網站,部署在 GitHub Pages 上,任何人都能唯讀瀏覽,只有 repo 擁有者能新增內容。內容的新增方式是:擁有者在 Claude Code 或 Codex 的對話中貼上來源網址,coding agent 直接讀取原文、翻譯成繁體中文、把連續攻略拆成一關一頁、標註寶物與關卡關聯並自動建立超連結,寫成網站內容檔案。每款遊戲各自有獨立的關卡列表頁與限定在該遊戲內的搜尋功能(可搜關卡編號、關卡名稱、寶物名稱)。

## User Stories

1. As a 讀者, I want to see a list of all games on the homepage, so that I can quickly jump to the game I'm currently playing.
2. As a 讀者, I want to open a specific game's page and see all its levels listed in order, so that I can find the level I'm stuck on.
3. As a 讀者, I want to search within a game by level number, so that I can jump straight to the level I'm on.
4. As a 讀者, I want to search within a game by level name, so that I can find a level even if I don't remember its number.
5. As a 讀者, I want to search within a game by treasure name, so that I can find which level a specific collectible is in.
6. As a 讀者, I want search results restricted to the current game only, so that I'm not confused by same-named items from other games.
7. As a 讀者, I want each level page to show the full translated walkthrough text, so that I don't miss any detail from the original guide.
8. As a 讀者, I want treasure/collectible information clearly separated out on the level page, so that I can quickly check what I need to grab.
9. As a 讀者, I want to see links to related levels when a treasure or mechanic spans multiple levels, so that I can navigate directly to the connected level.
10. As a 讀者, I want emphasized/annotated text from the original guide rendered with a highlight style, so that important notes stand out visually.
11. As a 讀者, I want a link back to the original source article on every level page, so that I can cross-check the original if needed.
12. As a 讀者 on mobile, I want the pages to remain usable at phone width, so that I can check a guide while away from my desktop.
13. As the repo 擁有者, I want to paste a source URL to a coding agent and have it generate the content files for a new game or new levels, so that adding a guide doesn't require manually writing everything from scratch.
14. As the repo 擁有者, I want the agent to automatically convert Simplified Chinese text to Traditional Chinese, so that the site stays consistently in my preferred script.
15. As the repo 擁有者, I want the agent to translate Japanese source text into Traditional Chinese, so that I can also use Japanese-language guides as sources.
16. As the repo 擁有者, I want the agent to split one long multi-level guide article into separate per-level files, so that each level has its own dedicated page.
17. As the repo 擁有者, I want the agent to automatically detect and record level-to-level or treasure-to-level relationships as links, without needing my approval on each one, so that importing stays low-effort.
18. As the repo 擁有者, I want to be able to revisit and correct any specific level afterward if I spot a mistake, so that occasional translation/AI errors don't have to block publishing.
19. As the repo 擁有者, I want the import process to never fetch or copy images automatically, so that the process stays simple and I decide image inclusion case by case.
20. As the repo 擁有者, I want to manually add an image to a specific level later, so that levels that really need a screenshot can still have one.
21. As the repo 擁有者, I want the exact import workflow documented in a tool-agnostic file, so that both Claude Code and Codex can follow the same steps.
22. As the repo 擁有者, I want every push to the main branch to automatically build and deploy the site to GitHub Pages, so that I never have to run a manual deploy command.
23. As the repo 擁有者, I want the site to require no accounts, logins, or comment system, so that maintenance stays minimal.
24. As a visitor without an account, I want to browse any published game and level freely, so that I can treat it like a normal public reference website.
25. As the repo 擁有者, I want new games to use the exact same content structure as existing ones, so that I can keep adding games without redesigning anything.

## Implementation Decisions

- Static site generated with Astro; content authored as Markdown with frontmatter, modeled as two content collections: **Games** and **Levels**.
- **Games** collection holds per-game metadata: slug, display title, optional summary, optional primary source-site reference.
- **Levels** collection holds per-level data: parent game reference (by slug), level number, a stable level identifier, title, a list of treasures (name, acquisition condition, optional related-level reference), a list of related-level links (target level identifier + relation description), a required source URL, and an optional source-language tag.
- Level-to-level and treasure-to-level relationships are plain string references by level identifier, resolved at render time — not typed content references — so the schema isn't tightly coupled to collection internals.
- Routing has three layers: a site-wide homepage listing all games; a per-game page listing all its levels with an embedded search box; a per-level page rendering the full content.
- Search is scoped **per game only**, never cross-game. Implemented as a build-time generated JSON index per game (level number, title, treasure names), served as a static asset and consumed client-side.
- The search-matching logic is isolated into **one pure function** that takes the index data and a query string and returns the matching entries. This is the single seam this spec's automated test covers (see Testing Decisions).
- A Markdown extension renders `==emphasized text==` as a highlighted inline element, styled via site CSS, mirroring emphasis/annotations present in the original source guides.
- No image handling of any kind is automated by the import workflow. Images are a manual, per-level, after-the-fact addition, entirely outside this workflow's scope.
- Deployment: a CI workflow builds the site and deploys to GitHub Pages on every push to the main branch. The repository's Pages source must be switched to "GitHub Actions" once, manually, in the GitHub UI — a one-time setting outside this spec's scope.
- A tool-agnostic operating manual (readable by both Claude Code and Codex) documents the step-by-step import procedure: fetch source → script-convert/translate → split into levels → populate schema fields → auto-link related levels/treasures → preserve full translated body text with highlight markup → skip images → self-check before considering an import complete. The manual states explicitly that import is performed by a coding agent inside a conversation, never by a scheduled script calling a paid LLM/translation API.
- A short domain glossary document records the project's core vocabulary (Game, Guide, Level, Treasure, Level Link, Source URL), following this repo's existing single-context documentation convention (the glossary file is named `CONTEXT.md` in this repo, not `GLOSSARY.md`).
- One architecture decision record captures the choice to keep the import process agent-driven and conversational rather than building an automated scraping+LLM-API pipeline, including the alternative considered (a scheduled scraper calling a paid API) and the trade-off accepted (slower, manually-triggered imports in exchange for zero extra running cost).

## Testing Decisions

- A good test here checks only externally observable behavior: given a game's search index data and a query string, the right subset of levels comes back — not how any page happens to render that query.
- Only the search-matching function is unit-tested. Everything else this spec touches (content schema shape, page rendering, the deploy workflow) relies on Astro's own build-time schema validation plus manual browser verification, since this is a personal-scale static site with no other dynamic behavior worth regression-testing yet.
- There is no prior art for tests in this repo (the test directory is currently empty) — this is the first test, so it also establishes the project's test runner. A lightweight runner that pairs naturally with an Astro/Vite project and needs no extra runtime service is preferred.

## Out of Scope

- Building any automated scraper or scheduled job that calls a paid LLM/translation API — all translation/structuring work happens via a coding agent inside a conversation, per the operating manual.
- Cross-game search.
- Any account system, login, comments, or editing access for visitors.
- Automated image fetching or copying from source sites.
- A mandatory per-import human review/approval gate — review is optional and reactive (only when the owner notices a problem), not a required step before publishing.
- Any copyright/licensing compliance tooling beyond keeping a visible source-URL link on each level.
- Mobile-specific UX optimization beyond a basic responsive layout (no touch gestures, no app-like mobile experience).
- Fuzzy or typo-tolerant search — plain substring matching is the starting point; revisit only if it proves insufficient in practice.

## Further Notes

- The GitHub repository this site deploys to is `github.com/Kkming761128/Game-Guide-Hub`; the site's base-path configuration depends on that repo name and must stay in sync if the repo is ever renamed.
- This spec intentionally produces zero application code. It is the input to this repo's next workflow step, `/to-tickets`, which will break it into independently verifiable tickets.
