"use client";

import useSWR from "swr";
import SectionCard from "./SectionCard";
import { HNStory } from "@/app/api/hackernews/route";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function HackerNewsSection() {
  const { data, error, isLoading } = useSWR<{ stories: HNStory[] }>(
    "/api/hackernews",
    fetcher,
    { refreshInterval: 300000 }
  );

  return (
    <SectionCard title="Hacker News" icon="🟠" loading={isLoading} error={error?.message}>
      <ul className="space-y-1">
        {data?.stories.map((s, i) => (
          <li key={s.id}>
            <a
              href={s.url || `https://news.ycombinator.com/item?id=${s.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-800 transition-colors group"
            >
              <span className="text-gray-600 text-xs w-4 shrink-0 mt-0.5">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="text-gray-200 text-xs group-hover:text-white truncate">{s.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-orange-400 text-xs">▲ {s.score}</span>
                  <span className="text-gray-500 text-xs">💬 {s.descendants ?? 0}</span>
                  <span className="text-gray-600 text-xs">by {s.by}</span>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
