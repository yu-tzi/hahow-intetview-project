## For user

#### 簡介

展示英雄能力值，並提供編輯與儲存功能的頁面。

#### 連結

[⭐️ CLICK ME ⭐️](https://hahow-intetview-project.vercel.app/)

## For developer
#### 執行專案

```bash
npm i
# and
npm run dev
```
#### 專案架構

```
├── src
│    ├── pages 此資料夾底下的檔案會被 export 成頁面
│    │    ├── index.tsx
│    │    ├── _app.tsx
│    │    └── heroes
│    │        ├── index.tsx
│    │        └── [heroId].tsx 以 id 為 route 的 dynamic pages
│    ├── component 放置會被頁面所使用的元件
│    │    └── HeroPanelArea.tsx
│    │    └── heroList.tsx
│    ├── style 放置 styled-component 元件
│    │    ├── component
│    │    │   └── heroList.styled.ts
│    │    └──pages
│    │        ├── heroDetail.styled.ts
│    │        ├── heroIndex.styled.ts
│    │        └── homePage.styled.ts
│    │
│    └── utils 放置可以被複用的 function
│            ├── fetchApi.ts
│            └── getObjectSumNum.ts
│
│
├── README.md
├── package.json
├── next.config.js
├── .eslintrc.json
└── public
    └── favicon.ico ...
```

#### 網站角色與流程架構

![S__29360130](https://user-images.githubusercontent.com/59299530/233076545-430369e4-f55b-4595-b593-a93f43e3aafc.jpg)

#### 技術棧

- NextJS: A React-based web framework. I use it to simplify development process (using create-next-app to quickly build an app with TypeScript and Eslint setting, hosting using Vercel service) and improve the performance of my web applications (built-in performance optimization like automatic code splitting and component like next/image for visual stability and faster page loads).
- React: A JavaScript library. I use it to build reusable UI components and for faster rendering.
- styled-components: A CSS-in-JS library. I use it for reusable and readable code (it encapsulates CSS inside component, I don't have to worry about class name), and it also support type checking.
- eslint: A Javascript linter. I use it for identify common issues and enforce best practice. `eslint-config-next` is NextJS's default setting.
- TypeScript: A strongly typed programming language that builds on JavaScript. I use it for checking if my props or variables are correct and predictable by define their types.

#### coding styles

1. 你在程式碼中寫註解的原則，遇到什麼狀況會寫註解 ?
  - 我認為程式碼應該透過變數名稱、函式名稱、檔案名稱等等資訊，讓開發者理解其含義。但有幾種情況是例外：特殊的邏輯（e.g. 一般狀況下，API 失敗會提醒使用者，或者做出自動跳轉，但這支 API 只需要回傳 log 不需要額外動作），客製化功能（e.g. 針對某些特定 supplier 可能會開放部分 feature），或者是想要使用 Visual Studio 的 inline hints/tooltips 來增進開發體驗，這幾種狀況我會使用註解。
 

#### 遇到的困難、問題，以及解決的方法

- 因為對 NextJS 將 page 資料夾下的路徑變成 route 的模式不太熟悉，將元件 import 進個別的 page 中，HeroList 仍然會 re-render，後來經過文件查詢之後，才發現 NextJS 有提供 shared layout 的方法。

#### TODOS
- [ ]  增加函式註解，方便在 vscode 上面查看參數的商業定義。
- [ ]  目前取得 hero list 的流程是在 client side，但因為這個資訊應該不會太常更新，所以嘗試將取得資訊的時間點改為 server side 以節省效能。
- [ ]  增加 error handling 機制。
- [ ]  增加測試項目。
- [ ]  讓 UIX 更漂亮完整。
