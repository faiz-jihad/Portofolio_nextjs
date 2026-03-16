'use client';

import { motion } from 'framer-motion';
import { PinnedRepository } from '@/lib/github';

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
          transition={{ duration: 0.7 }}
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{
                scale: 1.03,
                y: -6,
                boxShadow: '0 0 50px rgba(139, 92, 246, 0.2)',
              }}
              className="group relative flex flex-col gap-4 rounded-2xl p-6 border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden transition-all duration-300"
            >
              {/* Ambient hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/[0.07] via-transparent to-cyan-500/[0.07] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Repo icon + name */}
              <div className="relative z-10 flex items-center gap-3">
                <svg className="w-5 h-5 text-white/40 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V5m8 2V5" />
                </svg>
                <h3 className="text-base font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-colors truncate">
                  {repo.name}
                </h3>
              </div>

              {/* Description */}
              <p className="relative z-10 text-sm text-white/55 font-light leading-relaxed line-clamp-2 flex-grow">
                {repo.description ?? 'No description provided.'}
              </p>

              {/* Footer: language + stars + forks */}
              <div className="relative z-10 flex items-center justify-between mt-auto">
                <LanguageDot lang={repo.primaryLanguage} />

                <div className="flex gap-3 text-white/40 text-xs font-mono">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                    </svg>
                    {repo.stargazerCount}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
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
