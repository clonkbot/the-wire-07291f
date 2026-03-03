import { motion } from 'framer-motion';
import { NewsArticle, NewsSource } from '../types';

interface NewsCardProps {
  article: NewsArticle;
  featured?: boolean;
}

const sourceConfig: Record<NewsSource, { name: string; color: string; bg: string }> = {
  cnn: { name: 'CNN', color: '#cc0000', bg: 'bg-[#cc0000]' },
  fox: { name: 'FOX NEWS', color: '#003366', bg: 'bg-[#003366]' },
  newsmax: { name: 'NEWSMAX', color: '#d4a012', bg: 'bg-[#d4a012]' }
};

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor(diffMs / (1000 * 60));

  if (diffHours > 0) {
    return `${diffHours}h ago`;
  }
  return `${diffMins}m ago`;
}

export function NewsCard({ article, featured = false }: NewsCardProps) {
  const source = sourceConfig[article.source];

  if (featured) {
    return (
      <motion.article
        whileHover={{ scale: 1.01 }}
        className="relative group cursor-pointer overflow-hidden"
      >
        <div className="relative h-64 md:h-96 lg:h-[500px] overflow-hidden">
          <img
            src={article.imageUrl}
            alt=""
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 lg:p-12">
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 md:mb-4">
              {article.isBreaking && (
                <span className="px-2 md:px-3 py-1 bg-red-600 text-white font-mono text-[10px] md:text-xs font-bold tracking-wider animate-pulse">
                  BREAKING
                </span>
              )}
              <span
                className="px-2 md:px-3 py-1 text-white font-mono text-[10px] md:text-xs font-bold tracking-wider"
                style={{ backgroundColor: source.color }}
              >
                {source.name}
              </span>
              <span className="px-2 md:px-3 py-1 bg-white/10 text-white/70 font-mono text-[10px] md:text-xs tracking-wider">
                {article.category}
              </span>
            </div>

            <h2 className="font-playfair text-xl md:text-3xl lg:text-5xl font-black leading-tight mb-2 md:mb-4 text-white">
              {article.title}
            </h2>

            <p className="font-serif text-sm md:text-lg text-white/80 max-w-3xl line-clamp-2 md:line-clamp-none">
              {article.summary}
            </p>

            <div className="flex items-center gap-4 mt-3 md:mt-6 font-mono text-[10px] md:text-xs text-white/50">
              <span>{formatTimeAgo(article.timestamp)}</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>Read full story →</span>
            </div>
          </div>
        </div>

        {/* Decorative border */}
        <div
          className="absolute bottom-0 left-0 w-full h-1 transition-all duration-300 group-hover:h-2"
          style={{ backgroundColor: source.color }}
        />
      </motion.article>
    );
  }

  return (
    <motion.article
      whileHover={{ y: -4 }}
      className="relative group cursor-pointer bg-white/5 border border-white/10 overflow-hidden h-full flex flex-col"
    >
      {/* Image */}
      <div className="relative h-40 md:h-48 overflow-hidden flex-shrink-0">
        <img
          src={article.imageUrl}
          alt=""
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Source badge */}
        <div
          className="absolute top-3 left-3 px-2 md:px-3 py-1 text-white font-mono text-[10px] md:text-xs font-bold tracking-wider"
          style={{ backgroundColor: source.color }}
        >
          {source.name}
        </div>

        {article.isBreaking && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-red-600 text-white font-mono text-[10px] font-bold tracking-wider animate-pulse">
            LIVE
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 md:p-5 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2 md:mb-3">
          <span className="font-mono text-[10px] md:text-xs text-white/50 tracking-wider">{article.category}</span>
          <span className="w-1 h-1 rounded-full bg-white/30" />
          <span className="font-mono text-[10px] md:text-xs text-white/40">{formatTimeAgo(article.timestamp)}</span>
        </div>

        <h3 className="font-playfair text-base md:text-lg font-bold leading-tight mb-2 md:mb-3 text-white group-hover:text-yellow-400 transition-colors line-clamp-3">
          {article.title}
        </h3>

        <p className="font-serif text-xs md:text-sm text-white/60 line-clamp-2 flex-grow">
          {article.summary}
        </p>

        <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-white/10">
          <span className="font-mono text-[10px] md:text-xs text-white/40 group-hover:text-white/60 transition-colors">
            Read more →
          </span>
        </div>
      </div>

      {/* Hover accent line */}
      <div
        className="absolute bottom-0 left-0 w-0 h-1 transition-all duration-300 group-hover:w-full"
        style={{ backgroundColor: source.color }}
      />
    </motion.article>
  );
}
