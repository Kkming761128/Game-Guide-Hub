# 01: 單一遊戲的關卡端對端渲染

**What to build:** 一個讀者打開網站首頁,能看到所有遊戲的清單；點進某款遊戲,能看到它所有關卡依序列出；點進某一關,能看到完整翻譯後的攻略內文、寶物清單與取得條件、與其他關卡的關聯超連結、原文強調處的螢光筆樣式、以及指回原文的出處連結。整條路徑用一款手寫的範例遊戲(2~3 關假內容,不必是真實攻略)驗證可行,之後的票才會接上真實內容。

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [x] 建好 Astro 專案骨架,`npm run dev` 可正常啟動
- [x] 定義 `games` 與 `levels` 兩個 content collection 的 schema(games: slug/title/summary?/sourceSite?；levels: game/levelNumber/levelId/title/treasures[]/relatedLevels[]/sourceUrl(必填)/sourceLang?)
- [x] 建一個手寫的範例遊戲,含 2~3 個關卡,內容涵蓋:至少一筆寶物(含取得條件)、至少一組關卡關聯、`sourceUrl`
- [x] 首頁(`/`)列出所有遊戲
- [x] 遊戲頁(`/<game>/`)依序列出該遊戲所有關卡(先不需要搜尋框,搜尋是下一張票)
- [x] 關卡頁(`/<game>/<level>/`)完整顯示翻譯內文、寶物清單、關卡關聯超連結(可點擊且導向正確關卡)、原文出處連結
- [x] Markdown 的 `==文字==` 語法被渲染成帶螢光筆樣式的 `<mark>` 元素,並有對應 CSS
- [x] 基本 RWD:在 375px 寬度下,首頁/遊戲頁/關卡頁版面不壞

## Comments

- 實作完成。`npm run build` 產出 4 個靜態頁面,手動檢查過產出的 HTML:highlight、寶物清單、關卡關聯連結(含正確的 `/Game-Guide-Hub/` base path)、原文出處連結都正確渲染。`npm run dev` 本機啟動後用 curl 驗證首頁與關卡頁回應 200。
- 與原規劃的兩點差異,供後續票(03 的 `AGENTS.md`/`CONTEXT.md`)寫文件時對齊:
  - 遊戲 metadata 檔案命名為 `game.md`,不是規劃時寫的 `_game.md`——Astro content collections 會把 `_` 開頭的檔案當成排除在外的 partial,所以不能用底線開頭。
  - Schema 定義檔實際路徑是 `src/content.config.ts`(專案根目錄下),不是 `src/content/config.ts`——目前安裝到的 Astro 版本(7.x)要求用新的 Content Layer API(`defineCollection` 搭配 `glob()` loader),舊版 `src/content/config.ts` + `type: 'content'` 的寫法已被移除。
- 搜尋框(票 02 範圍)尚未實作,遊戲頁目前只列出關卡清單。
- Code review(Spec 軸)抓到 `treasure.relatedLevel` 寫進 schema 與範例內容,但原本的寶物清單渲染沒有讀取它——已修正:寶物項目現在會顯示「(關聯:第 N 關:關卡名稱)」的超連結。Standards 軸抓到的幾點(關卡篩選邏輯重複、`LevelCard` props 可包成一個型別)屬於風格層級的 judgement call,先不處理,留待之後若有第二個真實遊戲內容時再視情況重構。
