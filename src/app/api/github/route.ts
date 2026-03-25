import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export interface GithubRepo {
  rank: number;
  name: string;
  url: string;
  description: string;
  language: string;
  stars: string;
  forks: string;
  todayStars: string;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang") || "";
  const since = searchParams.get("since") || "daily";

  try {
    const url = `https://github.com/trending${lang ? `/${lang}` : ""}?since=${since}`;
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: 300 },
    });
    const html = await res.text();
    const $ = cheerio.load(html);

    const repos: GithubRepo[] = [];
    $("article.Box-row").each((i, el) => {
      const name = $(el).find("h2 a").text().trim().replace(/\s+/g, "");
      const url = "https://github.com" + $(el).find("h2 a").attr("href");
      const description = $(el).find("p").text().trim();
      const language = $(el).find('[itemprop="programmingLanguage"]').text().trim();
      const stars = $(el).find('a[href*="/stargazers"]').first().text().trim();
      const forks = $(el).find('a[href*="/forks"]').text().trim();
      const todayStars = $(el).find(".float-sm-right").text().trim();
      repos.push({ rank: i + 1, name, url, description, language, stars, forks, todayStars });
    });

    return NextResponse.json({ repos });
  } catch {
    return NextResponse.json({ error: "Failed to fetch GitHub trending" }, { status: 500 });
  }
}
