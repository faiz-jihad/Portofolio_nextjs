'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const skills = [
  { name: 'Web Development', level: 95, color: 'from-purple-500 to-purple-400' },
  { name: 'Mobile Development', level: 85, color: 'from-blue-500 to-blue-400' },
  { name: 'Artificial Intelligence', level: 75, color: 'from-cyan-500 to-cyan-400' },
  { name: 'Backend Systems', level: 90, color: 'from-fuchsia-500 to-fuchsia-400' },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative min-h-screen bg-black text-white py-32 px-8 lg:px-24 flex flex-col items-center justify-center overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl w-full relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-light mb-20 tracking-tight text-center"
        >
          Technical <span className="font-bold">Arsenal</span>
        </motion.h2>

        <div ref={ref} className="space-y-12">
          {skills.map((skill, index) => (
            <div key={skill.name} className="relative group">
              <div className="flex justify-between items-end mb-3">
                <span className="text-xl font-medium tracking-wide text-white/90 group-hover:text-white transition-colors duration-300">
                  {skill.name}
                </span>
                <span className="text-sm font-mono text-white/50">{skill.level}%</span>
              </div>
              
              <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                  className={`h-full bg-gradient-to-r ${skill.color} relative`}
                >
                  {/* Glowing tip */}
                  <div className="absolute right-0 top-0 h-full w-4 bg-white/50 blur-[2px]" />
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
