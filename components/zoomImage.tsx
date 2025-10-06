// components/PinZoomImage.tsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const PinZoomImage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imageRef.current && containerRef.current) {
        gsap.to(imageRef.current, {
          scale: 1.2,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom+=300 top',
            scrub: true,
            pin: true,
            anticipatePin: 1,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert(); // Clean up on unmount
  }, []);

  return (
    <div ref={containerRef} className="h-screen overflow-hidden relative">
      <Image
        ref={imageRef}
        src="/images/brandon2.jpg"
        alt="Zoom on Scroll"
        fill
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default PinZoomImage;