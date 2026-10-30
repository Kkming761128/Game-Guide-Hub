# 03: 匯入手冊與領域文件

**What to build:** 一份任何 coding agent(Claude Code 或 Codex)收到遊戲攻略來源網址時都能照做的操作手冊,以及這個專案的領域詞彙與一份記錄「匯入方式」這個架構決定的 ADR。這張票產出的是文件,但要寫到「一個沒有這次對話記憶的全新 agent session,照著文件就能完成一次正確的匯入」的細緻程度——下一張票(04)會實際拿它來驗證。

**Blocked by:** 01

**Status:** ready-for-agent

- [ ] 根目錄新增 `AGENTS.md`,逐步寫出匯入流程:讀取原文 → 判斷語言並轉換(簡轉繁字符轉換 / 日文語意翻譯成繁體中文) → 判斷或建立遊戲 slug → 依關卡標記切分 → 填入 schema 的每個欄位(`sourceUrl` 必填) → 標註寶物與取得條件 → 自動建立雙向的關卡關聯連結(不需逐篇請使用者核可) → 內文完整翻譯保留、不摘要、原文強調處用 `==文字==` → 完全不處理圖片 → 完成後的自檢清單
- [ ] `AGENTS.md` 明確寫出「不要做的事」:不呼叫付費 LLM/翻譯 API 的程式化呼叫、不下載或複製來源圖片、不摘要精簡正文
- [ ] `CLAUDE.md` 的「Game-Guide-Hub project rules」小節加一行,指向 `AGENTS.md`,不重複描述流程內容
- [ ] 根目錄新增 `CONTEXT.md`,記錄核心詞彙:Game(遊戲)、Guide(攻略)、Level(關卡)、Treasure(寶物)、Level Link(關卡關聯)、Source URL(原文出處),每個詞一行定義,對應 01 已定好的 schema 欄位
- [ ] 新增 `docs/adr/0001-manual-agent-driven-import-no-llm-pipeline.md`,記錄:背景、考慮過的替代方案(自動化爬蟲+付費 LLM API pipeline)、決定理由(省額外費用、個人規模不需排程自動化)、後果(匯入速度受限人工操作頻率,無法自動偵測來源更新)
