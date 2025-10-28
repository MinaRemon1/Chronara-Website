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

interface FormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
}

const ContactPage: NextPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: ''
  });

  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
    
    // Show success message
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
    <>
      <Head>
        <title>Contact | CHRONARA Luxury Interior Design</title>
        <meta name="description" content="Get in touch with CHRONARA to start your luxury interior design journey. Schedule a consultation for bespoke design services." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={`${playfair.variable} ${geistMono.variable} ${geist.variable}`}>
        {/* Fixed Hero Section */}
        <div className="fixed top-0 left-0 w-full h-screen z-0">
          <div className="absolute inset-0">
            <Image
              src="/image.jpg"
              alt="CHRONARA Contact - Luxury Interior Design"
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
                    Get In Touch
                  </span>
                </div>
                
                <h1 className={`${playfair.className} text-5xl md:text-6xl lg:text-7xl text-white font-light mb-6 leading-tight`}>
                  Start Your
                  <span className="italic block text-gold">Journey</span>
                </h1>
                
                {/* <p className={`${geist.className} text-lg md:text-xl text-white/80 max-w-xl leading-relaxed font-light`}>
                  Ready to transform your space? Let&apos;s begin the conversation about your vision and create something extraordinary together.
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
    </>
  );
};

export default ContactPage;