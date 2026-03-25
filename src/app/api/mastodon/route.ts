import { NextResponse } from "next/server";

export interface MastodonTag {
  name: string;
  url: string;
  history: { day: string; accounts: string; uses: string }[];
}

export async function GET() {
  try {
    const tags: MastodonTag[] = await fetch(
      "https://mastodon.social/api/v1/trends/tags?limit=20",
      { next: { revalidate: 300 } }
    ).then((r) => r.json());

    return NextResponse.json({ tags });
  } catch {
    return NextResponse.json({ error: "Failed to fetch Mastodon" }, { status: 500 });
  }
}
