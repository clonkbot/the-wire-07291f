export type NewsSource = 'cnn' | 'fox' | 'newsmax';

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: NewsSource;
  category: string;
  timestamp: Date;
  imageUrl: string;
  isBreaking?: boolean;
}
