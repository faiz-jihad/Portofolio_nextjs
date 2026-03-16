'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsExiting(true), 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isExiting) {
      setTimeout(onComplete, 1000);
    }
  }, [isExiting, onComplete]);

  const loadingTexts = [
    "Initializing neural networks...",
    "Scanning developer profile...",
    "Booting cinematic sequences...",
    "Optimizing glassmorphism layers...",
    "Establishing Supabase connection...",
    "Syncing GitHub activity...",
    "Ready for interaction."
  ];

  const currentTextIndex = Math.min(
    Math.floor((progress / 100) * loadingTexts.length),
    loadingTexts.length - 1
  );

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%',
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden font-sans"
        >
          {/* Background Ambient Glow */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]"
          />

          <div className="relative z-10 flex flex-col items-center">
            {/* Logo / Initials */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-12 relative"
            >
              <div className="text-6xl md:text-8xl font-black tracking-tighter text-white">
                Hello All<span className="text-purple-500">.</span>
              </div>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500"
              />
            </motion.div>

            {/* Progress Percentage */}
            <div className="text-4xl md:text-6xl font-black text-white/90 mb-8 tabular-nums">
              {Math.min(progress, 100)}%
            </div>

            {/* Scanning Bar */}
            <div className="w-64 md:w-96 h-1 bg-white/5 rounded-full overflow-hidden mb-6 relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-purple-500"
                style={{ width: `${progress}%` }}
              />
              <motion.div 
                animate={{ x: ['-100%', '300%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              />
            </div>

            {/* Dynamic Status Text */}
            <motion.p
              key={currentTextIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white/40 font-mono text-xs uppercase tracking-[0.3em]"
            >
              {loadingTexts[currentTextIndex]}
            </motion.p>
          </div>

          {/* Grid Overlay */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ 
              backgroundImage: `linear-gradient(to right, #1a1a1a 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
