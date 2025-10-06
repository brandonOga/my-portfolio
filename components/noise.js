'use client';

import { useRef, useEffect } from 'react';

const Noise = ({
  patternScaleX = 1,
  patternScaleY = 1,
  patternRefreshInterval = 4,
  patternAlpha = 25,
}) => {
  const grainRef = useRef(null);

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let frame = 0;
    let animationId;

    const resize = () => {
      if (!canvas) return;

      const fullHeight = document.documentElement.scrollHeight;
      canvas.width = window.innerWidth;
      canvas.height = fullHeight;

      canvas.style.width = '100vw';
      canvas.style.height = `${fullHeight}px`;
    };

    const drawGrain = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() * 255;
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = patternAlpha;
      }

      ctx.putImageData(imageData, 0, 0);
    };

    const loop = () => {
      if (frame % patternRefreshInterval === 0) {
        drawGrain();
      }
      frame++;
      animationId = window.requestAnimationFrame(loop);
    };

    window.addEventListener('resize', resize);
    resize();
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationId);
    };
  }, [patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha]);

  return (
    <canvas
      className="pointer-events-none absolute inset-0 w-full h-full z-100"
      ref={grainRef}
      style={{ imageRendering: 'pixelated' }}
    />
  );
};

export default Noise;
