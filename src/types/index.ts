export interface GithubRepo {
  rank: number;
  name: string;
  url: string;
  description: string;
  language: string;
  stars: string;
  forks: string;
  todayStars: string;
}

export interface HNStory {
  id: number;
  title: string;
  url: string;
  score: number;
  by: string;
  descendants: number;
  time: number;
}

export interface DevToArticle {
  id: number;
  title: string;
  url: string;
  cover_image: string | null;
  tag_list: string[];
  positive_reactions_count: number;
  comments_count: number;
  published_at: string;
  user: { name: string; profile_image: string };
}

export interface LobstersStory {
  short_id: string;
  title: string;
  url: string;
  score: number;
  comment_count: number;
  submitted_by: string;
  created_at: string;
  tags: string[];
}

export interface RedditPost {
  id: string;
  title: string;
  url: string;
  permalink: string;
  subreddit: string;
  score: number;
  num_comments: number;
  author: string;
  created_utc: number;
  thumbnail: string;
  is_self: boolean;
}

export interface MastodonTag {
  name: string;
  url: string;
  history: { day: string; accounts: string; uses: string }[];
}

export interface BlueSkyTopic {
  topic: string;
  displayName: string;
  link?: string;
}

export interface SteamGame {
  id: number;
  name: string;
  header_image: string;
  url: string;
  discount_percent: number;
  final_price: number;
  currency: string;
}

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
  sourceIcon: string;
}
