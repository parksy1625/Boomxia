import { NextResponse } from "next/server";

export interface DevToArticle {
  id: number;
  title: string;
  url: string;
  cover_image: string | null;
  tag_list: string[];
  positive_reactions_count: number;
  comments_count: number;
  published_at: string;
  user: { name: string; profile_image: string };
}

export async function GET() {
  try {
    const articles: DevToArticle[] = await fetch(
      "https://dev.to/api/articles?top=1&per_page=20",
      { next: { revalidate: 300 } }
    ).then((r) => r.json());

    return NextResponse.json({ articles });
  } catch {
    return NextResponse.json({ error: "Failed to fetch Dev.to" }, { status: 500 });
  }
}
