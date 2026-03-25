import { NextResponse } from "next/server";

export interface HNStory {
  id: number;
  title: string;
  url: string;
  score: number;
  by: string;
  descendants: number;
  time: number;
}

export async function GET() {
  try {
    const topIds = await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json",
      { next: { revalidate: 300 } }
    ).then((r) => r.json());

    const top20 = topIds.slice(0, 20);
    const stories = await Promise.all(
      top20.map((id: number) =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`, {
          next: { revalidate: 300 },
        }).then((r) => r.json())
      )
    );

    return NextResponse.json({ stories });
  } catch {
    return NextResponse.json({ error: "Failed to fetch HackerNews" }, { status: 500 });
  }
}
