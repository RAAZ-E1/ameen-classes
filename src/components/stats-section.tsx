"use client";

import { motion } from "framer-motion";

export default function StatsSection() {
  const stats = [
    { number: "10+ Years", label: "Of Services", color: "text-blue-700" },
    { number: "100%", label: "Pass Rate", color: "text-green-700" },
    { number: "1000+", label: "Class Room Based Lectures", color: "text-purple-700" },
  ];

  return (
    <section className="bg-white">
      <div className="border-y border-blue-100 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-blue-100">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="text-center py-6"
              >
                <div className={`text-3xl sm:text-4xl font-extrabold ${stat.color} drop-shadow-md`}>{stat.number}</div>
                <div className="text-sm sm:text-base text-gray-700 font-semibold mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
