# Context

本專案的核心詞彙。完整欄位定義見 `src/content.config.ts`，這裡只記錄「名詞的意思」，不重複 schema 細節。

- **Game（遊戲）**：一款被收錄進站的遊戲，對應 `src/content/games/<slug>/` 目錄，有自己獨立的關卡列表與搜尋範圍。
- **Guide（攻略）**：針對某個 Game 的完整攻略內容，由多個 Level 組成；通常來自整理某個來源網站的一篇長文。
- **Level（關卡）**：Guide 裡最小的獨立單元，對應一個 `level-<NN>.md` 檔案，有唯一的 `levelId`，是網站上一個獨立頁面。
- **Treasure（寶物）**：Level 內的收集品／道具，有取得條件（`condition`），可能與另一個 Level 相關（`relatedLevel`）。
- **Level Link（關卡關聯）**：兩個 Level 之間的前後依賴或道具關聯（例如「需先完成某關才能解鎖」），匯入時由 agent 自動判斷並建立，存於 `relatedLevels`。
- **Source URL（原文出處）**：每個 Level 必填的原始攻略網址，匯入時完整保留，供追溯核對原文。
