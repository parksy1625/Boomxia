"use client";

import useSWR from "swr";
import SectionCard from "./SectionCard";
import { DevToArticle } from "@/app/api/devto/route";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function DevToSection() {
  const { data, error, isLoading } = useSWR<{ articles: DevToArticle[] }>(
    "/api/devto",
    fetcher,
    { refreshInterval: 300000 }
  );

  return (
    <SectionCard title="Dev.to" icon="👩‍💻" loading={isLoading} error={error?.message}>
      <ul className="space-y-1">
        {data?.articles.map((a, i) => (
          <li key={a.id}>
            <a
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-800 transition-colors group"
            >
              <span className="text-gray-600 text-xs w-4 shrink-0 mt-0.5">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="text-gray-200 text-xs group-hover:text-white truncate">{a.title}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-pink-400 text-xs">❤️ {a.positive_reactions_count}</span>
                  <span className="text-gray-500 text-xs">💬 {a.comments_count}</span>
                  {a.tag_list.slice(0, 2).map((t) => (
                    <span key={t} className="text-blue-500 text-xs">#{t}</span>
                  ))}
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </SectionCard>
  );
}
