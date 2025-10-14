"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fields } from '@/lib/constant';
import { Playfair_Display, Geist_Mono } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], display: "swap" });

gsap.registerPlugin(ScrollTrigger);

// Utility function to check if the screen is mobile
const isMobileScreen = (): boolean => {
  return window.matchMedia('(max-width: 767px)').matches;
};

export function Fields() {
  const component = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = isMobileScreen();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: component.current,
          markers: false,
          start: "top bottom",
          end: "bottom top",
          scrub: 4
        },
      });

      tl.fromTo(
        ".tech-row",
        {
          x: (index: number) => isMobile
            ? index % 2 === 0 
              ? gsap.utils.random(150, 100) 
              : gsap.utils.random(-150, -100)
            : index % 2 === 0 
              ? gsap.utils.random(300, 200) 
              : gsap.utils.random(-300, -200),
        },
        {
          x: (index: number) => isMobile
            ? index % 2 === 0 
              ? gsap.utils.random(-150, -100) 
              : gsap.utils.random(150, 100)
            : index % 2 === 0 
              ? gsap.utils.random(-300, -200) 
              : gsap.utils.random(300, 200),
          ease: "power1.inOut"
        }
      );
    }, component);

    return () => ctx.revert();
  }, []);

  return (
    <section className='overflow-hidden w-screen bg-[#F5F4EB]' ref={component}>
      {fields.map(({ name, color }, index) => (
        <div
          key={index}
          className='tech-row mb-8 flex items-center justify-center gap-4 text-zinc-700 whitespace-nowrap'
          aria-label={name || undefined}
        >
          {Array.from({ length: 15 }, (_, idx) => (
            <React.Fragment key={idx}>
              <span
                className={`tech-item text-xl md:text-5xl lg:text-8xl uppercase tracking-tighter whitespace-nowrap ${
                  // Use Playfair and bold for the middle word (index 7), Geist Mono and extralight for others
                  idx === 7 
                    ? `${playfair.className} font-bold` 
                    : `${geistMono.className} font-light`
                }`}
                style={{
                  color: idx === 7 && color ? color : "inherit"
                }}
              >
                {name}
              </span>
              <span className='text-sm md:text-2xl lg:text-3xl'>
                <span className="w-2 h-2 md:w-3 md:h-3 lg:w-4 lg:h-4 rounded-full bg-current inline-block"></span>
              </span>
            </React.Fragment>
          ))}
        </div>
      ))}
    </section>
  );
}

export default Fields;