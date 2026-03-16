'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { GithubRepository } from '@/lib/github';
import { Icon } from '@iconify/react';

// ── Language colour map ────────────────────────────────────────────────────
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
  Vue: '#41b883',
};

// ── Single card ────────────────────────────────────────────────────────────
function RepoCard({ repo }: { repo: GithubRepository }) {
  const col = repo.language ? (LANGUAGE_COLORS[repo.language] ?? '#888') : null;

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="group flex-shrink-0 w-72 flex flex-col gap-3 rounded-xl p-5 border border-white/8 bg-white/[0.03] backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]"
      style={{ minHeight: '160px' }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-1.5 min-w-0">
          <Icon icon="mdi:source-repository" width={14} height={14} className="text-purple-400/50 flex-shrink-0" />
          <span className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors truncate">
            {repo.name}
          </span>
        </div>
        <Icon icon="mdi:arrow-top-right" width={12} height={12} className="text-white/20 group-hover:text-white/60 flex-shrink-0 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>

      {/* Description */}
      <p className="text-xs text-white/45 font-light leading-relaxed flex-grow line-clamp-2">
        {repo.description || <span className="italic text-white/20">No description.</span>}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto">
        {col ? (
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: col, boxShadow: `0 0 4px ${col}90` }} />
            <span className="text-[10px] font-mono text-white/50">{repo.language}</span>
          </div>
        ) : <span />}

        <div className="flex gap-2.5 text-white/30 text-[10px] font-mono">
          <span className="flex items-center gap-0.5">
            <Icon icon="mdi:star-outline" width={11} height={11} />
            {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-0.5">
            <Icon icon="mdi:source-fork" width={11} height={11} />
            {repo.forks_count}
          </span>
        </div>
      </div>
    </a>
  );
}

// ── Marquee row ────────────────────────────────────────────────────────────
function MarqueeRow({ repos, direction = 1, speed = 40 }: { repos: GithubRepository[]; direction?: 1 | -1; speed?: number }) {
  // Duplicate for seamless loop
  const doubled = [...repos, ...repos];
  const totalCards = repos.length;
  // Each card is 288px (w-72) + 16px gap = 304px
  const totalWidth = totalCards * 304;
  const duration = totalWidth / speed;

  return (
    <div className="relative flex overflow-hidden">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-4 py-2"
        animate={{ x: direction === 1 ? [0, -totalWidth] : [-totalWidth, 0] }}
        transition={{
          duration,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop',
        }}
      >
        {doubled.map((repo, i) => (
          <RepoCard key={`${repo.id}-${i}`} repo={repo} />
        ))}
      </motion.div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function GithubProjects({ repos }: { repos: GithubRepository[] }) {
  if (!repos || repos.length === 0) return null;

  // Split into two rows; alternate direction for visual effect
  const mid = Math.ceil(repos.length / 2);
  const row1 = repos.slice(0, mid);
  const row2 = repos.slice(mid);

  return (
    <section className="relative bg-black text-white py-24 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-purple-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-cyan-600/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="px-8 lg:px-24 mb-10 flex items-end justify-between flex-wrap gap-4"
        >
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-purple-400 mb-3">Open Source</p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight">
              All <span className="font-bold">Repositories</span>
              <span className="ml-3 text-lg font-mono text-white/25">({repos.length})</span>
            </h2>
          </div>
          <a
            href="https://github.com/faiz-jihad?tab=repositories"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-1.5 text-xs font-mono text-white/35 hover:text-white transition-colors"
          >
            <Icon icon="mdi:github" width={14} height={14} />
            View all on GitHub
            <Icon icon="mdi:arrow-right" width={12} height={12} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Carousel rows */}
        <div className="flex flex-col gap-4">
          <MarqueeRow repos={row1} direction={1} speed={35} />
          {row2.length > 0 && <MarqueeRow repos={row2} direction={-1} speed={28} />}
        </div>
      </div>
    </section>
  );
}
