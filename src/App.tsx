import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NewsCard } from './components/NewsCard';
import { SourceTab } from './components/SourceTab';
import { BreakingTicker } from './components/BreakingTicker';
import { NewsArticle, NewsSource } from './types';
import { generateMockNews } from './data/mockNews';

function App() {
  const [activeSource, setActiveSource] = useState<NewsSource | 'all'>('all');
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const loadNews = useCallback(() => {
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setArticles(generateMockNews());
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    loadNews();
    // Auto-refresh every 60 seconds
    const interval = setInterval(loadNews, 60000);
    return () => clearInterval(interval);
  }, [loadNews]);

  const filteredArticles = activeSource === 'all'
    ? articles
    : articles.filter(a => a.source === activeSource);

  const sourceColors: Record<NewsSource, string> = {
    cnn: '#cc0000',
    fox: '#003366',
    newsmax: '#d4a012'
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-x-hidden">
      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Breaking news ticker */}
      <BreakingTicker />

      {/* Header */}
      <header className="relative border-b-4 border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <div>
              <h1 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none">
                THE <span className="text-yellow-400">WIRE</span>
              </h1>
              <p className="font-mono text-xs md:text-sm text-white/50 mt-2 tracking-widest uppercase">
                Multi-Source News Aggregator
              </p>
            </div>
            <div className="font-mono text-xs text-white/40 text-left md:text-right">
              <div>Last updated: {lastUpdated.toLocaleTimeString()}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>Live • Auto-refresh 60s</span>
              </div>
            </div>
          </motion.div>

          {/* Source Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-2 md:gap-3 mt-6 md:mt-8"
          >
            <SourceTab
              label="ALL SOURCES"
              isActive={activeSource === 'all'}
              onClick={() => setActiveSource('all')}
              color="#ffffff"
            />
            <SourceTab
              label="CNN"
              isActive={activeSource === 'cnn'}
              onClick={() => setActiveSource('cnn')}
              color={sourceColors.cnn}
            />
            <SourceTab
              label="FOX NEWS"
              isActive={activeSource === 'fox'}
              onClick={() => setActiveSource('fox')}
              color={sourceColors.fox}
            />
            <SourceTab
              label="NEWSMAX"
              isActive={activeSource === 'newsmax'}
              onClick={() => setActiveSource('newsmax')}
              color={sourceColors.newsmax}
            />
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-20"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-white/20 border-t-yellow-400 rounded-full animate-spin" />
                <span className="font-mono text-sm text-white/50">FETCHING LATEST...</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Featured Article */}
              {filteredArticles[0] && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8 md:mb-12"
                >
                  <NewsCard article={filteredArticles[0]} featured />
                </motion.div>
              )}

              {/* Article Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredArticles.slice(1).map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <NewsCard article={article} />
                  </motion.div>
                ))}
              </div>

              {filteredArticles.length === 0 && (
                <div className="text-center py-20">
                  <p className="font-mono text-white/50">No articles found for this source.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Refresh Button */}
      <motion.button
        onClick={loadNews}
        disabled={isLoading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-20 md:bottom-8 right-4 md:right-8 w-14 h-14 bg-yellow-400 text-black rounded-full flex items-center justify-center shadow-2xl shadow-yellow-400/20 disabled:opacity-50 z-40"
      >
        <svg className={`w-6 h-6 ${isLoading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </motion.button>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-12 md:mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="font-mono text-xs text-white/30">
              <span className="text-yellow-400/60">THE WIRE</span> — Real-time news from multiple sources
            </div>
            <div className="font-mono text-[10px] md:text-xs text-white/25">
              Requested by @web-user · Built by @clonkbot
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
