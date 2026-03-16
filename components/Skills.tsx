'use client';

import { motion } from 'framer-motion';

const CATEGORIES = [
  {
    name: 'Frontend',
    icon: '🖥',
    color: 'from-cyan-500/10 to-blue-500/5 border-cyan-500/20',
    glow: 'rgba(6, 182, 212, 0.15)',
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'Tailwind CSS', level: 95 },
    ],
  },
  {
    name: 'Backend',
    icon: '⚙️',
    color: 'from-red-500/10 to-orange-500/5 border-red-500/20',
    glow: 'rgba(239, 68, 68, 0.15)',
    skills: [
      { name: 'Laravel', level: 92 },
      { name: 'PHP', level: 88 },
      { name: 'Supabase', level: 80 },
      { name: 'REST APIs', level: 90 },
    ],
  },
  {
    name: 'Mobile',
    icon: '📱',
    color: 'from-blue-500/10 to-indigo-500/5 border-blue-500/20',
    glow: 'rgba(59, 130, 246, 0.15)',
    skills: [
      { name: 'Flutter', level: 80 },
      { name: 'Dart', level: 75 },
    ],
  },
  {
    name: 'AI / Data',
    icon: '🧠',
    color: 'from-purple-500/10 to-fuchsia-500/5 border-purple-500/20',
    glow: 'rgba(168, 85, 247, 0.15)',
    skills: [
      { name: 'AI Fundamentals', level: 70 },
      { name: 'Data Science', level: 65 },
      { name: 'Microsoft Fabric', level: 60 },
    ],
  },
];

const barColors: Record<string, string> = {
  Frontend: '#06b6d4',
  Backend: '#ef4444',
  Mobile: '#3b82f6',
  'AI / Data': '#a855f7',
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 px-8 lg:px-24 flex flex-col items-center bg-black">
      <div className="max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-purple-400 mb-3">Expertise</p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white">
            Skills &amp; <span className="font-bold">Technologies</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: ci * 0.1 }}
              className={`relative rounded-2xl border bg-gradient-to-br p-8 backdrop-blur-xl overflow-hidden group ${cat.color}`}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ boxShadow: `inset 0 0 60px ${cat.glow}` }}
              />

              <div className="flex items-center gap-3 mb-8">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="text-lg font-bold text-white tracking-tight">{cat.name}</h3>
              </div>

              <div className="flex flex-col gap-5">
                {cat.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-mono text-white/70">{skill.name}</span>
                      <span className="text-xs font-mono text-white/30">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: ci * 0.1 + si * 0.08, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${barColors[cat.name]}99, ${barColors[cat.name]})`,
                          boxShadow: `0 0 8px ${barColors[cat.name]}60`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
