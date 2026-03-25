"use client";

import useSWR from "swr";
import SectionCard from "./SectionCard";
import type { SteamGame } from "@/types";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function SteamSection() {
  const { data, error, isLoading } = useSWR<{ games: SteamGame[] }>(
    "/api/steam",
    fetcher,
    { refreshInterval: 600000 }
  );

  return (
    <SectionCard title="Steam Top Sellers" icon="🎮" loading={isLoading} error={error?.message}>
      <ul className="space-y-1">
        {data?.games.map((g, i) => (
          <li key={g.id}>
            <a
              href={g.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition-colors group"
            >
              <span className="text-gray-600 text-xs w-4 shrink-0">{i + 1}</span>
              {g.header_image && (
                <img
                  src={g.header_image}
                  alt={g.name}
                  className="w-12 h-7 object-cover rounded shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-gray-200 text-xs group-hover:text-white truncate">{g.name}</p>
                {g.discount_percent > 0 && (
                  <span className="text-green-400 text-xs">-{g.discount_percent}%</span>
                )}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
