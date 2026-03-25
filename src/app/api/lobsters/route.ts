import { NextResponse } from "next/server";

export interface LobstersStory {
  short_id: string;
  title: string;
  url: string;
  score: number;
  comment_count: number;
  submitted_by: string;
  created_at: string;
  tags: string[];
}

export async function GET() {
  try {
    const stories: LobstersStory[] = await fetch(
      "https://lobste.rs/hottest.json",
      { next: { revalidate: 300 } }
    ).then((r) => r.json());

    return NextResponse.json({ stories: stories.slice(0, 20) });
  } catch {
    return NextResponse.json({ error: "Failed to fetch Lobste.rs" }, { status: 500 });
  }
}
