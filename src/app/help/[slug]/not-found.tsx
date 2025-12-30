import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-[var(--color-background-gray)]">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">找不到這篇文章</p>
        <Link
          href="/"
          className="text-[var(--color-background-blue)] hover:underline"
        >
          ← 返回幫助中心
        </Link>
      </div>
    </div>
  );
}
