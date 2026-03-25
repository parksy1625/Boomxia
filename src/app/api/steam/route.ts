import { NextResponse } from "next/server";

export interface SteamGame {
  id: number;
  name: string;
  header_image: string;
  url: string;
  discount_percent: number;
  final_price: number;
  currency: string;
}

export async function GET() {
  try {
    const data = await fetch(
      "https://store.steampowered.com/api/featuredcategories/?cc=us&l=en",
      { next: { revalidate: 600 } }
    ).then((r) => r.json());

    const topSellers = data.top_sellers?.items ?? [];
    const games: SteamGame[] = topSellers.slice(0, 20).map((g: { id: number; name: string; header_image: string; discount_percent: number; final_price: number; currency: string }) => ({
      id: g.id,
      name: g.name,
      header_image: g.header_image,
      url: `https://store.steampowered.com/app/${g.id}`,
      discount_percent: g.discount_percent,
      final_price: g.final_price,
      currency: g.currency,
    }));

    return NextResponse.json({ games });
  } catch {
    return NextResponse.json({ error: "Failed to fetch Steam" }, { status: 500 });
  }
}
