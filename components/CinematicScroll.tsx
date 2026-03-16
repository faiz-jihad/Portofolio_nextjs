'use client';

import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import ScrollyCanvas from './ScrollyCanvas';
import Overlay from './Overlay';

export default function CinematicScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section ref={containerRef} className="relative h-[500vh]">
      <ScrollyCanvas scrollYProgress={scrollYProgress} />
      <Overlay scrollYProgress={scrollYProgress} />
    </section>
  );
}
