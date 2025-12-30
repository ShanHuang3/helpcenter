# Next.js 傳遞和基礎方法指南

## 目錄

1. [數據傳遞方法](#數據傳遞方法)
2. [路由系統](#路由系統)
3. [Server Components vs Client Components](#server-components-vs-client-components)
4. [基礎使用方法](#基礎使用方法)

---

## 數據傳遞方法

### 1. Props 傳遞（組件間傳遞）

#### Server Component 傳遞給 Server Component

```typescript
// app/components/UserCard.tsx
interface UserCardProps {
  name: string;
  email: string;
  age?: number; // 可選屬性
}

export default function UserCard({ name, email, age }: UserCardProps) {
  return (
    <div>
      <h2>{name}</h2>
      <p>{email}</p>
      {age && <p>年齡: {age}</p>}
    </div>
  );
}

// app/page.tsx
import UserCard from "./components/UserCard";

export default function Home() {
  return <UserCard name="張三" email="zhang@example.com" age={25} />;
}
```

#### Server Component 傳遞給 Client Component

```typescript
// app/components/Counter.tsx (Client Component)
"use client";

interface CounterProps {
  initialCount: number;
  title: string;
}

export default function Counter({ initialCount, title }: CounterProps) {
  const [count, setCount] = useState(initialCount);

  return (
    <div>
      <h3>{title}</h3>
      <p>計數: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  );
}

// app/page.tsx (Server Component)
import Counter from "./components/Counter";

export default function Home() {
  return <Counter initialCount={0} title="我的計數器" />;
}
```

### 2. 路由參數傳遞（URL 參數）

#### 動態路由參數

```typescript
// app/users/[id]/page.tsx
interface UserPageProps {
  params: {
    id: string;
  };
}

export default function UserPage({ params }: UserPageProps) {
  return <div>用戶 ID: {params.id}</div>;
}

// 訪問: /users/123 → params.id = "123"
```

#### 多層動態路由

```typescript
// app/shop/[category]/[product]/page.tsx
interface ProductPageProps {
  params: {
    category: string;
    product: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div>
      <h1>分類: {params.category}</h1>
      <h2>產品: {params.product}</h2>
    </div>
  );
}

// 訪問: /shop/electronics/laptop → category="electronics", product="laptop"
```

#### 可選路由參數

```typescript
// app/blog/[[...slug]]/page.tsx
interface BlogPageProps {
  params: {
    slug?: string[];
  };
}

export default function BlogPage({ params }: BlogPageProps) {
  if (!params.slug) {
    return <div>所有文章</div>;
  }

  return <div>文章路徑: {params.slug.join("/")}</div>;
}

// 訪問: /blog → 顯示所有文章
// 訪問: /blog/2024/01 → slug = ["2024", "01"]
```

### 3. 查詢參數（Search Params）

```typescript
// app/search/page.tsx
interface SearchPageProps {
  searchParams: {
    q?: string;
    page?: string;
  };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || "";
  const page = parseInt(searchParams.page || "1");

  return (
    <div>
      <h1>搜尋結果</h1>
      <p>關鍵字: {query}</p>
      <p>頁碼: {page}</p>
    </div>
  );
}

// 訪問: /search?q=nextjs&page=2
```

### 4. Server Actions（服務器操作）

```typescript
// app/actions.ts
"use server";

export async function createUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  // 在這裡處理數據庫操作
  console.log("創建用戶:", { name, email });

  return { success: true, message: "用戶創建成功" };
}

// app/components/UserForm.tsx
("use client");

import { createUser } from "../actions";

export default function UserForm() {
  async function handleSubmit(formData: FormData) {
    const result = await createUser(formData);
    alert(result.message);
  }

  return (
    <form action={handleSubmit}>
      <input name="name" placeholder="姓名" required />
      <input name="email" type="email" placeholder="郵箱" required />
      <button type="submit">提交</button>
    </form>
  );
}
```

### 5. Context API（客戶端狀態管理）

```typescript
// app/context/ThemeContext.tsx
"use client";

import { createContext, useContext, useState } from "react";

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

// app/layout.tsx
import { ThemeProvider } from "./context/ThemeContext";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

// app/components/ThemeToggle.tsx
("use client");

import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return <button onClick={toggleTheme}>當前主題: {theme}</button>;
}
```

---

## 路由系統

### App Router 結構

```
app/
├── layout.tsx          # 根布局（所有頁面共用）
├── page.tsx            # 首頁 (/)
├── about/
│   └── page.tsx        # /about
├── users/
│   ├── page.tsx        # /users (用戶列表)
│   └── [id]/
│       └── page.tsx    # /users/123 (動態路由)
└── blog/
    ├── page.tsx        # /blog
    └── [slug]/
        └── page.tsx    # /blog/my-post
```

### 導航方法

#### 1. Link 組件（客戶端導航）

```typescript
import Link from "next/link";

export default function Navigation() {
  return (
    <nav>
      <Link href="/">首頁</Link>
      <Link href="/about">關於</Link>
      <Link href="/users/123">用戶 123</Link>
    </nav>
  );
}
```

#### 2. useRouter Hook（客戶端程式化導航）

```typescript
"use client";

import { useRouter } from "next/navigation";

export default function MyComponent() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/about");
    // 或 router.replace('/about') 替換歷史記錄
    // 或 router.back() 返回上一頁
  };

  return <button onClick={handleClick}>前往關於頁面</button>;
}
```

#### 3. redirect（服務器端重定向）

```typescript
import { redirect } from "next/navigation";

export default function LoginPage() {
  const isLoggedIn = false; // 假設的檢查

  if (!isLoggedIn) {
    redirect("/login");
  }

  return <div>受保護的內容</div>;
}
```

---

## Server Components vs Client Components

### Server Components（默認）

**特點：**

- 在服務器上渲染
- 可以直接訪問數據庫和 API
- 不會發送到客戶端（減少 JavaScript bundle）
- 不能使用 React Hooks（useState, useEffect 等）
- 不能使用瀏覽器 API

**使用場景：**

- 數據獲取
- 訪問後端資源
- 保持敏感信息在服務器上
- 減少客戶端 JavaScript

```typescript
// app/users/page.tsx (Server Component)
async function getUsers() {
  const res = await fetch("https://api.example.com/users");
  return res.json();
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

### Client Components

**特點：**

- 在客戶端渲染
- 可以使用 React Hooks
- 可以使用瀏覽器 API
- 可以處理用戶交互

**使用場景：**

- 需要交互性（onClick, onChange 等）
- 需要使用 useState, useEffect 等 Hooks
- 需要使用瀏覽器 API（localStorage, window 等）

```typescript
// app/components/InteractiveButton.tsx
"use client";

import { useState } from "react";

export default function InteractiveButton() {
  const [count, setCount] = useState(0);

  return <button onClick={() => setCount(count + 1)}>點擊次數: {count}</button>;
}
```

---

## 基礎使用方法

### 1. 數據獲取

#### fetch（Server Component）

```typescript
// app/posts/page.tsx
async function getPosts() {
  const res = await fetch("https://api.example.com/posts", {
    cache: "no-store", // 不緩存（每次請求都獲取新數據）
    // 或 cache: 'force-cache' // 強制緩存
    // 或 next: { revalidate: 3600 } // 每小時重新驗證
  });

  if (!res.ok) {
    throw new Error("獲取文章失敗");
  }

  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  );
}
```

### 2. 元數據（Metadata）

```typescript
// app/about/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "關於我們",
  description: "這是關於我們頁面",
  openGraph: {
    title: "關於我們",
    description: "這是關於我們頁面",
    images: ["/og-image.jpg"],
  },
};

export default function AboutPage() {
  return <div>關於我們</div>;
}
```

### 3. 加載狀態（Loading）

```typescript
// app/users/loading.tsx
export default function Loading() {
  return <div>載入中...</div>;
}

// 當 /users 頁面加載時，會自動顯示這個組件
```

### 4. 錯誤處理（Error）

```typescript
// app/users/error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>發生錯誤</h2>
      <p>{error.message}</p>
      <button onClick={reset}>重試</button>
    </div>
  );
}
```

### 5. 布局（Layout）

```typescript
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav>儀表板導航</nav>
      <main>{children}</main>
      <footer>儀表板頁腳</footer>
    </div>
  );
}
```

### 6. 模板（Template）

```typescript
// app/dashboard/template.tsx
export default function DashboardTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="animate-in">{children}</div>;
}

// Template 與 Layout 的區別：
// - Layout 在路由切換時保持狀態
// - Template 在路由切換時創建新實例
```

### 7. 中間件（Middleware）

```typescript
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 檢查認證
  const token = request.cookies.get("token");

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
```

---

## 最佳實踐

1. **優先使用 Server Components**：減少客戶端 JavaScript bundle
2. **只在需要時使用 Client Components**：添加 'use client' 指令
3. **使用 TypeScript**：提供類型安全
4. **合理使用緩存**：根據數據更新頻率選擇緩存策略
5. **錯誤處理**：為重要路由添加 error.tsx
6. **加載狀態**：提供良好的用戶體驗

---

## 總結

Next.js 提供了多種數據傳遞方法：

- **Props**：組件間傳遞
- **路由參數**：URL 動態參數
- **查詢參數**：URL 查詢字符串
- **Server Actions**：服務器端操作
- **Context API**：全局狀態管理

選擇合適的方法取決於您的具體需求！
