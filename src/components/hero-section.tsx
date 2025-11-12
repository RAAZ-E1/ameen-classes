"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from 'react';
import Image from 'next/image';

// Slideshow Component
export function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    '/slideshow/S1.png',
    '/slideshow/S2.png',
    '/slideshow/S3.png',
    '/slideshow/S4.png',
    '/slideshow/S5.png'
  ];

  // Auto-advance slides every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full aspect-square group">
      {/* Main display container */}
      <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
        {/* Slides */}
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            >
              <Image
                src={slide}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 p-2.5 rounded-full shadow-xl transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 focus:opacity-100 z-30"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 p-2.5 rounded-full shadow-xl transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 focus:opacity-100 z-30"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
      `}</style>
      <section className="relative bg-gradient-to-b from-brand-50 to-white py-14 sm:py-20 md:py-24 lg:py-28">
        <div className="pointer-events-none absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-gradient-to-br from-brand-100 to-brand-200 blur-3xl opacity-70" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4 max-w-4xl mx-auto lg:mx-0">
                {/* Minimal tag removed for cleaner first impression */}

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center lg:text-left"
                >
                  {/* Tagline sentences with Montserrat - smaller and closer together */}
                  <div
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 leading-tight mb-0"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
                    >
                      Nurturing Excellence.
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 }}
                      className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent whitespace-nowrap"
                    >
                      Delivering Performance.
                    </motion.div>
                  </div>

                  {/* Brand name with Acumin Pro Bold - bigger and more prominent */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-brand-700 to-green-500 bg-clip-text text-transparent"
                    style={{
                      fontFamily: 'Acumin Pro, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                      fontWeight: 700,
                      letterSpacing: '-0.02em'
                    }}
                  >
                    Ameen Classes
                  </motion.div>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg sm:text-xl text-gray-600 leading-relaxed text-center lg:text-left"
                >
                  NEET • JEE • CLAT • Foundation (Class 7-12)
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-2 pt-1 justify-center lg:justify-start"
                >
                  {[
                    { name: 'NEET', href: '/premium#neet' },
                    { name: 'JEE', href: '/premium#jee' },
                    { name: 'CLAT', href: '/premium#clat' },
                    { name: 'Class 10 Foundation', href: '/class-10-foundation' }
                  ].map((course) => (
                    <Link
                      key={course.name}
                      href={course.href}
                      className="inline-flex items-center rounded-full border border-brand-200 bg-white/70 px-3 py-1 text-xs font-medium text-brand-700 hover:bg-brand-50 hover:border-brand-300 transition-all duration-200 cursor-pointer transform hover:scale-105"
                    >
                      {course.name}
                    </Link>
                  ))}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row items-stretch justify-center lg:justify-start gap-2 sm:gap-3 max-w-md mx-auto lg:mx-0"
              >
                <Link href="/premium" className="flex-1">
                  <Button
                    size="default"
                    className="w-full text-sm sm:text-base px-4 py-3 sm:py-2 bg-brand-700 hover:bg-brand-900 text-white rounded-lg shadow-lg transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-50"
                  >
                    Explore Courses
                  </Button>
                </Link>
                <Link href="/mock-tests" className="flex-1">
                  <Button
                    size="default"
                    className="w-full text-sm sm:text-base px-4 py-3 sm:py-2 bg-brand-700 hover:bg-brand-800 text-white rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Take a mock test
                  </Button>
                </Link>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-5 text-sm text-gray-600 text-center lg:text-left max-w-md mx-auto lg:mx-0"
              >
                Small focused batches • AI-powered mock tests • Progress tracking
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hidden lg:block"
            >
              <div className="max-w-sm mx-auto">
                <Slideshow />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
