import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navigation from "./modules/home/Navigation";
import Footer from "./modules/home/Footer";

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
        <div className="flex flex-col min-h-screen">
          {/* 在切換頁面時, Navigation 和 Footer 會固定顯示 */}
          <Navigation />
          <div className="flex-1 overflow-y-auto">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
