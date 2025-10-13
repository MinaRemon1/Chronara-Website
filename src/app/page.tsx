"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Playfair_Display, Geist, Geist_Mono } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
});

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const heroRef = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Basic scroll detection for background changes
      setIsScrolled(currentScrollY > 50);

      // Navbar hide/show logic
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past threshold - hide nav
        setIsNavVisible(false);
      } else {
        // Scrolling up - show nav
        setIsNavVisible(true);
      }

      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    setIsLoaded(true);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Fixed Hero Section */}
      <div 
        ref={heroRef}
        className="fixed top-0 left-0 w-full h-screen z-0"
      >
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/mainVid2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Navigation */}
        <nav className={`fixed top-0 w-full z-50 bg-transparent py-5 transition-all duration-500 ease-in-out ${
          isNavVisible ? 'translate-y-0' : '-translate-y-full'
        } ${isScrolled ? 'bg-black/20' : 'bg-transparent'}`}>
          <div className="container mx-auto px-6 flex justify-between items-center">
            {/* Logo */}
            <Image 
              src='/logo3.png'
              width="200"
              height="200"
              alt="logo"
              className="transition-all duration-300"
            />

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-12">
              {['Portfolio', 'Services', 'About', 'Journal', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-white/90 hover:text-white font-light tracking-widest text-sm transition-all duration-300 hover:scale-105"
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden text-white text-2xl transition-all duration-300 hover:scale-110">
              ☰
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="relative z-10 container mx-auto px-6">
            <div className={`max-w-4xl transform transition-all duration-1000 ${
              isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              {/* Main Heading */}
              <h1 className="font-playfair text-6xl md:text-8xl lg:text-9xl text-white font-light mb-8 leading-none tracking-tight">
                Create
                <br />
                <span className="italic text-[#c4a267]">Timeless</span>
                <br />
                Spaces
              </h1>

              {/* Subtitle */}
              <p className="text-white/80 text-xl md:text-2xl font-light mb-12 max-w-2xl leading-relaxed tracking-wide">
                Crafting extraordinary interiors that tell your unique story through 
                bespoke design and impeccable attention to detail.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="group relative bg-white text-black px-12 py-4 font-light tracking-widest text-sm uppercase transition-all duration-500 hover:bg-transparent hover:text-white border border-white overflow-hidden">
                  <span className="relative z-10">Begin Your Journey</span>
                  <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </button>
                
                <button className="group text-white px-12 py-4 font-light tracking-widest text-sm uppercase border border-white/50 transition-all duration-500 hover:border-white hover:bg-white/10">
                  View Our Portfolio
                </button>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <div className="w-px h-16 bg-white/50">
              <div className="w-px h-8 bg-white animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Wrapper that scrolls over the hero */}
      <div className="relative z-10" style={{ marginTop: '100vh' }}>
        {/* Who We Are Section */}
        <section 
          ref={aboutRef}
          className="relative bg-white py-24 lg:py-32 overflow-hidden"
        >
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Image Gallery */}
              <div className="relative">
                {/* Main Image */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src="/image1.jpg"
                    alt="Luxury interior design"
                    fill
                    className="object-cover transition-all duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                </div>
                
                {/* Floating Secondary Images */}
                <div className="absolute -bottom-8 -right-8 w-2/3 aspect-square border-8 border-white shadow-2xl">
                  <Image
                    src="/image2.jpg"
                    alt="Design detail"
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Accent Element */}
                <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-gold/30">
                  <div className="absolute inset-0 border border-gold/20 m-2"></div>
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                {/* Section Label */}
                <div className="flex items-center mb-8">
                  <div className="w-16 h-px bg-gray-300 mr-4"></div>
                  <span className={`${geistMono.className} text-sm tracking-widest text-gray-500 uppercase`}>
                    Who We Are
                  </span>
                </div>

                {/* Main Heading */}
                <h2 className={`${playfair.className} text-5xl lg:text-6xl text-gray-900 font-light mb-8 leading-tight`}>
                  Crafting
                  <span className="italic block text-[#c4a267]">Timeless</span>
                  Elegance
                </h2>

                {/* Description */}
                <div className="space-y-6 mb-12">
                  <p className={`${geist.className} text-lg text-gray-600 leading-relaxed`}>
                    CHRONARA stands at the intersection of artistry and architecture, where every space 
                    becomes a narrative of refined living. For over a decade, we have transformed 
                    residences into timeless sanctuaries that reflect the unique essence of their inhabitants.
                  </p>
                  
                  <p className={`${geist.className} text-lg text-gray-600 leading-relaxed`}>
                    Our philosophy centers on creating environments that not only captivate the senses 
                    but also stand the test of time. Through meticulous attention to detail and 
                    unparalleled craftsmanship, we bring visions to life with sophistication and grace.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-8 mb-12">
                  {[
                    { number: '12+', label: 'Years Excellence' },
                    { number: '250+', label: 'Projects Completed' },
                    { number: '15+', label: 'International Awards' },
                    { number: '98%', label: 'Client Satisfaction' }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className={`${playfair.className} text-3xl text-gray-900 mb-2`}>
                        {stat.number}
                      </div>
                      <div className={`${geistMono.className} text-xs text-gray-500 uppercase tracking-widest`}>
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className="group relative bg-[#c4a267] text-white px-12 py-4 font-light tracking-widest text-sm uppercase transition-all duration-500 hover:bg-transparent hover:text-gray-900 border border-white-900 overflow-hidden">
                  <span className="relative z-10">Discover Our Story</span>
                  <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -z-10"></div>
          
          {/* Floating Elements */}
          <div className="absolute bottom-20 left-10 w-2 h-32 bg-gray-200"></div>
          <div className="absolute top-32 right-40 w-1 h-24 bg-gray-200 rotate-45"></div>
        </section>

        {/* Add more sections here that will scroll normally */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-light text-center mb-16">More Content Sections</h2>
            {/* Add your additional content sections here */}
          </div>
        </section>
      </div>
    </div>
  );
}