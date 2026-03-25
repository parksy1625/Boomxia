import GithubSection from "@/components/GithubSection";
import HackerNewsSection from "@/components/HackerNewsSection";
import DevToSection from "@/components/DevToSection";
import LobstersSection from "@/components/LobstersSection";
import RedditSection from "@/components/RedditSection";
import MastodonSection from "@/components/MastodonSection";
import BlueskySection from "@/components/BlueskySection";
import SteamSection from "@/components/SteamSection";
import NewsSection from "@/components/NewsSection";
import RefreshTimer from "@/components/RefreshTimer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="sticky top-0 z-10 bg-gray-950/90 backdrop-blur border-b border-gray-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">💥</span>
          <h1 className="text-xl font-bold tracking-tight">Boomxia</h1>
          <span className="text-gray-500 text-sm hidden sm:block">실시간 트렌드 대시보드</span>
        </div>
        <RefreshTimer />
      </header>

      <main className="p-4 max-w-[1920px] mx-auto">
        <div className="mb-3">
          <SectionLabel icon="💻" label="개발 커뮤니티" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <GithubSection />
          <HackerNewsSection />
          <DevToSection />
          <LobstersSection />
        </div>

        <div className="mb-3">
          <SectionLabel icon="🌐" label="소셜 미디어" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          <RedditSection />
          <MastodonSection />
          <BlueskySection />
        </div>

        <div className="mb-3">
          <SectionLabel icon="🎮" label="게임 & 뉴스" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <SteamSection />
          <NewsSection />
        </div>
      </main>
    </div>
  );
}

function SectionLabel({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span>{icon}</span>
      <span className="text-gray-400 text-sm font-medium">{label}</span>
      <div className="flex-1 h-px bg-gray-800" />
    </div>
  );
}
