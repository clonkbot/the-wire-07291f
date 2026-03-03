import { NewsArticle, NewsSource } from '../types';

const cnnArticles = [
  {
    title: "Senate Reaches Bipartisan Deal on Infrastructure Package",
    summary: "A landmark agreement could reshape America's roads, bridges, and broadband access with $1.2 trillion in funding over the next decade.",
    category: "POLITICS",
    imageUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&auto=format"
  },
  {
    title: "Climate Report: Record Temperatures Expected Through 2030",
    summary: "UN scientists warn of accelerating climate change impacts as global leaders prepare for emergency summit next month.",
    category: "CLIMATE",
    imageUrl: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&auto=format"
  },
  {
    title: "Tech Giants Face New Regulatory Pressure in Europe",
    summary: "EU commissioners announce sweeping new rules targeting AI development and data privacy practices.",
    category: "TECH",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format"
  },
  {
    title: "Healthcare Costs Rise as Insurance Negotiations Stall",
    summary: "Americans facing higher premiums as major insurers and hospital networks fail to reach agreements.",
    category: "HEALTH",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format"
  }
];

const foxArticles = [
  {
    title: "Border Security Bill Gains Momentum in House",
    summary: "Republican lawmakers push for enhanced border wall funding and increased ICE resources in comprehensive security measure.",
    category: "IMMIGRATION",
    imageUrl: "https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?w=800&auto=format"
  },
  {
    title: "Small Business Optimism Surges Amid Tax Cut Proposals",
    summary: "National Federation survey shows record confidence levels as Congress debates corporate tax relief.",
    category: "ECONOMY",
    imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=800&auto=format"
  },
  {
    title: "Second Amendment Rights Advocates Rally at State Capitals",
    summary: "Thousands gather across the nation to protest proposed firearms legislation in key swing states.",
    category: "POLITICS",
    imageUrl: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&auto=format"
  },
  {
    title: "Energy Independence: Domestic Production Hits New Highs",
    summary: "Oil and gas output reaches historic levels as administration scales back regulations on drilling permits.",
    category: "ENERGY",
    imageUrl: "https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800&auto=format"
  }
];

const newsmaxArticles = [
  {
    title: "Exclusive: Pentagon Whistleblower Reveals Budget Concerns",
    summary: "Defense insider speaks out on military spending priorities and readiness gaps in critical Pacific theater.",
    category: "DEFENSE",
    imageUrl: "https://images.unsplash.com/photo-1579912437766-7896df6d3cd3?w=800&auto=format"
  },
  {
    title: "Inflation Alert: Consumer Prices Continue Upward Trend",
    summary: "Latest economic data shows persistent price increases affecting household budgets nationwide.",
    category: "ECONOMY",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format"
  },
  {
    title: "Conservative Candidates Make Gains in State Elections",
    summary: "Early primary results indicate strong momentum for traditional values candidates across the heartland.",
    category: "ELECTIONS",
    imageUrl: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=800&auto=format"
  },
  {
    title: "Media Bias Study Reveals Stark Differences in Coverage",
    summary: "New research from independent think tank documents disparities in how networks report political news.",
    category: "MEDIA",
    imageUrl: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&auto=format"
  }
];

function createArticle(
  data: { title: string; summary: string; category: string; imageUrl: string },
  source: NewsSource,
  index: number,
  isBreaking: boolean = false
): NewsArticle {
  const hoursAgo = Math.floor(Math.random() * 12) + 1;
  return {
    id: `${source}-${index}-${Date.now()}`,
    title: data.title,
    summary: data.summary,
    source,
    category: data.category,
    timestamp: new Date(Date.now() - hoursAgo * 60 * 60 * 1000),
    imageUrl: data.imageUrl,
    isBreaking
  };
}

export function generateMockNews(): NewsArticle[] {
  const articles: NewsArticle[] = [];

  // Add CNN articles
  cnnArticles.forEach((article, index) => {
    articles.push(createArticle(article, 'cnn', index, index === 0));
  });

  // Add Fox articles
  foxArticles.forEach((article, index) => {
    articles.push(createArticle(article, 'fox', index, index === 0));
  });

  // Add Newsmax articles
  newsmaxArticles.forEach((article, index) => {
    articles.push(createArticle(article, 'newsmax', index));
  });

  // Shuffle and return
  return articles.sort(() => Math.random() - 0.5);
}

export const breakingHeadlines = [
  "BREAKING: Major economic report expected within the hour",
  "DEVELOPING: International summit reaches critical phase",
  "LIVE: Congressional hearing continues on Capitol Hill",
  "UPDATE: Severe weather alerts issued for multiple states",
  "WATCH: Press briefing scheduled for 3 PM ET"
];
