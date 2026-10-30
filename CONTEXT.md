# Context

本專案的核心詞彙。完整欄位定義見 `src/content.config.ts`，這裡只記錄「名詞的意思」，不重複 schema 細節。

- **Game（遊戲）**：一款被收錄進站的遊戲，對應 `src/content/games/<slug>/` 目錄，有自己獨立的關卡列表與搜尋範圍。
- **Guide（攻略）**：針對某個 Game 的完整攻略內容，由多個 Level 組成；通常來自整理某個來源網站的一篇長文。
- **Level（關卡）**：Guide 裡最小的獨立單元，對應一個 `level-<NN>.md` 檔案，有唯一的 `levelId`，是網站上一個獨立頁面。
- **Treasure（寶物）**：Level 內的收集品／道具，有取得條件（`condition`），可能與另一個 Level 相關（`relatedLevel`），可能需要特定角色皮膚（`requiresSkin`）才能取得，原文有提到才填。存於 `treasures`。
- **Coordinate Treasure（座標寶物）**：原文有標出具體地圖座標才能拿到的寶物（常見於「彩蛋座標」類獎勵），只記錄 `name`、必填的固定地圖座標（`coordinates`），以及可選的 `relatedLevel`／`requiresSkin`——不記錄取得條件說明；獨立存於 `coordinateTreasures`，在關卡頁的呈現順序固定排在「劇情選項」之後、「寶物」之前。座標會顯示在最前面，同一座標的多個寶物會合併成一行、只顯示一次座標。
- **Story Choice（劇情選項）**：Level 裡「玩家二選一（或多選一）、各選項分別導向不同結果」的劇情決定點，存於 `storyChoices`（每筆含 `description` 決定點描述、`options` 各選項結果），在關卡頁的呈現順序固定排在「單挑／對話」之後、「寶物」之前；原文沒有分支選項就留空。
- **Seal（印綬）**：部分 Level 有的全關卡完成度評價機制（例如「觸發全部單挑」「不讓友軍撤退」），取得條件存於 `seal`，在關卡頁的呈現順序固定排在「寶物」之後、「特殊劇情」之前；原文沒有這個機制就留空。
- **Special Event（特殊劇情）**：Level 裡隱藏或特殊觸發的劇情事件（例如特定條件才會出現的過場），存於 `specialEvents`，在關卡頁的呈現順序固定排在「寶物」之後、「關卡關聯」之前。
- **Level Link（關卡關聯）**：兩個 Level 之間的前後依賴或道具關聯（例如「需先完成某關才能解鎖」），匯入時由 agent 自動判斷並建立，存於 `relatedLevels`。
- **Source URL（原文出處）**：每個 Level 必填的原始攻略網址，匯入時完整保留，供追溯核對原文。
