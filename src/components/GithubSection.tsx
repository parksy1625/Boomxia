"use client";

import useSWR from "swr";
import SectionCard from "./SectionCard";
import type { GithubRepo } from "@/types";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const LANGS = ["", "typescript", "python", "rust", "go", "java"];

export default function GithubSection() {
  const [lang, setLang] = useState("");
  const { data, error, isLoading } = useSWR<{ repos: GithubRepo[] }>(
    `/api/github?lang=${lang}&since=daily`,
    fetcher,
    { refreshInterval: 300000 }
  );

  return (
    <SectionCard title="GitHub Trending" icon="🐙" loading={isLoading} error={error?.message}>
      <div className="flex gap-1 flex-wrap mb-2 px-1">
        {LANGS.map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`text-xs px-2 py-0.5 rounded-full border transition-colors ${
              lang === l
                ? "bg-blue-600 border-blue-500 text-white"
                : "border-gray-700 text-gray-400 hover:border-gray-500"
            }`}
          >
            {l || "All"}
          </button>
        ))}
      </div>
      <ul className="space-y-1">
        {data?.repos.map((repo) => (
          <li key={repo.rank}>
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-800 transition-colors group"
            >
              <span className="text-gray-600 text-xs w-4 shrink-0 mt-0.5">{repo.rank}</span>
              <div className="flex-1 min-w-0">
                <p className="text-blue-400 text-xs font-medium group-hover:text-blue-300 truncate">
                  {repo.name}
                </p>
                {repo.description && (
                  <p className="text-gray-500 text-xs truncate mt-0.5">{repo.description}</p>
                )}
                <div className="flex items-center gap-2 mt-1">
                  {repo.language && (
                    <span className="text-gray-500 text-xs">{repo.language}</span>
                  )}
                  <span className="text-yellow-500 text-xs">⭐ {repo.stars}</span>
                  {repo.todayStars && (
                    <span className="text-green-500 text-xs">{repo.todayStars}</span>
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

import { useState } from "react";
