"use client";

import { Instagram, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const updates = [
  {
    title: 'NEET 2025 Registration Opens',
    link: '/blog'
  },
  {
    title: 'New Physics Lectures Added',
    link: '/premium'
  },
  {
    title: 'Mock Test Series Launch',
    link: '/mock-tests'
  }
];

export default function LatestUpdatesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Latest Updates */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Updates</h2>
            
            <div className="space-y-3">
              {updates.map((update, index) => (
                <Link
                  key={index}
                  href={update.link}
                  className="block p-4 rounded-lg border border-gray-200 hover:border-brand-300 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 group-hover:text-brand-600">
                      {update.title}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-brand-600" />
                  </div>
                </Link>
              ))}
            </div>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 mt-4 text-brand-600 hover:text-brand-700 font-medium"
            >
              View All Updates
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>

          {/* Instagram */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-4">
              <Instagram className="w-6 h-6 text-white" />
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Follow Us on Instagram
            </h3>
            
            <p className="text-gray-600 mb-4 text-sm">
              Daily study tips and updates
            </p>

            <a
              href="https://instagram.com/ameenclasses"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-6 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
            >
              Follow @ameenclasses
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}