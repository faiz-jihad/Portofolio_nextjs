'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function NanoBanana() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="fixed bottom-8 right-8 z-50 flex items-center gap-3 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, duration: 1, ease: "backOut" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div 
        className="overflow-hidden hidden md:flex"
        animate={{ width: isHovered ? "auto" : 0, opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <span className="whitespace-nowrap px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-mono text-xs tracking-widest uppercase shadow-lg">
          Nano Banana Active
        </span>
      </motion.div>
      
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 p-[1px] shadow-2xl shadow-yellow-500/20">
        <div className="w-full h-full rounded-full bg-black flex items-center justify-center relative overflow-hidden backdrop-blur-xl">
          <motion.div 
            className="absolute inset-0 bg-yellow-400/20"
            animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1] 
            }}
            transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "linear"
            }}
          />
          <span className="text-2xl relative z-10 select-none">🍌</span>
        </div>
      </div>
    </motion.div>
  );
}
