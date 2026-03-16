'use client';

import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

const SKILL_TAGS = [
  { label: 'Laravel',      icon: 'devicon:laravel',         color: 'from-red-500/20 to-red-600/10 border-red-500/30 text-red-300' },
  { label: 'React.js',     icon: 'devicon:react',           color: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-300' },
  { label: 'Next.js',      icon: 'devicon:nextjs',          color: 'from-white/10 to-white/5 border-white/20 text-white/70' },
  { label: 'Flutter',      icon: 'devicon:flutter',         color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-300' },
  { label: 'PHP',          icon: 'devicon:php',             color: 'from-indigo-500/20 to-indigo-600/10 border-indigo-500/30 text-indigo-300' },
  { label: 'Supabase',     icon: 'devicon:supabase',        color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-300' },
  { label: 'Tailwind CSS', icon: 'devicon:tailwindcss',     color: 'from-sky-500/20 to-sky-600/10 border-sky-500/30 text-sky-300' },
  { label: 'AI / ML',      icon: 'mdi:brain',               color: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-300' },
  { label: 'Data Science', icon: 'mdi:chart-scatter-plot',  color: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30 text-yellow-300' },
  { label: 'REST APIs',    icon: 'mdi:api',                 color: 'from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-300' },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 px-8 lg:px-24 flex flex-col items-center bg-black">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Text block */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono uppercase tracking-[0.3em] text-purple-400 mb-4"
          >
            About Me
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            className="text-4xl md:text-5xl font-light tracking-tight text-white mb-8 leading-tight"
          >
            Building <span className="font-bold">impactful</span> software from Bandung, Indonesia.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
            className="text-white/60 font-light leading-relaxed text-base md:text-lg mb-10"
          >
            I am an Informatics Engineering student passionate about building scalable digital solutions. I specialize in the <span className="text-white/90 font-medium">Laravel</span> and <span className="text-white/90 font-medium">React.js</span> ecosystem, while actively exploring mobile development with <span className="text-white/90 font-medium">Flutter</span> and artificial intelligence to create smarter, data-driven applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.2 }}
            className="flex flex-col gap-3 text-sm font-mono"
          >
            {[
              { label: 'Location',  icon: 'mdi:map-marker-outline',       value: 'Bandung, Indonesia' },
              { label: 'Status',    icon: 'mdi:school-outline',            value: 'Informatics Engineering Student' },
              { label: 'Languages', icon: 'mdi:web',                      value: 'Bahasa Indonesia · English (Limited)' },
            ].map(item => (
              <div key={item.label} className="flex gap-4 items-center">
                <span className="text-white/30 w-20 flex-shrink-0">{item.label}</span>
                <span className="flex items-center gap-1.5 text-white/70">
                  <Icon icon={item.icon} width={14} height={14} className="text-purple-400/70" />
                  {item.value}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Skill tags cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl overflow-hidden"
        >
          {/* Ambient glow */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600/15 rounded-full blur-[80px] pointer-events-none" />
          
          <p className="text-xs font-mono uppercase tracking-widest text-white/30 mb-6">Tech Stack</p>
          
          <div className="flex flex-wrap gap-3">
            {SKILL_TAGS.map((tag, i) => (
              <motion.span
                key={tag.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 200, 
                  damping: 15, 
                  delay: i * 0.05 
                }}
                whileHover={{ scale: 1.08, y: -2 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border bg-gradient-to-br ${tag.color} text-sm font-mono cursor-default backdrop-blur-sm transition-transform`}
              >
                <Icon icon={tag.icon} width={14} height={14} />
                {tag.label}
              </motion.span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
