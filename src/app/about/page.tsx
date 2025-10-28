"use client"

import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

// Font imports
import { Playfair_Display, Geist_Mono, Geist } from 'next/font/google';
import Link from 'next/link';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair'
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono'
});

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist'
});

// Types
interface TeamMember {
  name: string;
  role: string;
  image: string;
  description: string;
}

interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

interface PhilosophyPoint {
  title: string;
  description: string;
}

interface StatItem {
  number: string;
  label: string;
}

const AboutPage: NextPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const philosophyRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    setIsLoaded(true);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const teamMembers: TeamMember[] = [
    {
      name: "Elena Rodriguez",
      role: "Founder & Creative Director",
      image: "/image.jpg",
      description: "With over 15 years in luxury design, Elena's vision shapes every CHRONARA creation."
    },
    {
      name: "Marcus Thorne",
      role: "Senior Architect",
      image: "/image1.jpg",
      description: "Marcus blends architectural precision with artistic sensibility in every space."
    },
    {
      name: "Sophie Chen",
      role: "Lead Designer",
      image: "/image2.jpg",
      description: "Sophie's expertise in materials and textures creates truly immersive environments."
    }
  ];

  const processSteps: ProcessStep[] = [
    {
      step: "01",
      title: "Discovery & Vision",
      description: "We immerse ourselves in your world, understanding your lifestyle, aspirations, and the unique story you wish to tell through your space."
    },
    {
      step: "02",
      title: "Concept Development",
      description: "Our team creates bespoke design concepts that blend your vision with our expertise, presenting mood boards and initial concepts."
    },
    {
      step: "03",
      title: "Detailed Design",
      description: "Every element is meticulously planned—from custom furniture to lighting schemes—ensuring perfect harmony in every detail."
    },
    {
      step: "04",
      title: "Execution & Craftsmanship",
      description: "Our master craftsmen and trusted partners bring the design to life with unparalleled attention to quality and precision."
    },
    {
      step: "05",
      title: "Reveal & Refinement",
      description: "We present the transformed space, ensuring every element exceeds expectations and reflects the vision we set out to achieve."
    }
  ];

  const philosophyPoints: PhilosophyPoint[] = [
    {
      title: "Timeless Design",
      description: "We create spaces that transcend trends, focusing on enduring beauty and sophisticated elegance that remains relevant for generations."
    },
    {
      title: "Bespoke Craftsmanship",
      description: "Every project is uniquely tailored, with custom-made elements and artisanal details that reflect our clients' individuality."
    },
    {
      title: "Sensory Experience",
      description: "We design environments that engage all senses, creating harmonious spaces that feel as extraordinary as they look."
    },
    {
      title: "Sustainable Luxury",
      description: "Our commitment to excellence includes responsible sourcing and sustainable practices that honor both people and planet."
    }
  ];

  const stats: StatItem[] = [
    { number: '12+', label: 'Years Excellence' },
    { number: '250+', label: 'Projects Completed' },
    { number: '15+', label: 'International Awards' },
    { number: '98%', label: 'Client Satisfaction' }
  ];

  return (
    <>
      <Head>
        <title>About CHRONARA | Luxury Interior Design</title>
        <meta name="description" content="Discover the story behind CHRONARA - crafting timeless elegance through bespoke interior design for over a decade." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={`${playfair.variable} ${geistMono.variable} ${geist.variable}`}>
        {/* Fixed Hero Section */}
        <div className="fixed top-0 left-0 w-full h-screen z-0">
          <div className="absolute inset-0">
            <Image
              src="/image.jpg"
              alt="CHRONARA Luxury Interior Design"
              fill
              className="object-cover opacity-60"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70"></div>
          </div>

          {/* Navigation */}
        <nav className={`fixed top-0 w-full z-50 bg-transparent py-5 transition-all duration-500 ease-in-out ${
          isNavVisible ? 'translate-y-0' : '-translate-y-full'
        } ${isScrolled ? 'bg-black/20' : 'bg-transparent'}`}>
          <div className="container mx-auto px-6 flex justify-between items-center">
            {/* Logo */}
            <Link href="/">
                <Image 
                src='/logo3.png'
                width="200"
                height="200"
                alt="logo"
                className="transition-all duration-300"
                />
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-12">
              {['About', 'Services', 'Portfolio', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
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
          
          {/* Hero Content - Bottom Left */}
          <div className="relative h-full flex items-end pb-20">
            <div className="container mx-auto px-6">
              <div className={`max-w-2xl transform transition-all duration-1000 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-px bg-gold mr-4"></div>
                  <span className={`${geistMono.className} text-sm tracking-widest text-gold uppercase`}>
                    Our Legacy
                  </span>
                </div>
                
                <h1 className={`${playfair.className} text-5xl md:text-6xl lg:text-7xl text-white font-light mb-6 leading-tight`}>
                  About
                  {/* <span className="block text-gold">CHRONARA</span> */}
                </h1>
                
                {/* <p className={`${geist.className} text-lg md:text-xl text-white/80 max-w-xl leading-relaxed font-light`}>
                  Crafting timeless spaces where artistry meets architecture, and every detail tells a story of refined living.
                </p> */}
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="animate-bounce">
              <div className="w-px h-12 bg-gold mx-auto"></div>
            </div>
          </div>
        </div>

        {/* Content Wrapper that scrolls over the hero */}
        <div className="relative z-10" style={{ marginTop: '100vh' }}>
          {/* Who We Are Section */}
          <section className="relative bg-[#F5F4EB] py-32 overflow-hidden">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                
                {/* Image Gallery */}
                <div className="relative">
                  {/* Main Image */}
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src="/image1.jpg"
                      alt="Luxury interior design by CHRONARA"
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

                  {/* Third Floating Image */}
                  <div className="absolute -top-12 -left-12 w-48 h-48 border-4 border-white shadow-2xl">
                    <Image
                      src="/image.jpg"
                      alt="Design process"
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
                    <span className="italic block text-gold">Timeless</span>
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

                    <p className={`${geist.className} text-lg text-gray-600 leading-relaxed`}>
                      Founded on the principles of excellence, innovation, and timeless beauty, CHRONARA 
                      has become synonymous with luxury interior design that transcends trends and 
                      creates lasting value for our discerning clients.
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-8 mb-12">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center group">
                        <div className={`${playfair.className} text-3xl text-gray-900 mb-2 transition-all duration-300 group-hover:text-gold`}>
                          {stat.number}
                        </div>
                        <div className={`${geistMono.className} text-xs text-gray-500 uppercase tracking-widest`}>
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="group relative bg-gold text-white px-12 py-4 font-light tracking-widest text-sm uppercase transition-all duration-500 hover:bg-transparent hover:text-gray-900 border border-gold overflow-hidden">
                      <span className="relative z-10">View Our Portfolio</span>
                      <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </button>
                    
                    <button className="group relative bg-transparent text-gray-900 px-12 py-4 font-light tracking-widest text-sm uppercase transition-all duration-500 hover:bg-gold hover:text-white border border-gray-900 overflow-hidden">
                      <span className="relative z-10">Contact Us</span>
                      <div className="absolute inset-0 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50/50 -z-10"></div>
            
            {/* Floating Elements */}
            <div className="absolute bottom-20 left-10 w-2 h-32 bg-gray-200/50"></div>
            <div className="absolute top-32 right-40 w-1 h-24 bg-gray-200/50 rotate-45"></div>
          </section>

          {/* Our Philosophy Section */}
          <section ref={philosophyRef} className="relative bg-white py-32 overflow-hidden">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                
                {/* Content */}
                <div className="relative">
                  {/* Section Label */}
                  <div className="flex items-center mb-8">
                    <div className="w-16 h-px bg-gray-300 mr-4"></div>
                    <span className={`${geistMono.className} text-sm tracking-widest text-gray-500 uppercase`}>
                      Our Philosophy
                    </span>
                  </div>

                  <h2 className={`${playfair.className} text-4xl lg:text-5xl text-gray-900 font-light mb-8 leading-tight`}>
                    Where Vision Meets
                    <span className="italic block text-gold">Precision</span>
                  </h2>

                  {/* Philosophy Points */}
                  <div className="space-y-8">
                    {philosophyPoints.map((point, index) => (
                      <div key={index} className="group">
                        <div className="flex items-start mb-3">
                          <div className="w-3 h-3 bg-gold mt-2 mr-4 transform group-hover:scale-125 transition-transform duration-300"></div>
                          <h3 className={`${playfair.className} text-xl text-gray-900 font-medium`}>
                            {point.title}
                          </h3>
                        </div>
                        <p className={`${geist.className} text-gray-600 leading-relaxed ml-7`}>
                          {point.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Philosophy Image */}
                <div className="relative">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src="/image.jpg"
                      alt="CHRONARA Design Philosophy"
                      fill
                      className="object-cover transition-all duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 w-full h-full border-2 border-gold/20 -z-10"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section ref={teamRef} className="relative bg-[#FAF9F5] py-32">
            <div className="container mx-auto px-6">
              {/* Section Header */}
              <div className="text-center mb-20">
                <div className="flex items-center justify-center mb-8">
                  <div className="w-16 h-px bg-gray-300 mr-4"></div>
                  <span className={`${geistMono.className} text-sm tracking-widest text-gray-500 uppercase`}>
                    Our Team
                  </span>
                  <div className="w-16 h-px bg-gray-300 ml-4"></div>
                </div>
                
                <h2 className={`${playfair.className} text-4xl lg:text-5xl text-gray-900 font-light mb-6`}>
                  The Visionaries Behind
                  <span className="italic block text-gold">Every Masterpiece</span>
                </h2>
                
                <p className={`${geist.className} text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed`}>
                  Meet the passionate designers, architects, and craftsmen who bring our clients&apos; dreams to life with unparalleled expertise and dedication.
                </p>
              </div>

              {/* Team Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {teamMembers.map((member, index) => (
                  <div key={index} className="group text-center">
                    <div className="relative mb-6 overflow-hidden">
                      <div className="relative aspect-[3/4]">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                    
                    <h3 className={`${playfair.className} text-2xl text-gray-900 mb-2`}>
                      {member.name}
                    </h3>
                    
                    <div className={`${geistMono.className} text-sm text-gold uppercase tracking-widest mb-4`}>
                      {member.role}
                    </div>
                    
                    <p className={`${geist.className} text-gray-600 leading-relaxed`}>
                      {member.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section ref={processRef} className="relative bg-white py-32">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                
                {/* Process Steps */}
                <div className="relative">
                  {/* Section Label */}
                  <div className="flex items-center mb-12">
                    <div className="w-16 h-px bg-gray-300 mr-4"></div>
                    <span className={`${geistMono.className} text-sm tracking-widest text-gray-500 uppercase`}>
                      Our Process
                    </span>
                  </div>

                  <h2 className={`${playfair.className} text-4xl lg:text-5xl text-gray-900 font-light mb-12 leading-tight`}>
                    The Art of
                    <span className="italic block text-gold">Perfection</span>
                  </h2>

                  <div className="space-y-12">
                    {processSteps.map((process, index) => (
                      <div key={index} className="flex group">
                        <div className="flex-shrink-0 mr-6">
                          <div className="w-12 h-12 border border-gold flex items-center justify-center group-hover:bg-gold transition-all duration-300">
                            <span className={`${geistMono.className} text-sm text-gold group-hover:text-white`}>
                              {process.step}
                            </span>
                          </div>
                        </div>
                        <div>
                          <h3 className={`${playfair.className} text-xl text-gray-900 mb-3`}>
                            {process.title}
                          </h3>
                          <p className={`${geist.className} text-gray-600 leading-relaxed`}>
                            {process.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Process Image */}
                <div className="relative">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src="/image1.jpg"
                      alt="CHRONARA Design Process"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -top-8 -right-8 w-32 h-32 border-2 border-gold/30">
                    <div className="absolute inset-0 border border-gold/20 m-4"></div>
                  </div>
                  <div className="absolute -bottom-6 -left-6 w-24 h-24 border border-gold/20"></div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative bg-[#1a1a1a] py-24 text-center">
            <div className="container mx-auto px-6">
              <h2 className={`${playfair.className} text-4xl lg:text-5xl text-white font-light mb-8`}>
                Ready to Begin Your
                <span className="italic block text-gold">Design Journey?</span>
              </h2>
              
              <p className={`${geist.className} text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed`}>
                Let&apos;s collaborate to create a space that reflects your unique story and elevates your everyday living experience.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group relative bg-gold text-white px-16 py-5 font-light tracking-widest text-sm uppercase transition-all duration-500 hover:bg-white hover:text-gray-900 border border-gold overflow-hidden">
                  <span className="relative z-10">Schedule Consultation</span>
                  <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </button>
                
                <button className="group relative bg-transparent text-white px-16 py-5 font-light tracking-widest text-sm uppercase transition-all duration-500 hover:bg-gold border border-white overflow-hidden">
                  <span className="relative z-10">View Portfolio</span>
                  <div className="absolute inset-0 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AboutPage;