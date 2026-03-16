'use client';

import { useRef } from 'react';
import { useScroll, useSpring } from 'framer-motion';
import ScrollyCanvas from './ScrollyCanvas';
import Overlay from './Overlay';

export default function CinematicScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Add inertial smoothing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section ref={containerRef} className="relative h-[500vh]">
      <ScrollyCanvas scrollYProgress={smoothProgress} />
      <Overlay scrollYProgress={smoothProgress} />
    </section>
  );
}
