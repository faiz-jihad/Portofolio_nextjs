'use client';

import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

const CERTS = [
  {
    title: 'Basic Learning AI',
    issuer: 'Dicoding Indonesia',
    icon: 'hugeicons:ai-brain-02',
    color: 'from-purple-500/15 to-purple-600/5 border-purple-500/25',
    iconColor: '#c084fc',
    badge: 'AI',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  },
  {
    title: 'Belajar Penerapan Data Science dengan Microsoft Fabric',
    issuer: 'Microsoft / Dicoding',
    icon: 'devicon:microsoftsqlserver-wordmark',
    color: 'from-blue-500/15 to-blue-600/5 border-blue-500/25',
    iconColor: '#60a5fa',
    badge: 'Data',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  },
  {
    title: "Hafiz 15 Juz Al-Qur'an",
    issuer: 'Islamic Study Program',
    icon: 'game-icons:open-book',
    color: 'from-emerald-500/15 to-emerald-600/5 border-emerald-500/25',
    iconColor: '#34d399',
    badge: 'Life',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  },
  {
    title: 'English Camp Completion',
    issuer: 'Language Program',
    icon: 'material-symbols:language',
    color: 'from-orange-500/15 to-orange-600/5 border-orange-500/25',
    iconColor: '#fb923c',
    badge: 'Language',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-24 px-8 lg:px-24 flex flex-col items-center bg-black">
      <div className="max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-purple-400 mb-3">Recognition</p>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white">
            Certifications &amp; <span className="font-bold">Achievements</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTS.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ 
                type: 'spring',
                stiffness: 100,
                damping: 20,
                delay: i * 0.1 
              }}
              whileHover={{ scale: 1.02, y: -4 }}
              className={`relative flex items-start gap-5 rounded-2xl border bg-gradient-to-br backdrop-blur-xl p-6 overflow-hidden group cursor-default ${cert.color}`}
            >
              {/* Ambient glow on hover */}
              <div className="absolute inset-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />

              {/* Iconify icon bubble */}
              <div
                className="flex-shrink-0 w-14 h-14 rounded-2xl bg-black/30 border border-white/10 flex items-center justify-center"
                style={{ boxShadow: `0 0 20px ${cert.iconColor}30` }}
              >
                <Icon icon={cert.icon} width={28} height={28} color={cert.iconColor} />
              </div>

              {/* Text */}
              <div className="flex-grow min-w-0">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="text-sm md:text-base font-bold text-white leading-snug">
                    {cert.title}
                  </h3>
                  <span className={`flex-shrink-0 px-2.5 py-1 rounded-full border text-[10px] font-mono uppercase tracking-widest ${cert.badgeColor}`}>
                    {cert.badge}
                  </span>
                </div>
                <p className="text-xs font-mono text-white/40 mt-1">{cert.issuer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
