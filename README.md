# J-MAKER 實驗室門禁管制系統

此為未來大學專班地下室門禁管制系統後台，採取前後端分離架構，硬體端使用的 ESP8266、ESP32、Raspberry Pi 可透過開設出的 RESTful API 完成與資料庫的溝通，接著可透過前端串接 API 使之驅動的操作介面完成人員管制的目的。

## 線上演示

Demo：https://jmaker.netlify.app/

## 更新日誌

- 2020/08/04：修復 Chrome 80+ 針對跨域 Cookie 的規則調整 (SameSite 必須從預設 Lax 改為 None 同時加上 Secure 屬性)

## 設計說明

解決硬體端傳統與它端整合上的困難，所有硬體都只需要透過基本的 HTTP Request 即可與資料庫做溝通，操作人員在使用前也不需要安裝任何的資料庫及程式，輸入網址即可進入操作介面。此專案支援 SPA、PWA，意即在手機上使用也沒問題。

- 第一道進出入自動門 ✔
- 專題討論空間自動門 ✔
- 專題討論空間硬體設備 ✔
- CNC 器具間權限控管
- 3D 列印器材間權限控管

## 使用技術

1. 前端

   - Vue.js / Vuex / Vue Router / Vue CLI 4
   - Webpack / Prerender SPA
   - JavaScript (ES6+)
   - AJAX / Axios
   - SCSS
   - OOCSS / BEM / 7-1 Pattern
   - RWD
   - PWA
   - Netlify Deployment

2. 後端

   - Node.js / Express.js
   - MongoDB / Mongoose (ODM)
   - JWT / Cookie
   - Argon2
   - Nodemailer
   - Vercel Deployment

3. 代碼風格

   - ESLint (Airbnb) / Prettier

4. 第三方 API

   - Imgur API

5. 前端相關套件

   - vue-axios
   - vue-fontawesome
   - vue-js-modal
   - vue-loading-overlay
   - vue-loading-skeleton
   - vue-progressbar
   - vee-validate

6. 其他

    - 自製 Grid System
    - 自製 Spacing

## 頁面展示

登入頁面

![login](https://i.imgur.com/iTRFHPo.png)

骨架屏

![skeleton](https://i.imgur.com/yxmJ4pp.png)

實體用戶註冊

![register](https://i.imgur.com/CLsiyI0.png)

註冊視窗

![registerModal](https://i.imgur.com/6O5wMer.png)

刪除視窗

![deleteModal](https://i.imgur.com/UyQwCy6.png)

調整用戶權限

![adjust](https://i.imgur.com/xiSbekd.png)

調整視窗

![adjustModal](https://i.imgur.com/S17tDSN.png)

違規訊息推播

![mail](https://i.imgur.com/atafO2q.png)

推播視窗

![mailModal](https://i.imgur.com/iDmuvON.png)

預覽圖片 (使用 FileRender 完成)

![preview](https://i.imgur.com/S97Wz1L.png)
