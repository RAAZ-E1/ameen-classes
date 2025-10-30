"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, BookOpen } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isTransparent = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { href: "/premium", label: "Courses" },
    { href: "/mock-tests", label: "Mock Tests" },
    { href: "/faculty", label: "Faculty" },
    { href: "/blog", label: "Blog" },
    { href: "/about", label: "About Us" },
  ];

  return (
    <nav
      className={`${
        isTransparent
          ? "bg-transparent"
          : "bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm"
      } sticky top-0 z-50 transition-colors`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-700 shadow text-white">
              <BookOpen className="h-5 w-5" />
            </span>
            <span className="font-semibold text-lg text-gray-900">Ameen Classes</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded-lg text-sm text-gray-700 hover:text-brand-700 hover:bg-brand-50 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/auth"
              className="px-4 py-2 rounded-lg border border-brand-200 text-brand-700 hover:bg-brand-50 text-sm transition-colors"
            >
              Login
            </Link>
            <Link
              href="/auth"
              className="px-4 py-2 rounded-lg bg-brand-700 hover:bg-brand-800 text-white text-sm shadow transition-colors"
            >
              Sign Up Free
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6 text-gray-900" /> : <Menu className="h-6 w-6 text-gray-900" />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200"
            >
              <div className="py-2 space-y-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <Link
                      href={item.href}
                      className="block px-4 py-2 text-gray-700 hover:bg-brand-50 hover:text-brand-700 rounded-md transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="flex gap-2 px-4 pt-2">
                  <Link
                    href="/auth"
                    className="flex-1 text-center px-4 py-2 rounded-lg border text-brand-700 border-brand-200 hover:bg-brand-50 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth"
                    className="flex-1 text-center px-4 py-2 rounded-lg bg-brand-700 hover:bg-brand-800 text-white shadow transition-colors"
                  >
                    Sign Up Free
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
