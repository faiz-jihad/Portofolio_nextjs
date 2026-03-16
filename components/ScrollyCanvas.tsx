'use client';

import { useEffect, useRef, useState } from 'react';
import { useTransform, useMotionValueEvent, MotionValue } from 'framer-motion';

const FRAME_COUNT = 120; // Extracted 120 frames

export default function ScrollyCanvas({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

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
            if (loadedCount === FRAME_COUNT) {
                setLoaded(true);
            }
        };
        imgArray.push(img);
    }
    setImages(imgArray);
  }, []);

  // Function to draw image and maintain object-fit: cover logic
  const drawImage = (img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas || !img) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set internal canvas resolution
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let renderWidth, renderHeight, xOffset, yOffset;

    if (canvasRatio > imgRatio) {
        // Canvas is wider than image relative to height
        renderWidth = canvas.width;
        renderHeight = renderWidth / imgRatio;
        xOffset = 0;
        yOffset = (canvas.height - renderHeight) / 2;
    } else {
        // Canvas is taller than image relative to width
        renderHeight = canvas.height;
        renderWidth = renderHeight * imgRatio;
        xOffset = (canvas.width - renderWidth) / 2;
        yOffset = 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
      {/* Loading state indicator */}
      {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-0">
              <p className="text-white text-sm font-mono animate-pulse">Loading Sequence...</p>
          </div>
      )}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
