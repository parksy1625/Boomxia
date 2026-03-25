import { NextResponse } from "next/server";

export interface BlueSkyTopic {
  topic: string;
  displayName: string;
  link?: string;
}

export async function GET() {
  try {
    const data = await fetch(
      "https://public.api.bsky.app/xrpc/app.bsky.unspecced.getTrendingTopics?limit=20",
      { next: { revalidate: 300 } }
    ).then((r) => r.json());

    return NextResponse.json({ topics: data.topics ?? [] });
  } catch {
    return NextResponse.json({ error: "Failed to fetch Bluesky" }, { status: 500 });
  }
}
