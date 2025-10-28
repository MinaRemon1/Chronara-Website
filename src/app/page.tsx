"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Playfair_Display, Geist, Geist_Mono } from 'next/font/google';
import PortfolioSection from "@/components/PortfolioSection";
import Fields from "@/components/fields";

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
  const [activeProject, setActiveProject] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isInPortfolio, setIsInPortfolio] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const projectContainerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);
  const portfolioTopRef = useRef(0);

  const portfolioProjects = [
    {
      title: "Skyline Penthouse",
      location: "New York, NY",
      date: "2024",
      images: ["/image.jpg", "/image1.jpg", "/image2.jpg"]
    },
    {
      title: "Coastal Retreat",
      location: "Malibu, CA",
      date: "2023",
      images: ["/image.jpg", "/image1.jpg", "/image2.jpg"]
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Basic scroll detection for background changes
      setIsScrolled(currentScrollY > 50);

      // Navbar hide/show logic
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }

      // Portfolio section detection
      if (portfolioRef.current) {
        const portfolioTop = portfolioRef.current.offsetTop;
        portfolioTopRef.current = portfolioTop;
        const viewportHeight = window.innerHeight;
        const isNowInPortfolio = currentScrollY >= portfolioTop - viewportHeight / 2;
        
        if (isNowInPortfolio !== isInPortfolio) {
          setIsInPortfolio(isNowInPortfolio);
          
          if (isNowInPortfolio && !isScrolling.current) {
            // Snap to first project when entering portfolio
            isScrolling.current = true;
            window.scrollTo({
              top: portfolioTop,
              behavior: 'smooth'
            });
            setTimeout(() => {
              isScrolling.current = false;
            }, 500);
          }
        }
      }

      setLastScrollY(currentScrollY);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    setIsLoaded(true);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isInPortfolio]);

  // Handle wheel events for portfolio section
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isInPortfolio || isScrolling.current) return;

      e.preventDefault();
      isScrolling.current = true;

      if (e.deltaY > 0) {
        // Scrolling down
        const currentProjectImages = portfolioProjects[activeProject].images.length;
        
        if (activeImageIndex < currentProjectImages - 1) {
          // Move to next image in current project
          setActiveImageIndex(prev => prev + 1);
          setTimeout(() => {
            isScrolling.current = false;
          }, 300);
        } else {
          // Move to next project
          if (activeProject < portfolioProjects.length - 1) {
            setActiveProject(prev => prev + 1);
            setActiveImageIndex(0);
            
            // Snap scroll to next project
            const nextProjectTop = portfolioTopRef.current + ((activeProject + 1) * window.innerHeight);
            window.scrollTo({
              top: nextProjectTop,
              behavior: 'smooth'
            });
            
            setTimeout(() => {
              isScrolling.current = false;
            }, 600);
          } else {
            // Last project, allow normal scroll
            isScrolling.current = false;
          }
        }
      } else {
        // Scrolling up
        if (activeImageIndex > 0) {
          // Move to previous image in current project
          setActiveImageIndex(prev => prev - 1);
          setTimeout(() => {
            isScrolling.current = false;
          }, 300);
        } else {
          // Move to previous project
          if (activeProject > 0) {
            setActiveProject(prev => prev - 1);
            const prevProjectImages = portfolioProjects[activeProject - 1].images.length;
            setActiveImageIndex(prevProjectImages - 1);
            
            // Snap scroll to previous project
            const prevProjectTop = portfolioTopRef.current + ((activeProject - 1) * window.innerHeight);
            window.scrollTo({
              top: prevProjectTop,
              behavior: 'smooth'
            });
            
            setTimeout(() => {
              isScrolling.current = false;
            }, 600);
          } else {
            // First project, exit portfolio mode
            setIsInPortfolio(false);
            isScrolling.current = false;
          }
        }
      }
    };

    if (isInPortfolio) {
      window.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [isInPortfolio, activeProject, activeImageIndex, portfolioProjects]);

  // Force scroll to active project when in portfolio mode
  useEffect(() => {
    if (isInPortfolio && !isScrolling.current) {
      const projectTop = portfolioTopRef.current + (activeProject * window.innerHeight);
      const currentScroll = window.scrollY;
      
      // If we're not at the correct project position, snap to it
      if (Math.abs(currentScroll - projectTop) > 50) {
        isScrolling.current = true;
        window.scrollTo({
          top: projectTop,
          behavior: 'smooth'
        });
        setTimeout(() => {
          isScrolling.current = false;
        }, 500);
      }
    }
  }, [isInPortfolio, activeProject]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: '',
      budget: '',
      message: ''
    });
    setIsSubmitting(false);
    
    // Show success message (you can replace this with a toast notification)
    alert('Thank you for your inquiry. We will contact you shortly.');
  };

  const socialLinks = [
    { name: 'Instagram', url: '#', icon: '📱' },
    { name: 'Pinterest', url: '#', icon: '📌' },
    { name: 'Houzz', url: '#', icon: '🏠' },
    { name: 'LinkedIn', url: '#', icon: '💼' }
  ];

  const footerLinks = [
    { name: 'Portfolio', url: '/portfolio' },
    { name: 'Services', url: '/services' },
    { name: 'About', url: '/about' },
    { name: 'Journal', url: '/journal' },
    { name: 'Contact', url: '/contact' }
  ];

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
                <span className="italic text-gold">Timeless</span>
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
          className="relative bg-[#F5F4EB] py-24 lg:py-32 overflow-hidden"
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
                <button className="group relative bg-gold text-white px-12 py-4 font-light tracking-widest text-sm uppercase transition-all duration-500 hover:bg-transparent hover:text-gray-900 border border-gold overflow-hidden">
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

        {/* Portfolio Section */}
        <PortfolioSection/>

        {/* Fields Section */}
        <div className="relative bg-[#F5F4EB] -mt-6 pt-30 pb-30">
          <div className="flex items-center mb-12 ml-32">
                  <div className="w-16 h-px bg-gray-300 mr-4"></div>
                  <span className={`${geistMono.className} text-sm tracking-widest text-gray-500 uppercase`}>
                    Services
                  </span>
                </div>
          <Fields/>
        </div>

        {/* Contact Form Section */}
        <section ref={contactRef} className="relative bg-[#F5F4EB] py-20 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
              
              {/* Contact Information */}
              <div className="relative">
                {/* Section Label */}
                <div className="flex items-center mb-8">
                  <div className="w-16 h-px bg-gray-300 mr-4"></div>
                  <span className={`${geistMono.className} text-sm tracking-widest text-gray-500 uppercase`}>
                    Get In Touch
                  </span>
                </div>

                <h2 className={`${playfair.className} text-4xl lg:text-5xl text-gray-900 font-light mb-8 leading-tight`}>
                  Start Your
                  <span className="italic block text-gold">Design Journey</span>
                </h2>

                <p className={`${geist.className} text-lg text-gray-600 mb-12 leading-relaxed`}>
                  Ready to transform your space into a timeless sanctuary? Share your vision with us, 
                  and let&apos;s create something extraordinary together.
                </p>

                {/* Contact Details */}
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center mr-4">
                      <span className="text-gold text-lg">✉️</span>
                    </div>
                    <div>
                      <p className={`${geistMono.className} text-xs text-gray-500 uppercase tracking-widest`}>Email</p>
                      <p className={`${geist.className} text-gray-900`}>hello@chronara.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center mr-4">
                      <span className="text-gold text-lg">📞</span>
                    </div>
                    <div>
                      <p className={`${geistMono.className} text-xs text-gray-500 uppercase tracking-widest`}>Phone</p>
                      <p className={`${geist.className} text-gray-900`}>+1 (555) 123-4567</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center mr-4">
                      <span className="text-gold text-lg">📍</span>
                    </div>
                    <div>
                      <p className={`${geistMono.className} text-xs text-gray-500 uppercase tracking-widest`}>Studio</p>
                      <p className={`${geist.className} text-gray-900`}>123 Design District<br />New York, NY 10001</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="relative">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className={`${geistMono.className} text-xs text-gray-500 uppercase tracking-widest block mb-3`}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 text-black py-3 border border-gray-300 bg-transparent focus:border-gold focus:outline-none transition-all duration-300 font-light"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className={`${geistMono.className} text-xs text-gray-500 uppercase tracking-widest block mb-3`}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full text-black px-4 py-3 border border-gray-300 bg-transparent focus:border-gold focus:outline-none transition-all duration-300 font-light"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className={`${geistMono.className} text-xs text-gray-500 uppercase tracking-widest block mb-3`}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full text-black px-4 py-3 border border-gray-300 bg-transparent focus:border-gold focus:outline-none transition-all duration-300 font-light"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="projectType" className={`${geistMono.className} text-xs text-gray-500 uppercase tracking-widest block mb-3`}>
                        Project Type
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full text-black px-4 py-3 border border-gray-300 bg-transparent focus:border-gold focus:outline-none transition-all duration-300 font-light"
                      >
                        <option value="">Select project type</option>
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="hospitality">Hospitality</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="budget" className={`${geistMono.className} text-xs text-gray-500 uppercase tracking-widest block mb-3`}>
                      Estimated Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full text-black px-4 py-3 border border-gray-300 bg-transparent focus:border-gold focus:outline-none transition-all duration-300 font-light"
                    >
                      <option value="">Select budget range</option>
                      <option value="50-100k">$50,000 - $100,000</option>
                      <option value="100-250k">$100,000 - $250,000</option>
                      <option value="250-500k">$250,000 - $500,000</option>
                      <option value="500k+">$500,000+</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className={`${geistMono.className} text-xs text-gray-500 uppercase tracking-widest block mb-3`}>
                      Project Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full text-black px-4 py-3 border border-gray-300 bg-transparent focus:border-gold focus:outline-none transition-all duration-300 font-light resize-none"
                      placeholder="Tell us about your project vision, requirements, and any specific ideas you have in mind..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative bg-gold text-white px-12 py-4 font-light tracking-widest text-sm uppercase transition-all duration-500 hover:bg-transparent hover:text-gray-900 border border-gold overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10">
                      {isSubmitting ? 'Sending...' : 'Begin Collaboration'}
                    </span>
                    <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative bg-[#1a1a1a] py-20 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              
              {/* Brand Column */}
              <div className="lg:col-span-1">
                <Image 
                  src='/logo3.png'
                  width="160"
                  height="160"
                  alt="CHRONARA Logo"
                  className="mb-6 filter brightness-0 invert"
                />
                <p className={`${geist.className} text-gray-400 mb-8 leading-relaxed max-w-md`}>
                  Crafting timeless spaces where artistry meets architecture, creating 
                  extraordinary interiors that tell your unique story.
                </p>
                
                {/* Social Links */}
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className="w-10 h-10 border border-gray-600 text-gray-400 flex items-center justify-center transition-all duration-300 hover:border-gold hover:text-gold hover:scale-110"
                      aria-label={social.name}
                    >
                      <span className="text-lg">{social.icon}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className={`${playfair.className} text-white text-lg font-light mb-6`}>Explore</h3>
                <ul className="space-y-3">
                  {footerLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.url}
                        className={`${geist.className} text-gray-400 hover:text-gold transition-all duration-300 font-light tracking-wide`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h3 className={`${playfair.className} text-white text-lg font-light mb-6`}>Services</h3>
                <ul className="space-y-3">
                  {[
                    'Interior Design',
                    'Architectural Planning',
                    'Custom Furniture',
                    'Space Planning',
                    'Lighting Design',
                    'Art Curation'
                  ].map((service, index) => (
                    <li key={index}>
                      <span className={`${geist.className} text-gray-400 font-light tracking-wide`}>
                        {service}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className={`${playfair.className} text-white text-lg font-light mb-6`}>Contact</h3>
                <div className="space-y-4">
                  <div>
                    <p className={`${geistMono.className} text-xs text-gray-500 uppercase tracking-widest mb-1`}>Studio</p>
                    <p className={`${geist.className} text-gray-400`}>123 Design District<br />New York, NY 10001</p>
                  </div>
                  <div>
                    <p className={`${geistMono.className} text-xs text-gray-500 uppercase tracking-widest mb-1`}>Email</p>
                    <p className={`${geist.className} text-gray-400`}>hello@chronara.com</p>
                  </div>
                  <div>
                    <p className={`${geistMono.className} text-xs text-gray-500 uppercase tracking-widest mb-1`}>Phone</p>
                    <p className={`${geist.className} text-gray-400`}>+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className={`${geist.className} text-gray-500 text-sm mb-4 md:mb-0`}>
                  © 2024 CHRONARA. All rights reserved.
                </p>
                <div className="flex space-x-6">
                  <Link href="/privacy" className={`${geist.className} text-gray-500 hover:text-gold text-sm transition-colors duration-300`}>
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className={`${geist.className} text-gray-500 hover:text-gold text-sm transition-colors duration-300`}>
                    Terms of Service
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-black/20 -z-10"></div>
        </footer>
      </div>
    </div>
  );
}