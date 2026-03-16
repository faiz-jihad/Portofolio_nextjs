'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

export default function Overlay() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Section 1: 0% to 30%
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25, 0.3], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.3], [50, -50]);
  const scale1 = useTransform(scrollYProgress, [0, 0.3], [1, 1.05]);

  // Section 2: 30% to 60%
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.45, 0.55, 0.6], [0, 1, 1, 0]);
  const x2 = useTransform(scrollYProgress, [0.3, 0.6], [-100, 50]);
  const blur2 = useTransform(scrollYProgress, [0.3, 0.45], ["blur(10px)", "blur(0px)"]);

  // Section 3: 60% to 100%
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.8, 0.9, 1], [0, 1, 1, 0]);
  const x3 = useTransform(scrollYProgress, [0.6, 1], [100, -50]);
  const blur3 = useTransform(scrollYProgress, [0.6, 0.8], ["blur(10px)", "blur(0px)"]);

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-10 flex flex-col font-sans">
      <div className="sticky top-0 h-screen flex items-center justify-center p-8 lg:p-24 overflow-hidden">
        
        {/* Section 1: 0% scroll (Centered) */}
        <motion.div
          style={{ opacity: opacity1, scale: scale1, y: y1 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute -inset-20 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none"
          />
          <h1 className="relative text-5xl md:text-8xl font-black tracking-tighter text-white drop-shadow-2xl">
            Faiz Jihad Al Baihaqi
          </h1>
          <p className="mt-4 text-xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 font-bold tracking-wide">
            Creative Developer
          </p>
          <p className="mt-6 text-lg md:text-xl text-white/60 font-light max-w-lg mx-auto">
            "My Name. Creative Developer."
          </p>
        </motion.div>

        {/* Section 2: 30% scroll (Left aligned) */}
        <motion.div
          style={{ opacity: opacity2, x: x2, filter: blur2 }}
          className="absolute inset-0 flex flex-col justify-center items-start text-left p-8 md:p-24"
        >
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white max-w-2xl drop-shadow-2xl leading-tight">
            I build digital experiences.
          </h2>
          <div className="mt-8 flex flex-wrap gap-3 pointer-events-auto">
            {['Laravel', 'React', 'REST APIs', 'Tailwind'].map((tag) => (
              <span key={tag} className="px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-sm font-mono text-white/80">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Section 3: 60% scroll (Right aligned) */}
        <motion.div
          style={{ opacity: opacity3, x: x3, filter: blur3 }}
          className="absolute inset-0 flex flex-col justify-center items-end text-right p-8 md:p-24"
        >
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white max-w-2xl drop-shadow-2xl leading-tight relative group">
            Bridging design <br className="hidden md:block" /> and engineering.
            <span className="absolute -bottom-2 right-0 w-1/2 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></span>
          </h2>
          <div className="mt-8 flex flex-wrap gap-3 justify-end pointer-events-auto">
             {['Flutter', 'Machine Learning', 'Cloud'].map((tag) => (
              <span key={tag} className="px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-sm font-mono text-white/80">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
