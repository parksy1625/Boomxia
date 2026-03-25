import { NextResponse } from "next/server";

export interface RedditPost {
  id: string;
  title: string;
  url: string;
  permalink: string;
  subreddit: string;
  score: number;
  num_comments: number;
  author: string;
  created_utc: number;
  thumbnail: string;
  is_self: boolean;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sub = searchParams.get("sub") || "popular";

  try {
    const data = await fetch(
      `https://www.reddit.com/r/${sub}/hot.json?limit=20`,
      {
        headers: { "User-Agent": "Boomxia-Dashboard/1.0" },
        next: { revalidate: 300 },
      }
    ).then((r) => r.json());

    const posts: RedditPost[] = data.data.children.map((c: { data: RedditPost }) => c.data);
    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json({ error: "Failed to fetch Reddit" }, { status: 500 });
  }
}
