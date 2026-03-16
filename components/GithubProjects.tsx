'use client';

import { motion } from 'framer-motion';
import { GithubRepository } from '@/lib/github';

const ProjectCard = ({ repo, index }: { repo: GithubRepository, index: number }) => {
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02,
        y: -5,
        boxShadow: "0 0 40px rgba(139, 92, 246, 0.2)",
        borderColor: "rgba(255, 255, 255, 0.4)"
      }}
      className="group relative flex flex-col justify-between overflow-hidden cursor-pointer
                 bg-white/[0.03] backdrop-blur-2xl border border-white/10 transition-all duration-500 rounded-xl p-6 md:p-8"
      style={{ minHeight: '280px' }}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-colors">
            {repo.name}
          </h3>
          <svg className="w-5 h-5 text-white/40 group-hover:text-white transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
        </div>
        
        <p className="text-sm text-white/60 font-light leading-relaxed flex-grow line-clamp-3 mb-6">
            {repo.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-4">
            {repo.language && (
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-purple-400 to-cyan-400"></span>
                <span className="text-xs font-mono text-white/70 uppercase tracking-widest">{repo.language}</span>
              </div>
            )}
          </div>
          
          <div className="flex gap-3 text-white/50 text-xs font-mono">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>
              <span>{repo.stargazers_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              <span>{repo.forks_count}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.a>
  );
};

export default function GithubProjects({ repos }: { repos: GithubRepository[] }) {
  const featured = repos.filter(repo => repo.topics.includes('featured'));
  
  // Show projects that are either not featured, or if none are featured, show all.
  const others = featured.length > 0 ? repos.filter(repo => !repo.topics.includes('featured')) : repos;

  return (
    <section className="relative min-h-screen bg-black text-white py-32 px-8 lg:px-24 flex flex-col items-center">
      <div className="max-w-7xl w-full">
        
        {featured.length > 0 && (
          <div className="mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-light tracking-tight">
                Featured <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Projects</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
              {featured.map((repo, i) => (
                <ProjectCard key={repo.id} repo={repo} index={i} />
              ))}
            </div>
          </div>
        )}

        <div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-light tracking-tight">
              Open Source <span className="font-bold">Repositories</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {others.slice(0, 9).map((repo, i) => ( // Show at most 9 other repositories
              <ProjectCard key={repo.id} repo={repo} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
