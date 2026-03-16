'use client';

import { motion } from 'framer-motion';
import { PinnedRepository } from '@/lib/github';
import { Icon } from '@iconify/react';

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Dart: '#00B4AB',
  PHP: '#4F5D95',
  'C++': '#f34b7d',
  Ruby: '#701516',
  Go: '#00ADD8',
  Rust: '#dea584',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  HTML: '#e34c26',
  CSS: '#563d7c',
};

function LanguageDot({ lang }: { lang: PinnedRepository['primaryLanguage'] }) {
  if (!lang) return null;
  const color = lang.color ?? LANGUAGE_COLORS[lang.name] ?? '#888';
  return (
    <div className="flex items-center gap-1.5">
      <span
        className="w-2.5 h-2.5 rounded-full"
        style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}80` }}
      />
      <span className="text-xs font-mono text-white/60">{lang.name}</span>
    </div>
  );
}

export default function PinnedProjects({ repos }: { repos: PinnedRepository[] }) {
  if (!repos || repos.length === 0) return null;

  return (
    <section className="relative py-24 px-8 lg:px-24 flex flex-col items-center">
      <div className="max-w-7xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-purple-400 mb-3">
              Curated Selection
            </p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white">
              Pinned <span className="font-bold">Repositories</span>
            </h2>
          </div>
          <a
            href="https://github.com/faiz-jihad"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-2 text-sm font-mono text-white/40 hover:text-white transition-colors"
          >
            View all on GitHub
            <svg className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </a>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo, i) => (
            <motion.a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              viewport={{ once: true, margin: '-40px' }}
              transition={{ 
                type: 'spring',
                stiffness: 100,
                damping: 20,
                delay: i * 0.08 
              }}
              whileHover={{
                scale: 1.03,
                y: -6,
                boxShadow: '0 0 50px rgba(139, 92, 246, 0.2)',
              }}
              className="group relative flex flex-col gap-4 rounded-2xl p-6 border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden transition-all duration-300"
              style={{ minHeight: '180px' }}
            >
              {/* Ambient hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.07] via-transparent to-cyan-500/[0.07] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Repo icon + name */}
              <div className="relative z-10 flex items-center gap-3">
                <Icon icon="mdi:source-repository" width={20} height={20} className="text-purple-400/60 flex-shrink-0" />
                <h3 className="text-base font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-colors">
                  {repo.name}
                </h3>
              </div>

              {/* Description — always visible, falls back gracefully */}
              <p className="relative z-10 text-sm text-white/60 font-light leading-relaxed flex-grow">
                {repo.description && repo.description.trim() !== ''
                  ? repo.description
                  : <span className="italic text-white/25">No description provided.</span>
                }
              </p>

              {/* Footer: language + stars + forks */}
              <div className="relative z-10 flex items-center justify-between mt-auto">
                <LanguageDot lang={repo.primaryLanguage} />

                <div className="flex gap-3 text-white/40 text-xs font-mono">
                  <span className="flex items-center gap-1">
                    <Icon icon="mdi:star-outline" width={14} height={14} />
                    {repo.stargazerCount}
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon icon="mdi:source-fork" width={14} height={14} />
                    {repo.forkCount}
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
