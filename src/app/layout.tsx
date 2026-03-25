import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Boomxia - 실시간 트렌드 대시보드",
  description: "GitHub, HackerNews, Reddit, Mastodon, Bluesky, Steam 등 실시간 트렌드를 한 페이지에",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
