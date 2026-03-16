'use client';

import { useEffect, useRef, useState } from 'react';
import { useTransform, useMotionValueEvent, MotionValue } from 'framer-motion';

const FRAME_COUNT = 120; // Extracted 120 frames

export default function ScrollyCanvas({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0); // For better loading feedback

  // Map scroll progress to frame index
  const currentIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        const frameStr = String(i).padStart(4, '0');
        img.src = `/sequence/${frameStr}.webp`;
        img.onload = () => {
            loadedCount++;
            setProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
            if (loadedCount === FRAME_COUNT) {
                setLoaded(true);
            }
        };
        imgArray.push(img);
    }
    setImages(imgArray);
  }, []);

  // Function to draw image and maintain object-fit: cover logic
  // Using useCallback to prevent re-creation but note it depends on window dimensions
  const drawImage = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !img) return;
    
    const ctx = canvas.getContext('2d', { alpha: false }); // Optimization: disable alpha if possible
    if (!ctx) return;

    const w = window.innerWidth;
    const h = window.innerHeight;

    // Only update canvas size if it changed
    if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
    }

    const canvasRatio = w / h;
    const imgRatio = img.width / img.height;

    let renderWidth, renderHeight, xOffset, yOffset;

    if (canvasRatio > imgRatio) {
        renderWidth = w;
        renderHeight = renderWidth / imgRatio;
        xOffset = 0;
        yOffset = (h - renderHeight) / 2;
    } else {
        renderHeight = h;
        renderWidth = renderHeight * imgRatio;
        xOffset = (w - renderWidth) / 2;
        yOffset = 0;
    }

    ctx.drawImage(img, Math.floor(xOffset), Math.floor(yOffset), Math.floor(renderWidth), Math.floor(renderHeight));
  };

  // Draw first frame when loaded
  useEffect(() => {
    if (loaded && images[0]) {
      drawImage(images[0]);
    }
  }, [loaded, images]);

  // Redraw canvas on scroll or resize
  useMotionValueEvent(currentIndex, 'change', (latest) => {
    if (loaded && images.length > 0) {
      const idx = Math.min(Math.floor(latest), FRAME_COUNT - 1);
      requestAnimationFrame(() => {
        drawImage(images[idx]);
      });
    }
  });

  useEffect(() => {
    const handleResize = () => {
      if (loaded && images.length > 0) {
        const idx = Math.min(Math.floor(currentIndex.get()), FRAME_COUNT - 1);
        drawImage(images[idx]);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [loaded, images, currentIndex]);

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden bg-black will-change-transform">
      {/* Loading state indicator */}
      {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-0">
              <p className="text-white text-sm font-mono animate-pulse mb-2">Initializing Cinematic Engine...</p>
              <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-purple-500 transition-all duration-300 ease-out" 
                    style={{ width: `${progress}%` }} 
                />
              </div>
          </div>
      )}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full transform-gpu"
      />
    </div>
  );
}
