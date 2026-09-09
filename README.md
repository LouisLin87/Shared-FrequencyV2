# 默契電台｜GitHub Pages 上傳包

這個資料夾可以直接放到 GitHub 儲存庫根目錄。網站無廣告、無分析追蹤、無外部字型，背景音樂由瀏覽器即時合成。

## 目前狀態

根目錄的 config.js 已連到目前公開的 Apps Script 後端，可以直接上傳 GitHub。只有在日後建立新的 Apps Script 部署網址時，才需要依下列步驟更換。

## 更換 Apps Script 後端

1. 在「默契電台－玩家與排名紀錄」Google 試算表開啟「擴充功能 → Apps Script」。
2. 將 `apps-script-backend/Code.gs` 全部貼到 Apps Script 的 `Code.gs`，儲存。
3. 選擇「部署 → 新增部署 → 網頁應用程式」。執行身分選「我」，存取權選「任何人」，完成授權。
4. 複製部署產生、結尾為 `/exec` 的網址。
5. 打開根目錄的 `config.js`，只把該網址貼進 `appsScriptUrl` 的引號內。請勿填試算表網址、帳號或密碼。

範例：

```js
window.TONGPIN_CONFIG={appsScriptUrl:'https://script.google.com/macros/s/部署代碼/exec'};
```

## 上傳 GitHub

1. 建立一個新的 GitHub 儲存庫，把這個資料夾內的所有檔案與資料夾上傳到根目錄。
2. 開啟儲存庫「Settings → Pages」。
3. Source 選「Deploy from a branch」，Branch 選 `main` 與 `/(root)`，按 Save。
4. 等待 GitHub 顯示公開網址後即可分享。

若日後清空 config.js 內的 Apps Script 網址，網站會清楚顯示「本機預覽模式」，遊戲仍可試玩，但資料只保存在同一個瀏覽器，跨裝置排行榜不會生效。

## 隱私設定

- Google 試算表維持私人，不要改成「知道連結的人可檢視」。
- GitHub 儲存庫可以公開；此包不包含試算表 ID、Google 帳號、密碼、權杖或玩家資料。
- 分享網址只包含隨機頻道代碼，不包含出題答案。
- 持有挑戰網址的人可以看到該頻道的暱稱、遊戲頭像、分數與排名。
- 頻道和相關玩家紀錄於建立 365 天後失效，網站下次使用時會清除。
