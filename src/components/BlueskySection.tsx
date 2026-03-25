"use client";

import useSWR from "swr";
import SectionCard from "./SectionCard";
import type { BlueSkyTopic } from "@/types";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function BlueskySection() {
  const { data, error, isLoading } = useSWR<{ topics: BlueSkyTopic[] }>(
    "/api/bluesky",
    fetcher,
    { refreshInterval: 300000 }
  );

  return (
    <SectionCard title="Bluesky Trends" icon="🦋" loading={isLoading} error={error?.message}>
      <ul className="space-y-1">
        {data?.topics.map((topic, i) => (
          <li key={topic.topic}>
            <a
              href={topic.link || `https://bsky.app/search?q=${encodeURIComponent(topic.topic)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 transition-colors group"
            >
              <span className="text-gray-600 text-xs w-4 shrink-0">{i + 1}</span>
              <p className="text-sky-400 text-xs font-medium group-hover:text-sky-300 truncate">
                {topic.displayName || topic.topic}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
