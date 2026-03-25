import { NextResponse } from "next/server";
import RSSParser from "rss-parser";

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  sourceIcon: string;
}

const parser = new RSSParser();

const FEEDS = [
  { url: "http://feeds.bbci.co.uk/news/world/rss.xml", source: "BBC News", icon: "🇬🇧" },
  { url: "http://rss.cnn.com/rss/edition.rss", source: "CNN", icon: "🇺🇸" },
  { url: "https://feeds.reuters.com/reuters/topNews", source: "Reuters", icon: "📰" },
  { url: "https://news.ycombinator.com/rss", source: "HN Blog", icon: "🟠" },
  {
    url: "https://news.naver.com/main/rss/politics/index.nhn",
    source: "네이버 뉴스",
    icon: "🇰🇷",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const source = searchParams.get("source");

  const feeds = source ? FEEDS.filter((f) => f.source === source) : FEEDS;

  try {
    const results = await Promise.allSettled(
      feeds.map(async (f) => {
        const feed = await parser.parseURL(f.url);
        return (feed.items ?? []).slice(0, 10).map((item) => ({
          title: item.title ?? "",
          link: item.link ?? "",
          pubDate: item.pubDate ?? "",
          source: f.source,
          sourceIcon: f.icon,
        }));
      })
    );

    const items: NewsItem[] = results
      .filter((r) => r.status === "fulfilled")
      .flatMap((r) => (r as PromiseFulfilledResult<NewsItem[]>).value)
      .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
