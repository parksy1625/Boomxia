"use client";

import { useState } from "react";
import useSWR from "swr";
import SectionCard from "./SectionCard";
import { RedditPost } from "@/app/api/reddit/route";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const SUBS = ["popular", "technology", "programming", "worldnews", "gaming", "science"];

export default function RedditSection() {
  const [sub, setSub] = useState("popular");
  const { data, error, isLoading } = useSWR<{ posts: RedditPost[] }>(
    `/api/reddit?sub=${sub}`,
    fetcher,
    { refreshInterval: 300000 }
  );

  return (
    <SectionCard title="Reddit" icon="🤖" loading={isLoading} error={error?.message}>
      <div className="flex gap-1 flex-wrap mb-2 px-1">
        {SUBS.map((s) => (
          <button
            key={s}
            onClick={() => setSub(s)}
            className={`text-xs px-2 py-0.5 rounded-full border transition-colors ${
              sub === s
                ? "bg-orange-600 border-orange-500 text-white"
                : "border-gray-700 text-gray-400 hover:border-gray-500"
            }`}
          >
            r/{s}
          </button>
        ))}
      </div>
      <ul className="space-y-1">
        {data?.posts.map((p, i) => (
          <li key={p.id}>
            <a
              href={`https://reddit.com${p.permalink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-800 transition-colors group"
            >
              <span className="text-gray-600 text-xs w-4 shrink-0 mt-0.5">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="text-gray-200 text-xs group-hover:text-white truncate">{p.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-orange-400 text-xs">▲ {p.score.toLocaleString()}</span>
                  <span className="text-gray-500 text-xs">💬 {p.num_comments}</span>
                  <span className="text-gray-600 text-xs">r/{p.subreddit}</span>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
