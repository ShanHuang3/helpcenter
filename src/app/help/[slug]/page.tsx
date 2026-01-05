import { notFound } from "next/navigation";
import Link from "next/link";

// 定義幫助文章的內容（可以之後改為從資料庫或 API 獲取）
const helpArticles: Record<string, { title: string; content: string }> = {
  "user-guide": {
    title: "使用者指南",
    content: `
      <h2>歡迎使用系統</h2>
      <p>這是一份完整的使用者指南，將幫助您了解如何使用本系統的各項功能。</p>

      <h3>快速開始</h3>
      <p>首先，您需要...</p>

      <h3>主要功能</h3>
      <ul>
        <li>功能一：說明...</li>
        <li>功能二：說明...</li>
        <li>功能三：說明...</li>
      </ul>

      <h3>常見問題</h3>
      <p>如果您遇到任何問題，請參考常見問題頁面或聯繫客服。</p>
    `,
  },
  "json-upload-guide": {
    title: "JSON 上傳指南",
    content: `
      <h2>JSON 上傳指南</h2>
      <p>本指南將教您如何上傳 JSON 檔案到系統中。</p>

      <h3>步驟一：準備 JSON 檔案</h3>
      <p>確保您的 JSON 檔案格式正確...</p>

      <h3>步驟二：上傳檔案</h3>
      <p>點擊上傳按鈕，選擇您的 JSON 檔案...</p>

      <h3>步驟三：驗證資料</h3>
      <p>系統會自動驗證您的 JSON 資料格式...</p>
    `,
  },
  "settings-guide": {
    title: "設定指南",
    content: `
      <h2>設定指南</h2>
      <p>了解如何設定您的帳號和偏好設定。</p>

      <h3>帳號設定</h3>
      <p>您可以在此修改個人資料...</p>

      <h3>偏好設定</h3>
      <p>自訂您的使用偏好...</p>
    `,
  },
  "automation-guide": {
    title: "自動化指南",
    content: `
      <h2>自動化指南</h2>
      <p>學習如何設定自動化流程來提升工作效率。</p>

      <h3>建立自動化規則</h3>
      <p>設定您的自動化規則...</p>

      <h3>管理自動化任務</h3>
      <p>監控和管理您的自動化任務...</p>
    `,
  },
};

interface HelpPageProps {
  params:
    | Promise<{
        slug: string;
      }>
    | {
        slug: string;
      };
}

export default async function HelpPage({ params }: HelpPageProps) {
  // 處理 params 可能是 Promise 的情況（Next.js 16+）
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;

  // 調試：檢查 slug 值
  console.log("Full params:", resolvedParams);
  console.log("Received slug:", slug);
  console.log("Available articles:", Object.keys(helpArticles));

  if (!slug) {
    notFound();
  }

  const article = helpArticles[slug];

  if (!article) {
    console.log("Article not found for slug:", slug);
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 bg-[var(--color-background-gray)]">
        <div>
          <div className="mt-8 pt-8 flex justify-between max-w-4xl mx-auto px-4">
            <Link
              href="/help"
              className="text-[var(--color-background-blue)] border border-gray-200 rounded-md px-4 py-2 bg-blue-500 text-white hover:scale-105 transition-all duration-300"
            >
              ← 返回幫助中心
            </Link>
            <button className="text-blue-500 border border-blue-500 rounded-full px-4 py-2 bg-white-500 hover:scale-105 transition-all duration-300 cursor-pointer">
              ↓ Download
            </button>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              {article.title}
            </h1>
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            {/* 調試信息 - 暫時顯示 */}
            <div className="border-t border-gray-200 mt-8 mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
              <p className="font-bold text-yellow-800">調試信息：</p>
              <p>
                收到的 slug 值:{" "}
                <code className="bg-yellow-100 px-2 py-1 rounded">
                  {slug || "未定義"}
                </code>
              </p>
              <p>
                可用的文章:{" "}
                <code className="bg-yellow-100 px-2 py-1 rounded">
                  {Object.keys(helpArticles).join(", ")}
                </code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
