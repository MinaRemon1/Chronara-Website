'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    const initSmoothScroll = async () => {
      // Dynamically import Lenis only on client side
      const Lenis = (await import('lenis')).default;
      
      const lenis = new Lenis({
        duration: 1.2, // Animation duration in seconds
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for momentum
        orientation: 'vertical', // vertical or horizontal
        gestureOrientation: 'vertical', // vertical or horizontal
        smoothWheel: true, // Enable smooth wheel scrolling
        wheelMultiplier: 1, // Wheel multiplier
        touchMultiplier: 2, // Touch multiplier
        infinite: false, // Infinite scrolling
      });

      // RAF function
      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      // Cleanup on unmount or route change
      return () => {
        lenis.destroy();
      };
    };

    initSmoothScroll();
  }, [pathname]); // Re-initialize on route change

  return <>{children}</>;
}