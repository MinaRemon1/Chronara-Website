"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Playfair_Display, Geist_Mono } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Fonts at module scope
const playfair = Playfair_Display({ subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], display: "swap" });

type Project = {
  title: string;
  location: string;
  date: string;
  type: "Apartment" | "Villa" | "Office" | "Penthouse" | string;
  images: string[];
};

const projects: Project[] = [
  {
    title: "Skyline Penthouse",
    location: "New York, NY",
    date: "2024",
    type: "Penthouse",
    images: ["/projectImage1.jpg", "/projectImage2.jpg", "/image2.jpg"],
  },
  {
    title: "Coastal Retreat",
    location: "Malibu, CA",
    date: "2023",
    type: "Villa",
    images: ["/image2.jpg", "/image1.jpg", "/image.jpg"],
  },
];

export default function PortfolioSection() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blocks = gsap.utils.toArray<HTMLElement>(".project-block");
    const triggers: ScrollTrigger[] = [];
  
    blocks.forEach((block) => {
      const overlay = block.querySelector<HTMLElement>(".project-overlay");
      const slides = block.querySelectorAll<HTMLElement>(".project-slide");
      const firstSlide = slides[0] as HTMLElement | undefined;
      const lastSlide = slides[slides.length - 1] as HTMLElement | undefined;
      if (!overlay || !firstSlide || !lastSlide) return;
  
      // Pin the overlay starting with the first slide
      // and unpin right as the last slide finishes
      const st = ScrollTrigger.create({
        trigger: firstSlide,
        start: "top top",
        endTrigger: lastSlide,          // 👈 stop when last slide leaves viewport
        end: "bottom bottom",           // 👈 unpin exactly at last slide bottom
        pin: overlay,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });
  
      triggers.push(st);
    });
  
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);
  
    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={rootRef} className="relative w-full">
      {projects.map((project, idx) => (
        <ProjectBlock key={idx} project={project} />
      ))}
    </section>
  );
}

function ProjectBlock({ project }: { project: Project }) {
  return (
    <section className="project-block relative w-full">
      {/* Overlay FIRST. Height canceled so it doesn't create an extra panel. */}
      <div
        className="project-overlay relative z-20 h-[100svh] mb-[-100svh] pointer-events-none flex items-center justify-center"
        style={{ marginBottom: "-100svh" }}
      >
        <div className="text-center text-white px-4 pointer-events-auto">
          <h2 className={`${playfair.className} text-5xl md:text-7xl font-light mb-4`}>
            {project.title}
          </h2>
          <p className={`${geistMono.className} text-white/90 text-sm uppercase tracking-widest mb-6`}>
            {project.type} · {project.location} · {project.date}
          </p>
          <Link
            href="/portfolio"
            className="inline-block rounded-full border border-white/70 px-6 py-3 text-sm uppercase tracking-widest backdrop-blur-sm transition hover:border-white hover:bg-white/10"
          >
            See full portfolio
          </Link>
        </div>
      </div>

      {/* All slides scroll normally behind the pinned overlay */}
      {project.images.map((src, i) => (
        <div key={i} className="project-slide relative h-[100svh] w-full overflow-hidden">
          <Image
            src={src}
            alt={project.title}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="100vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/25" />
        </div>
      ))}
    </section>
  );
}