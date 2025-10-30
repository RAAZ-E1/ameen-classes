"use client";

import Link from "next/link";
import { Youtube, MessageCircle, Send, BookOpen, Facebook, Instagram } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-brand-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="sm:col-span-2 text-center sm:text-left">
            <Link href="/" className="inline-flex items-center space-x-3 group">
              <div className="bg-gradient-to-r from-blue-600 to-green-500 p-2.5 rounded-xl shadow-md">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl text-white">Ameen Classes</span>
            </Link>
            <p className="mt-4 text-gray-400 max-w-lg">
              Free learning resources, AI-powered mock tests, and premium courses for Class 10 and competitive exams.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Join Us</h4>
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                aria-label="Telegram"
                className="p-3 rounded-xl bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition-transform duration-300"
              >
                <Send className="h-6 w-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                aria-label="WhatsApp"
                className="p-3 rounded-xl bg-green-600/20 text-green-400 hover:bg-green-600/30 transition-transform duration-300"
              >
                <MessageCircle className="h-6 w-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                aria-label="YouTube"
                className="p-3 rounded-xl bg-red-600/20 text-red-400 hover:bg-red-600/30 transition-transform duration-300"
              >
                <Youtube className="h-6 w-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                aria-label="Facebook"
                className="p-3 rounded-xl bg-blue-700/20 text-blue-500 hover:bg-blue-700/30 transition-transform duration-300"
              >
                <Facebook className="h-6 w-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="#"
                aria-label="Instagram"
                className="p-3 rounded-xl bg-pink-600/20 text-pink-400 hover:bg-pink-600/30 transition-transform duration-300"
              >
                <Instagram className="h-6 w-6" />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-sm text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-center sm:text-left"> {new Date().getFullYear()} Ameen Classes. All rights reserved.</p>
          <p className="opacity-80">Built with  for students.</p>
        </div>
      </div>
    </footer>
  );
}
