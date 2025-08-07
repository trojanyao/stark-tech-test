# 財報月營收視覺化

本專案是一個使用 **Next.js 14 App Router + React Server Components + MUI** 建構的前端專案，用來查詢並視覺化台股公司的每月營收與年增率資料。

可運行程式：[https://stark-tech-test-swart.vercel.app/](https://stark-tech-test-swart.vercel.app/)

資料來源為 [FinMind API](https://finmindtrade.com/analysis/#/data/api)。

## ✨ 技術棧

- [Next.js 15 (App Router)](https://nextjs.org/docs/app)
- React 18 Server & Client Components
- TypeScript
- [MUI v6](https://mui.com/)
- [FinMind API](https://finmindtrade.com/analysis/#/data/api)

---

## 📦 安裝與啟動

```bash
# 1. Clone 本專案
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

# 2. 安裝相依套件
pnpm install

# 3. 建立環境變數檔案
cp .env.sample .env.local

# 並填寫你的 FinMind API 金鑰：
# FINMIND_API_KEY=your_api_key_here

# 4. 本地啟動
pnpm dev
```

伺服器啟動後預設網址為：`http://localhost:3000`

---

## 🔐 環境變數

請在 `.env.local` 中設定：

```env
# 用於調用 FinMind API
FINMIND_API_KEY=your_api_key_here
```

---

## 🚀 一鍵部署至 Vercel

此專案已完整支援 Vercel，一鍵即可部署：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/trojanyao/stark-tech-test/tree)

部署後請至 Vercel 專案設定中，新增環境變數 `FINMIND_API_KEY`。

---

## 📁 專案結構簡述

```bash
app/
├── page.tsx              # 主畫面
├── components/           # React 元件（含搜尋、圖表等）
├── api/
│   └── finmind/route.ts  # 封裝 FinMind API 的 Route Handler
lib/
├── finmind.ts            # 封裝通用 fetch 請求邏輯
types/
├── index.ts              # 全域 TS 類型定義
```

---

## 🧩 功能說明

- 📈 台股代號搜尋（支援虛擬滾動）
- 🗓 選擇圖表時間區間（近 3 個月、近 6 個月等）
- 📊 每月營收視覺化
- 📉 計算單月營收年增率（YoY Growth）
- ⚙️ FinMind API 封裝，透過 `/api/finmind` Route Handler 代理轉發

---

## 📌 TODO / 未來可擴充

- 將詳細資料表格行列互換，優化使用者體驗
- 深色模式支援
