'use client';

import { motion } from 'framer-motion';
import { GithubStats } from '@/lib/github';
import { Icon } from '@iconify/react';

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Dart: '#00B4AB',
  PHP: '#4F5D95',
  Blade: '#f7523f',
  'C++': '#f34b7d',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
};

type Props = {
  stats: GithubStats;
};

const STAT_CARDS = [
  {
    icon: 'mdi:source-repository',
    label: 'Repositories',
    gradient: 'from-purple-400 to-violet-400',
    iconClass: 'text-purple-400',
    delay: 0,
    key: 'totalRepos' as const,
  },
  {
    icon: 'mdi:star-four-points',
    label: 'Total Stars',
    gradient: 'from-yellow-400 to-orange-400',
    iconClass: 'text-yellow-400',
    delay: 0.1,
    key: 'totalStars' as const,
  },
  {
    icon: 'mdi:source-fork',
    label: 'Total Forks',
    gradient: 'from-cyan-400 to-blue-400',
    iconClass: 'text-cyan-400',
    delay: 0.2,
    key: 'totalForks' as const,
  },
];

export default function GithubProfileStats({ stats }: Props) {
  if (!stats) return null;

  // Compute language percentages for bar
  const totalLangRepos = stats.topLanguages.reduce((s, l) => s + l.count, 0);

  const statValues: Record<string, number> = {
    totalRepos: stats.totalRepos,
    totalStars: stats.totalStars,
    totalForks: stats.totalForks,
  };

  return (
    <section className="relative bg-black text-white py-20 px-8 lg:px-24 flex flex-col items-center overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-600/8 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl w-full relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-purple-400 mb-3">
            GitHub Profile
          </p>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white">
              Developer <span className="font-bold">Statistics</span>
            </h2>
            <a
              href="https://github.com/faiz-jihad"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm font-mono text-white/40 hover:text-white transition-colors"
            >
              <Icon icon="mdi:github" width={16} height={16} />
              faiz-jihad
            </a>
          </div>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {STAT_CARDS.map((card) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                type: 'spring',
                stiffness: 100,
                damping: 20,
                delay: card.delay 
              }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="relative group bg-white/[0.03] border border-white/8 backdrop-blur-xl rounded-2xl p-7 flex items-center gap-5 overflow-hidden cursor-default"
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Icon */}
              <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-black/30 border border-white/8 flex items-center justify-center ${card.iconClass}`}>
                <Icon icon={card.icon} width={22} height={22} />
              </div>

              {/* Value */}
              <div>
                <div className={`text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${card.gradient}`}>
                  {statValues[card.key].toLocaleString()}
                </div>
                <div className="text-xs font-mono text-white/40 uppercase tracking-widest mt-0.5">
                  {card.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Language bar */}
        {stats.topLanguages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/[0.02] border border-white/8 backdrop-blur-xl rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <Icon icon="mdi:code-tags" width={16} height={16} className="text-cyan-400" />
              <span className="text-xs font-mono uppercase tracking-widest text-white/40">Top Languages</span>
            </div>

            {/* Segmented bar */}
            <div className="flex rounded-full overflow-hidden h-2.5 mb-5 gap-px">
              {stats.topLanguages.map((lang) => {
                const pct = totalLangRepos > 0 ? (lang.count / totalLangRepos) * 100 : 0;
                const col = LANGUAGE_COLORS[lang.language] ?? '#888';
                return (
                  <motion.div
                    key={lang.language}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    style={{ backgroundColor: col, boxShadow: `0 0 8px ${col}60` }}
                  />
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4">
              {stats.topLanguages.map((lang) => {
                const col = LANGUAGE_COLORS[lang.language] ?? '#888';
                return (
                  <div key={lang.language} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: col, boxShadow: `0 0 5px ${col}90` }} />
                    <span className="text-xs font-mono text-white/60">{lang.language}</span>
                    <span className="text-xs font-mono text-white/25">{lang.count} repos</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
