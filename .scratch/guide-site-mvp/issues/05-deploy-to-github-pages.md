# 05: 部署到 GitHub Pages

**What to build:** 把已經本機驗證過(04)的網站,透過 GitHub Actions 自動建置並部署到 GitHub Pages,之後每次 push 到 main 分支都會自動更新上線版本,不需要手動跑部署指令。

**Blocked by:** 04

**Status:** ready-for-agent

- [ ] 新增 `.github/workflows/deploy.yml`:`on: push` 到 `main`(外加 `workflow_dispatch`),含 build job(checkout、setup-node、`npm ci`、`npm run build`、`upload-pages-artifact`)與 deploy job(`actions/deploy-pages@v4`),並設好 `contents: read`、`pages: write`、`id-token: write` 權限
- [ ] `astro.config.mjs` 的 `site`/`base` 設定對應 `https://Kkming761128.github.io` + `/Game-Guide-Hub`
- [ ] 確認(提醒使用者手動操作,agent 無法代勞)repo 的 GitHub Settings → Pages 的 Source 已切換成「GitHub Actions」
- [ ] push 後兩個 job(build、deploy)都成功
- [ ] 在正式的 GitHub Pages 網址上重複一次 04 的驗證清單(首頁、遊戲頁+搜尋、關卡頁),確認沒有因為 base path 設定錯誤導致連結或靜態資源 404
