# 03: 匯入手冊與領域文件

**What to build:** 一份任何 coding agent(Claude Code 或 Codex)收到遊戲攻略來源網址時都能照做的操作手冊,以及這個專案的領域詞彙與一份記錄「匯入方式」這個架構決定的 ADR。這張票產出的是文件,但要寫到「一個沒有這次對話記憶的全新 agent session,照著文件就能完成一次正確的匯入」的細緻程度——下一張票(04)會實際拿它來驗證。

**Blocked by:** 01

**Status:** ready-for-agent

- [x] 根目錄新增 `AGENTS.md`,逐步寫出匯入流程:讀取原文 → 判斷語言並轉換(簡轉繁字符轉換 / 日文語意翻譯成繁體中文) → 判斷或建立遊戲 slug → 依關卡標記切分 → 填入 schema 的每個欄位(`sourceUrl` 必填) → 標註寶物與取得條件 → 自動建立雙向的關卡關聯連結(不需逐篇請使用者核可) → 內文完整翻譯保留、不摘要、原文強調處用 `==文字==` → 完全不處理圖片 → 完成後的自檢清單
- [x] `AGENTS.md` 明確寫出「不要做的事」:不呼叫付費 LLM/翻譯 API 的程式化呼叫、不下載或複製來源圖片、不摘要精簡正文
- [x] `CLAUDE.md` 的「Game-Guide-Hub project rules」小節加一行,指向 `AGENTS.md`,不重複描述流程內容
- [x] 根目錄新增 `CONTEXT.md`,記錄核心詞彙:Game(遊戲)、Guide(攻略)、Level(關卡)、Treasure(寶物)、Level Link(關卡關聯)、Source URL(原文出處),每個詞一行定義,對應 01 已定好的 schema 欄位
- [x] 新增 `docs/adr/0001-manual-agent-driven-import-no-llm-pipeline.md`,記錄:背景、考慮過的替代方案(自動化爬蟲+付費 LLM API pipeline)、決定理由(省額外費用、個人規模不需排程自動化)、後果(匯入速度受限人工操作頻率,無法自動偵測來源更新)

## Comments

- `AGENTS.md` 的逐步流程直接對照目前實際的 schema/檔名慣例寫(`src/content.config.ts`、`game.md` 不加底線前綴、`level-<NN>.md`),不是憑空想像的路徑,確保票 04 真的能照做。
- `CONTEXT.md` 沿用這個 repo 既有的 `docs/agents/domain.md` 慣例命名,不是 domain-modeling skill 預設的 `GLOSSARY.md`(在 `/to-spec` 階段已跟使用者確認過這個命名決定)。
- ADR 依 `docs/agents/domain-modeling` skill 的輕量格式寫(標題即決定本身、一段話背景/決定/理由,外加 Considered Options 與 Consequences 兩個真正有價值的選用段落),沒有套票裡原字面的四段式模板,內容涵蓋的資訊是一致的。
- 這張票是純文件變更,沒有程式碼可測,`npm test`/`astro check`/`npm run build` 仍重跑一次確認沒有不小心破壞既有功能。
- Code review(Standards 軸)抓到 ADR 多寫了一個 `## Why` 章節——`ADR-FORMAT.md` 只允許 `Status`/`Considered Options`/`Consequences` 三種選用章節,且跟上面這段 Comments 原本寫的「兩個選用段落」自相矛盾。已修正:把 `## Why` 的內容併回開頭段落,只留 `Considered Options` 與 `Consequences` 兩個選用章節。
