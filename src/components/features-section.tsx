"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Target, BarChart, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  const features = [
    {
      icon: BookOpen,
      title: "Free Video Lectures",
      description:
        "Complete Class 10 coverage with concise, high-quality lessons.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Target,
      title: "AI-Powered Analysis",
      description: "Instant results with personalized performance insights.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: BarChart,
      title: "Track Progress",
      description: "Dashboard with scores and improvement over time.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Award,
      title: "Premium Courses",
      description: "Advanced NEET, JEE, and CLAT prep with expert faculty.",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Why Choose Ameen Classes?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We provide everything you need to excel in your studies, from free
            resources to premium coaching.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 group cursor-pointer border-0 bg-white rounded-2xl hover:scale-105">
                <CardHeader className="text-center pb-4">
                  <div
                    className={`bg-gradient-to-r ${feature.color} p-4 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg text-gray-900 group-hover:text-blue-600 transition-colors font-bold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
