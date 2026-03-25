"use client";

import useSWR from "swr";
import SectionCard from "./SectionCard";
import { MastodonTag } from "@/app/api/mastodon/route";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function MastodonSection() {
  const { data, error, isLoading } = useSWR<{ tags: MastodonTag[] }>(
    "/api/mastodon",
    fetcher,
    { refreshInterval: 300000 }
  );

  return (
    <SectionCard title="Mastodon Trends" icon="🐘" loading={isLoading} error={error?.message}>
      <ul className="space-y-1">
        {data?.tags.map((tag, i) => {
          const uses = tag.history?.[0]?.uses ?? "0";
          const accounts = tag.history?.[0]?.accounts ?? "0";
          return (
            <li key={tag.name}>
              <a
                href={tag.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition-colors group"
              >
                <span className="text-gray-600 text-xs w-4 shrink-0">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-purple-400 text-xs font-medium group-hover:text-purple-300">
                    #{tag.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-gray-500 text-xs">{parseInt(uses).toLocaleString()} posts</span>
                    <span className="text-gray-500 text-xs">{parseInt(accounts).toLocaleString()} people</span>
                  </div>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </SectionCard>
  );
}
