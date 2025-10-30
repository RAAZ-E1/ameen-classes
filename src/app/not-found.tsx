'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-10 animate-spin" style={{ animationDuration: '20s' }}></div>
      </div>

      <div className={`text-center z-10 max-w-2xl mx-auto px-6 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* 404 Number with animation */}
        <div className="relative mb-8 animate-float">
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-glow">
            404
          </h1>
          <div className="absolute inset-0 text-8xl md:text-9xl font-bold text-gray-200 -z-10 blur-sm">
            404
          </div>
        </div>

        {/* Main heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Looks like you&apos;ve ventured into uncharted territory! The page you&apos;re looking for might have been moved, deleted, or never existed.
        </p>

        {/* Quick navigation options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-slide-in-up">
          <Link href="/" className="group">
            <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="text-blue-600 mb-2">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">Home</h3>
              <p className="text-sm text-gray-500">Back to main page</p>
            </div>
          </Link>

          <Link href="/mock-tests" className="group">
            <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="text-purple-600 mb-2">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">Mock Tests</h3>
              <p className="text-sm text-gray-500">Practice exams</p>
            </div>
          </Link>

          <Link href="/free-learning" className="group">
            <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="text-green-600 mb-2">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 group-hover:text-green-600 transition-colors">Free Learning</h3>
              <p className="text-sm text-gray-500">Study materials</p>
            </div>
          </Link>
        </div>

        {/* Search suggestion */}
        <div className="mb-8">
          <p className="text-gray-600 mb-4">Looking for something specific? Try these popular pages:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link href="/mock-tests" className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200 transition-colors">
              NEET Mock Tests
            </Link>
            <Link href="/mock-tests" className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm hover:bg-purple-200 transition-colors">
              JEE Mock Tests
            </Link>
            <Link href="/free-learning" className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200 transition-colors">
              Study Materials
            </Link>
            <Link href="/premium" className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm hover:bg-orange-200 transition-colors">
              Premium (Coming Soon)
            </Link>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go Home
            </Button>
          </Link>

          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => window.history.back()}
            className="px-8 py-3 rounded-full border-2 hover:bg-gray-50 transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </Button>
        </div>

        {/* Fun fact or tip */}
        <div className="mt-12 p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-center mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Did you know?</h3>
          <p className="text-gray-600">
            While you&apos;re here, why not check out our mock tests? They&apos;re designed to help you ace your NEET and JEE exams with confidence!
          </p>
          
          {/* Easter egg - click counter */}
          <div className="mt-4 text-center">
            <button 
              onClick={() => {
                const messages = [
                  "🎯 Keep exploring!",
                  "📚 Learning never stops!",
                  "🚀 You're persistent!",
                  "🌟 That's the spirit!",
                  "🎉 You found the easter egg!"
                ];
                const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                alert(randomMessage);
              }}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              🥚 Click me for a surprise!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}