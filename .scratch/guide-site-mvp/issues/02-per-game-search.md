# 02: 單遊戲內搜尋

**What to build:** 在某款遊戲的關卡列表頁上,讀者可以打關鍵字即時篩出符合的關卡——支援關卡編號、關卡名稱、寶物名稱三種搜尋對象,結果只限於目前這款遊戲,不會混進其他遊戲的資料。

**Blocked by:** 01

**Status:** ready-for-agent

- [x] Build 階段為每款遊戲產生一份搜尋索引(JSON 靜態檔),內容包含該遊戲所有關卡的編號、名稱、寶物名稱清單
- [x] 搜尋比對邏輯抽成一個獨立的純函式(輸入索引資料 + 查詢字串,輸出符合的關卡清單),並附上單元測試(此為全案唯一的自動化測試,需要先建立測試執行環境)
- [x] 遊戲頁的搜尋框呼叫這個函式,即時(不需按送出)篩出結果並渲染成可點擊的關卡清單,連結到對應關卡頁
- [x] 比對不分大小寫,子字串比對即可(不需要 fuzzy/容錯搜尋)
- [x] 在有兩款以上範例遊戲的情況下驗證:A 遊戲頁的搜尋框不會搜到 B 遊戲的關卡或寶物

## Comments

- `src/lib/searchLevels.ts` 的 `filterLevels` 純函式用 TDD 完成,5 個單測涵蓋:關卡名稱比對、關卡編號比對、寶物名稱比對、大小寫不敏感、查無結果。`npm test`(vitest)全綠。
- `src/pages/[game]/search-index.json.ts` 用 `getStaticPaths` 枚舉每款遊戲,各自輸出獨立的 JSON 索引。`src/components/SearchBox.astro` 的 client script 直接 `import` 這個純函式,不重複實作比對邏輯。
- 新增第二款範例遊戲 `second-sample-game`,刻意用跟第一款遊戲重複的關卡名稱(「新手村」)與相似寶物名稱(「鑰匙」vs「生鏽的鑰匙」),驗證跨遊戲隔離。
- 用 Playwright 對本機 dev server 做了實際瀏覽器互動驗證(輸入關鍵字即時篩選、清空恢復全列表、在 `second-sample-game` 頁搜尋 `sample-game` 的寶物名稱得到零結果),不只是看 build 產出的靜態檔案。
- 原本 `[game]/index.astro` 用的 `LevelCard.astro` 元件已被 `SearchBox.astro`(預設顯示全部關卡)取代,確認沒有其他地方引用後刪除,避免留下死程式碼。
- Code review(Standards 軸)抓到兩點並已修正:(1)`[game]/index.astro` 與 `search-index.json.ts` 原本各自重複一次「列舉所有遊戲 slug 當靜態路徑」的邏輯,抽成共用的 `src/lib/games.ts` 的 `getGames()`,首頁(`src/pages/index.astro`)也一併改用;(2)`SearchBox.astro` 原本用魔術字串 `"__LEVEL_ID__"` 做字串取代來拼關卡網址,改成直接在 client script 裡 `import { levelPath }` 呼叫,不再靠取代字串拼 URL。修正後重跑過 `npm test`、`astro check`、`npm run build`,以及 Playwright 瀏覽器驗證,行為與修正前完全一致。
