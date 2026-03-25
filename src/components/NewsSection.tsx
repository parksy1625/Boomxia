"use client";

import useSWR from "swr";
import SectionCard from "./SectionCard";
import { NewsItem } from "@/app/api/news/route";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function NewsSection() {
  const { data, error, isLoading } = useSWR<{ items: NewsItem[] }>(
    "/api/news",
    fetcher,
    { refreshInterval: 300000 }
  );

  return (
    <SectionCard title="World News" icon="🌍" loading={isLoading} error={error?.message}>
      <ul className="space-y-1">
        {data?.items.map((item, i) => (
          <li key={`${item.source}-${i}`}>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-800 transition-colors group"
            >
              <span className="text-lg shrink-0 leading-none mt-0.5">{item.sourceIcon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-gray-200 text-xs group-hover:text-white truncate">{item.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-gray-500 text-xs">{item.source}</span>
                  {item.pubDate && (
                    <span className="text-gray-600 text-xs">{timeAgo(item.pubDate)}</span>
                  )}
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
