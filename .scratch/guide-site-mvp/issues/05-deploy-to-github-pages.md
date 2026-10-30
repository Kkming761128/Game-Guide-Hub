# 05: 部署到 GitHub Pages

**What to build:** 把已經本機驗證過(04)的網站,透過 GitHub Actions 自動建置並部署到 GitHub Pages,之後每次 push 到 main 分支都會自動更新上線版本,不需要手動跑部署指令。

**Blocked by:** 04

**Status:** ready-for-agent

- [x] 新增 `.github/workflows/deploy.yml`:`on: push` 到 `main`(外加 `workflow_dispatch`),含 build job(checkout、setup-node、`npm ci`、`npm run build`、`upload-pages-artifact`)與 deploy job(`actions/deploy-pages@v4`),並設好 `contents: read`、`pages: write`、`id-token: write` 權限
- [x] `astro.config.mjs` 的 `site`/`base` 設定對應 `https://Kkming761128.github.io` + `/Game-Guide-Hub`
- [x] 確認(提醒使用者手動操作,agent 無法代勞)repo 的 GitHub Settings → Pages 的 Source 已切換成「GitHub Actions」
- [x] push 後兩個 job(build、deploy)都成功
- [x] 在正式的 GitHub Pages 網址上重複一次 04 的驗證清單(首頁、遊戲頁+搜尋、關卡頁),確認沒有因為 base path 設定錯誤導致連結或靜態資源 404

## Comments

- repo 原本沒建,也沒裝 `gh` CLI。流程:用 `winget install --id GitHub.cli` 裝好 CLI → `gh auth login --web`(使用者在瀏覽器輸入一次性代碼授權)→ 建立 public repo 這個動作被 Claude Code 自動模式分類器擋下(`Create Public Surface`),改由使用者自己執行 `gh repo create Kkming761128/Game-Guide-Hub --public --source=. --remote=origin`。
- 本地分支原本叫 `master`,改名成 `main`(配合 workflow 與全專案慣例)後 `git push -u origin main`。
- 第一次 push 時 `.github/workflows/deploy.yml` 建立後忘了 commit,導致第一次 push 完全沒有觸發任何 workflow run——後來補 commit 才觸發。
- 第一次真正跑起來的 build job 失敗:Astro 7.4.4 要求 Node ≥22.23.4,但 workflow 原本釘在 Node 20,改成 Node 22 後 build 通過。
- 第二個問題:`deploy` job 失敗,錯誤訊息是 `Ensure GitHub Pages has been enabled`——因為 repo 剛建立,GitHub Pages 預設是停用的,Source 預設是「Deploy from a branch」。請使用者到 `https://github.com/Kkming761128/Game-Guide-Hub/settings/pages` 手動把 Source 切成「GitHub Actions」,切完後用 `gh run rerun --failed` 重跑剛才失敗的 deploy job,成功。
- 最終驗證:`https://kkming761128.github.io/Game-Guide-Hub/`、`.../lv-bu-zhuan/level-02/`、`.../lv-bu-zhuan/search-index.json` 都回應 200,base path 正確,沒有資源 404。
