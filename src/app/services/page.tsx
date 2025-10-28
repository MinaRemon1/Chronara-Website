"use client";

import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
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

interface Service {
  title: string;
  description: string;
  features: string[];
  image: string;
  duration: string;
  startingPrice: string;
}

const ServicesPage: NextPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const services: Service[] = [
    {
      title: "Full-Service Interior Design",
      description: "Comprehensive design solutions from concept to completion, creating cohesive and breathtaking spaces that reflect your unique style and lifestyle.",
      features: [
        "Comprehensive space planning",
        "Custom furniture design",
        "Material and finish selection",
        "Art and accessory curation",
        "Project management",
        "Final styling and installation"
      ],
      image: "/image1.jpg",
      duration: "4-8 months",
      startingPrice: "$50,000"
    },
    {
      title: "Architectural Planning",
      description: "Transform your space with architectural interventions that enhance flow, light, and functionality while maintaining structural integrity.",
      features: [
        "Architectural consultations",
        "Space reconfiguration",
        "Custom millwork design",
        "Lighting architecture",
        "Structural enhancements",
        "Building code compliance"
      ],
      image: "/image2.jpg",
      duration: "3-6 months",
      startingPrice: "$35,000"
    },
    {
      title: "Luxury Furniture Design",
      description: "Bespoke furniture pieces crafted by master artisans, designed exclusively for your space and manufactured to the highest standards.",
      features: [
        "Custom furniture design",
        "Material sourcing",
        "Artisan craftsmanship",
        "Quality assurance",
        "Worldwide shipping",
        "Installation services"
      ],
      image: "/image.jpg",
      duration: "2-4 months",
      startingPrice: "$25,000"
    },
    {
      title: "Lighting Design",
      description: "Create atmospheric environments with carefully curated lighting schemes that enhance architecture and evoke desired emotions.",
      features: [
        "Lighting strategy development",
        "Custom fixture design",
        "Smart home integration",
        "Energy efficiency planning",
        "Ambient lighting design",
        "Technical installation"
      ],
      image: "/image1.jpg",
      duration: "1-3 months",
      startingPrice: "$15,000"
    }
  ];

  return (
    <>
      <Head>
        <title>Services | CHRONARA Luxury Interior Design</title>
        <meta name="description" content="Discover our comprehensive luxury interior design services - from full-service design to custom furniture and architectural planning." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={`${playfair.variable} ${geistMono.variable} ${geist.variable}`}>
        {/* Fixed Hero Section */}
        <div className="fixed top-0 left-0 w-full h-screen z-0">
          <div className="absolute inset-0">
            <Image
              src="/image.jpg"
              alt="CHRONARA Luxury Interior Design Services"
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
                    Our Expertise
                  </span>
                </div>
                
                <h1 className={`${playfair.className} text-5xl md:text-6xl lg:text-7xl text-white font-light mb-6 leading-tight`}>
                  Services
                  {/* <span className="italic block text-gold">Services</span> */}
                </h1>
                
                {/* <p className={`${geist.className} text-lg md:text-xl text-white/80 max-w-xl leading-relaxed font-light`}>
                  Comprehensive luxury design services tailored to create extraordinary spaces that reflect your vision and elevate your lifestyle.
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
          {/* Services Overview Section */}
          <section className="relative bg-[#F5F4EB] py-32 overflow-hidden">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                
                {/* Content */}
                <div className="relative">
                  {/* Section Label */}
                  <div className="flex items-center mb-8">
                    <div className="w-16 h-px bg-gray-300 mr-4"></div>
                    <span className={`${geistMono.className} text-sm tracking-widest text-gray-500 uppercase`}>
                      Our Approach
                    </span>
                  </div>

                  <h2 className={`${playfair.className} text-4xl lg:text-5xl text-gray-900 font-light mb-8 leading-tight`}>
                    Tailored
                    <span className="italic block text-gold">Excellence</span>
                  </h2>

                  <div className="space-y-6 mb-8">
                    <p className={`${geist.className} text-lg text-gray-600 leading-relaxed`}>
                      At CHRONARA, we believe that exceptional design is not just about creating beautiful spaces, 
                      but about crafting environments that enhance your quality of life and reflect your unique story.
                    </p>
                    
                    <p className={`${geist.className} text-lg text-gray-600 leading-relaxed`}>
                      Our comprehensive services are designed to guide you through every step of the design journey, 
                      from initial concept to final installation, ensuring a seamless and extraordinary experience.
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-8 mb-12">
                    {[
                      { number: '98%', label: 'Client Satisfaction' },
                      { number: '250+', label: 'Projects Completed' },
                      { number: '15+', label: 'Design Awards' },
                      { number: '12+', label: 'Years Experience' }
                    ].map((stat, index) => (
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
                </div>

                {/* Overview Image */}
                <div className="relative">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src="/image2.jpg"
                      alt="CHRONARA Design Process"
                      fill
                      className="object-cover transition-all duration-700 hover:scale-105"
                    />
                  </div>
                  <div className="absolute -bottom-8 -right-8 w-2/3 aspect-square border-8 border-white shadow-2xl">
                    <Image
                      src="/image1.jpg"
                      alt="Design detail"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services Grid Section */}
          <section className="relative bg-white py-32">
            <div className="container mx-auto px-6">
              {/* Section Header */}
              <div className="text-center mb-20">
                <div className="flex items-center justify-center mb-8">
                  <div className="w-16 h-px bg-gray-300 mr-4"></div>
                  <span className={`${geistMono.className} text-sm tracking-widest text-gray-500 uppercase`}>
                    Our Services
                  </span>
                  <div className="w-16 h-px bg-gray-300 ml-4"></div>
                </div>
                
                <h2 className={`${playfair.className} text-4xl lg:text-5xl text-gray-900 font-light mb-6`}>
                  Comprehensive
                  <span className="italic block text-gold">Design Solutions</span>
                </h2>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {services.map((service, index) => (
                  <div 
                    key={index}
                    className="group cursor-pointer"
                    onMouseEnter={() => setActiveService(index)}
                  >
                    <div className="relative overflow-hidden mb-6">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover transition-all duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      
                      {/* Service Badge */}
                      <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2">
                        <div className={`${geistMono.className} text-xs text-gray-900 uppercase tracking-widest`}>
                          Starting at {service.startingPrice}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className={`${playfair.className} text-2xl text-gray-900 mb-4 group-hover:text-gold transition-colors duration-300`}>
                      {service.title}
                    </h3>
                    
                    <p className={`${geist.className} text-gray-600 mb-6 leading-relaxed`}>
                      {service.description}
                    </p>
                    
                    <div className="mb-6">
                      <div className={`${geistMono.className} text-xs text-gray-500 uppercase tracking-widest mb-3`}>
                        Duration: {service.duration}
                      </div>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-gold rounded-full mr-3"></div>
                            <span className={`${geist.className} text-gray-600 text-sm`}>
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <button className="group relative bg-transparent text-gray-900 px-8 py-3 font-light tracking-widest text-sm uppercase transition-all duration-500 hover:bg-gold hover:text-white border border-gray-900 overflow-hidden">
                      <span className="relative z-10">Learn More</span>
                      <div className="absolute inset-0 bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="relative bg-[#FAF9F5] py-32">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                
                {/* Process Image */}
                <div className="relative">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src="/image.jpg"
                      alt="CHRONARA Design Process"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -top-6 -left-6 w-full h-full border-2 border-gold/20 -z-10"></div>
                </div>

                {/* Process Content */}
                <div className="relative">
                  {/* Section Label */}
                  <div className="flex items-center mb-12">
                    <div className="w-16 h-px bg-gray-300 mr-4"></div>
                    <span className={`${geistMono.className} text-sm tracking-widest text-gray-500 uppercase`}>
                      Our Process
                    </span>
                  </div>

                  <h2 className={`${playfair.className} text-4xl lg:text-5xl text-gray-900 font-light mb-12 leading-tight`}>
                    The Journey to
                    <span className="italic block text-gold">Perfection</span>
                  </h2>

                  <div className="space-y-8">
                    {[
                      {
                        step: "01",
                        title: "Initial Consultation",
                        description: "We begin with an in-depth conversation to understand your vision, lifestyle, and aspirations for your space."
                      },
                      {
                        step: "02",
                        title: "Concept Development",
                        description: "Our team creates bespoke design concepts that blend your vision with our expertise and creative direction."
                      },
                      {
                        step: "03",
                        title: "Detailed Planning",
                        description: "Every element is meticulously planned, from custom furniture to lighting schemes and material selections."
                      },
                      {
                        step: "04",
                        title: "Execution & Installation",
                        description: "We bring the design to life with unparalleled attention to detail and quality craftsmanship."
                      }
                    ].map((process, index) => (
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
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative bg-[#1a1a1a] py-24 text-center">
            <div className="container mx-auto px-6">
              <h2 className={`${playfair.className} text-4xl lg:text-5xl text-white font-light mb-8`}>
                Ready to Transform
                <span className="italic block text-gold">Your Space?</span>
              </h2>
              
              <p className={`${geist.className} text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed`}>
                Let&apos;s discuss your project and explore how our design services can bring your vision to life with sophistication and grace.
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

export default ServicesPage;