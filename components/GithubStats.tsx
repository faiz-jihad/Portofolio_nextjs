'use client';

import { motion } from 'framer-motion';
import { GithubStats } from '@/lib/github';
import { Icon } from '@iconify/react';

export default function GithubProfileStats({ stats }: { stats: GithubStats }) {
  if (!stats) return null;

  return (
    <section className="relative bg-black text-white py-16 px-8 lg:px-24 flex flex-col items-center">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5, delay: 0 }}
           className="bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/[0.04] transition-colors"
        >
          <Icon icon="mdi:source-repository" width={24} height={24} className="text-purple-400/60 mb-3" />
          <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-2">
            {stats.totalRepos}
          </div>
          <div className="text-sm font-mono text-white/50 uppercase tracking-widest">Repositories</div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5, delay: 0.1 }}
           className="bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/[0.04] transition-colors"
        >
          <Icon icon="mdi:star-outline" width={24} height={24} className="text-blue-400/60 mb-3" />
          <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
            {stats.totalStars}
          </div>
          <div className="text-sm font-mono text-white/50 uppercase tracking-widest">Total Stars</div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5, delay: 0.2 }}
           className="bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-white/[0.04] transition-colors"
        >
          <Icon icon="mdi:code-tags" width={24} height={24} className="text-cyan-400/60 mb-3" />
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {stats.topLanguages.map((lang, idx) => (
              <span key={lang.language} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-white/80">
                {lang.language}
              </span>
            ))}
          </div>
          <div className="text-sm font-mono text-white/50 uppercase tracking-widest">Top Languages</div>
        </motion.div>
        
      </div>
    </section>
  );
}
