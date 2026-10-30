## 溝通語言

一律使用繁體中文回覆使用者。程式碼、指令、檔案路徑與 API 欄位名稱保留原文。

## Agent skills

### Issue tracker

Issues are tracked as local markdown files under `.scratch/<feature>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Uses the five default triage labels (needs-triage, needs-info, ready-for-agent, ready-for-human, wontfix). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `CONTEXT.md` + `docs/adr/` at the repo root. See `docs/agents/domain.md`.

### Verification reminder

After closing out any ticket (checking off its checklist and committing), tell the user concretely how to manually verify it themselves before ending the turn — don't just say tests pass. Include:

- The exact command to start the app, and which URL or window it opens.
- The 2-5 specific things to click/try in the running app that exercise what the ticket added (not a generic "check it works").
- Any state needed to see an edge case, and how to undo it afterward.

## Game-Guide-Hub project rules

The starting idea is in `.scratch/idea.md`. Product scope, architecture and engineering rules go here once `/to-spec` has settled them.

匯入攻略的完整操作流程見根目錄 `AGENTS.md`(Codex 與 Claude Code 共用)。

Once the project can be started, register it in ProjectHub with `/projecthub-register`; `README.md` is the Guide ProjectHub shows.
