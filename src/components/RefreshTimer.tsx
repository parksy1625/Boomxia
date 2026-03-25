"use client";

import { useEffect, useState } from "react";

export default function RefreshTimer() {
  const [secondsLeft, setSecondsLeft] = useState(300);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) return 300;
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  return (
    <div className="flex items-center gap-2 text-gray-500 text-xs">
      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
      <span>다음 갱신: {mins}:{secs.toString().padStart(2, "0")}</span>
    </div>
  );
}
