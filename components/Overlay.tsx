'use client';

import { memo } from 'react';
import { useTransform, motion, type MotionValue } from 'framer-motion';

// Move static data out to prevent re-creation on render
const SECTION2_TAGS = ['Laravel', 'React', 'REST APIs', 'Tailwind'];
const SECTION3_TAGS = ['Flutter', 'Machine Learning', 'Cloud'];

// Optimized component with memoization
export default memo(function Overlay({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // Section 1: 0% to 30%
  const opacity1 = useTransform(scrollYProgress, [0, 0.25, 0.3], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const scale1 = useTransform(scrollYProgress, [0, 0.3], [1, 1.05]);

  // Section 2: 30% to 60%
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.45, 0.55, 0.6], [0, 1, 1, 0]);
  const x2 = useTransform(scrollYProgress, [0.3, 0.6], [-100, 50]);

  // Section 3: 60% to 100%
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.8, 0.9, 1], [0, 1, 1, 0]);
  const x3 = useTransform(scrollYProgress, [0.6, 1], [100, -50]);

  return (
    <div className="absolute inset-0 pointer-events-none z-[60] flex flex-col font-sans">
      <div className="sticky top-0 h-screen flex items-center justify-center p-8 lg:p-24 overflow-hidden">
        
        {/* Section 1: 0% scroll (Centered) */}
        <motion.div
          style={{ 
            opacity: opacity1, 
            scale: scale1, 
            y: y1,
            translateZ: 0 // Force GPU layer
          }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center will-change-[transform,opacity]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute -inset-20 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none"
          />
          <h1 className="relative text-5xl md:text-8xl font-black tracking-tighter text-white drop-shadow-2xl">
            Hello, I'm Faiz 
          </h1>
          <p className="mt-4 text-xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 font-bold tracking-wide">
            Fullstack Developer & AI Engineer
          </p>
          <p className="mt-6 text-lg md:text-xl text-white/60 font-light max-w-lg mx-auto">
            "Informatics Engineering Student"
          </p>
        </motion.div>

        {/* Section 2: 30% scroll (Left aligned) */}
        <motion.div
          style={{ 
            opacity: opacity2, 
            x: x2,
            translateZ: 0 
          }}
          className="absolute inset-0 flex flex-col justify-center items-start text-left p-8 md:p-24 will-change-[transform,opacity]"
        >
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white max-w-2xl drop-shadow-2xl leading-tight">
            I build digital experiences.
          </h2>
          <div className="mt-8 flex flex-wrap gap-3 pointer-events-auto">
            {SECTION2_TAGS.map((tag) => (
              <span key={tag} className="px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-sm font-mono text-white/80">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Section 3: 60% scroll (Right aligned) */}
        <motion.div
          style={{ 
            opacity: opacity3, 
            x: x3,
            translateZ: 0 
          }}
          className="absolute inset-0 flex flex-col justify-center items-end text-right p-8 md:p-24 will-change-[transform,opacity]"
        >
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-white max-w-2xl drop-shadow-2xl leading-tight relative group">
            Bridging design <br className="hidden md:block" /> and engineering.
            <span className="absolute -bottom-2 right-0 w-1/2 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></span>
          </h2>
          <div className="mt-8 flex flex-wrap gap-3 justify-end pointer-events-auto">
             {SECTION3_TAGS.map((tag) => (
              <span key={tag} className="px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-sm font-mono text-white/80">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
})
