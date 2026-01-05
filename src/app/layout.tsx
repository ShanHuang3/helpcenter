import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "./_components/Navigation";
import Footer from "./_components/Footer";
import SidebarMenu from "./_components/SidebarMenu";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Help Center",
  description: "Help Center App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {/* 在切換頁面時, Navigation 和 Footer 會固定顯示 */}
        <Navigation />
        <div className="flex flex-row flex-1">
          <SidebarMenu />
          <main className="flex flex-1 flex-col overflow-y-auto">
            {children}
            <Footer />
          </main>
        </div>
      </body>
    </html>
  );
}
