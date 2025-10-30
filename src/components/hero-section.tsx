"use client";

import { Button } from "@/components/ui/button";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
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
            <div className="space-y-4 max-w-2xl mx-auto lg:mx-0">
              {/* Minimal tag removed for cleaner first impression */}

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter text-gray-900 leading-tight text-center lg:text-left"
              >
                Learn better. Score higher.
                <span className="bg-gradient-to-r from-brand-700 to-green-500 bg-clip-text text-transparent">
                  {" "}
                  Ameen Classes
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg sm:text-xl text-gray-600 leading-relaxed text-center lg:text-left"
              >
                NEET • JEE • CLAT • Class 10 Foundation  
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
            <div className="relative mx-auto h-56 w-56">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-100 to-brand-200" />
              <div className="absolute -inset-3 rounded-3xl border border-brand-100/60" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
