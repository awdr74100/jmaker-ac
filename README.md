<div align="center">
   <a href="https://jmaker-ac.netlify.app" title="JammeryHQ" target="_blank">
      <img src="https://raw.githubusercontent.com/awdr74100/jmaker-ac/master/src/assets/img/logo.png" alt="JMaker" width="100">
   </a>
   <h2>J-Maker 實驗室門禁管制系統</h2>
</div>

此為未來大學專班地下室門禁管制系統後台，採取前後端分離架構，硬體端使用的 ESP8266、ESP32、Raspberry Pi 可透過開設出的 RESTful API 完成與資料庫的溝通，操作人員可由線上網站管理所有系統成員，比如 CRUD 等操作。

[![Netlify Status](https://api.netlify.com/api/v1/badges/5a6cab16-bf71-489b-ba5e-59ede1af1b01/deploy-status)](https://app.netlify.com/sites/jmaker-ac/deploys)

## 線上演示

- Demo：https://jmaker-ac.netlify.app
- API Doc：https://github.com/awdr74100/jmaker-ac-api

## 更新日誌

- 2020/08/04：修復 Chrome 80+ 針對跨域 Cookie 的規則調整 (SameSite 必須從預設 Lax 改為 None 同時加上 Secure 屬性)
- 2020/09/29：修復 IOS 裝置中 Chrome 與 Safari 樣式兼容問題

## 設計說明

解決硬體端傳統與它端整合上的困難，所有硬體都只需要透過基本的 HTTP Request 即可與資料庫做溝通，操作人員在使用前也不需要安裝任何的資料庫及程式，輸入網址即可進入操作介面。此專案支援 RWD、SPA、PWA，意即在手機上使用也不會有體驗低落的問題。

- 第一道進出入自動門 ✔
- 專題討論空間自動門 ✔
- 專題討論空間硬體設備 ✔
- CNC 器具間權限控管 ✔
- 違規事項訊息推播 ✔
- 3D 列印器材間權限控管
- 供影像辨識用圖片上傳

## 專案功能

- 基於 Token 的身分驗證機制 (JWT)
- 自製 Grid System 與 Spacing 完成響應式設計
- 使用 Imgur API 實作上傳圖片功能
- 使用 Nodemailer 進行訊息推播
- 使用 Argon2 加解密使用者密碼
- 使用 Vuex 管理狀態
- 管理員 (CRUD)
- 系統成員 (CRUD)
- 權限檢查
- 骨架屏載入

## 使用技術

1. 前端

   - Vue.js / Vuex / Vue Router / Vue CLI 4
   - Webpack
   - JavaScript (ES6+)
   - AJAX / Axios
   - OOCSS / BEM / 7-1 Pattern
   - SCSS
   - RWD
   - PWA
   - Web APIs (FileRender、FormData、DragEvent、Web Storage)
   - Netlify Deployment

2. 後端

   - Node.js / Express.js
   - MongoDB / Mongoose (ODM)
   - JWT / Cookie
   - RESTful API
   - Argon2
   - Nodemailer
   - Vercel Deployment

3. 代碼風格

   - ESLint (Airbnb)
   - Prettier

4. 第三方 API

   - Imgur API

5. 額外插件

   - vue-axios
   - vue-fontawesome
   - vue-js-modal
   - vue-loading-overlay
   - vue-loading-skeleton
   - vue-progressbar
   - vee-validate

6. 其他
   - Responsive Grid System
   - Responsive Spacing
   - Theme Color

## 應用介面

登入頁面

![login](https://i.imgur.com/foUsZcK.png)

載入動畫 (使用 CSS Animation)

![loading](https://i.imgur.com/R97MdCm.png)

骨架屏 & 進度條

![skeleton](https://i.imgur.com/uihkcRm.png)

實體用戶註冊頁面

![register](https://i.imgur.com/ARK14Bs.png)

互動視窗 (註冊用戶)

![registerModal](https://i.imgur.com/1pGsy0G.png)

互動視窗 (刪除用戶)

![deleteModal](https://i.imgur.com/Lb09srh.png)

調整用戶權限頁面

![adjust](https://i.imgur.com/xxmZSqh.png)

互動視窗 (調整用戶)

![adjustModal](https://i.imgur.com/NvSz47A.png)

違規訊息推播頁面

![mail](https://i.imgur.com/PqCLijY.png)

拖曳上傳圖片 (使用 DragEvent)

![mailDrop](https://i.imgur.com/NcVnoho.png)

互動視窗 (選擇用戶)

![mailModal](https://i.imgur.com/Gv5rIbe.png)

預覽圖片 (使用 FileRender)

![preview](https://i.imgur.com/GcJXsAA.png)

互動視窗 (查詢用戶)

![search](https://i.imgur.com/PokIDlj.png)
