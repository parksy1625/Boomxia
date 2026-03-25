"use client";

import { ReactNode } from "react";

interface Props {
  title: string;
  icon: string;
  children: ReactNode;
  loading?: boolean;
  error?: string;
}

export default function SectionCard({ title, icon, children, loading, error }: Props) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden flex flex-col">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800 bg-gray-950">
        <span className="text-lg">{icon}</span>
        <h2 className="font-semibold text-white text-sm">{title}</h2>
      </div>
      <div className="flex-1 overflow-y-auto max-h-96 p-2">
        {loading && (
          <div className="flex items-center justify-center h-32">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        {error && (
          <div className="text-red-400 text-xs text-center p-4">{error}</div>
        )}
        {!loading && !error && children}
      </div>
    </div>
  );
}
