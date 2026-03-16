'use client';

import { motion } from 'framer-motion';
import { useTypewriter } from '@/hooks/useTypewriter';
import { Icon } from '@iconify/react';

const ROLES = [
  'Fullstack Developer',
  'AI Enthusiast',
  'Mobile Developer',
  'Laravel Engineer',
  'React Developer',
];

export default function Hero() {
  const typedRole = useTypewriter(ROLES, 75, 2000);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-8 lg:px-24 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-purple-700/20 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-cyan-700/20 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-5xl w-full flex flex-col items-start gap-8">
        
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-mono text-sm uppercase tracking-[0.3em] text-purple-400"
        >
          👋 Hello, World!
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.9]"
        >
          Faiz Jihad
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400">
            Al Baihaqi
          </span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-2xl md:text-3xl font-light text-white/70 flex items-center gap-2 h-10"
        >
          <span>{typedRole}</span>
          <span className="w-0.5 h-8 bg-purple-400 animate-pulse rounded-full" />
        </motion.div>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-base md:text-lg text-white/50 font-light max-w-2xl leading-relaxed"
        >
          Informatics Engineering student from <span className="text-white/70">Bandung, Indonesia</span> — building scalable web, mobile, and AI-powered applications that make a difference.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap gap-4 items-center"
        >
          <a
            href="#projects"
            className="group relative px-7 py-3.5 bg-white text-black font-semibold rounded-full text-sm overflow-hidden transition-transform hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-200 to-cyan-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              View Projects
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </span>
          </a>

          <a
            href="#contact"
            className="px-7 py-3.5 border border-white/20 text-white/80 hover:text-white hover:border-white/50 font-semibold rounded-full text-sm transition-all duration-300 hover:bg-white/5 backdrop-blur-md"
          >
            Contact Me
          </a>

          <div className="flex gap-3 items-center ml-2">
            <a
              href="https://github.com/faiz-jihad"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-2.5 border border-white/10 text-white/50 hover:text-white hover:border-white/30 rounded-full transition-all hover:bg-white/5"
            >
              <Icon icon="mdi:github" width={20} height={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/faiz-jihad-al-baihaqi-08a947321/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-2.5 border border-white/10 text-white/50 hover:text-white hover:border-white/30 rounded-full transition-all hover:bg-white/5"
            >
              <Icon icon="mdi:linkedin" width={20} height={20} />
            </a>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
