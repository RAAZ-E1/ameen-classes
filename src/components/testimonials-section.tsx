"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Mohammad Zafeer",
      grade: "Class 10 - 97%",
      content:
        "The mock tests and analysis were super helpful. I knew exactly where to improve.",
      rating: 5,
    },
    {
      name: "Umaima Firdous",
      grade: "NEET Qualified",
      content:
        "Clear explanations and structured content. The platform kept me consistent.",
      rating: 5,
    },
    {
      name: "Mohammad Faizan",
      grade: "JEE Main - 99.2%ile",
      content:
        "Loved the progress dashboard. Small wins every week kept me motivated.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of successful students who achieved their dreams with
            Ameen Classes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white rounded-2xl hover:scale-105 group">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Quote className="h-6 w-6 text-purple-400 mr-2" />
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6 italic">
                    &quot;{testimonial.content}&quot;
                  </p>

                  <div className="border-t pt-4 flex items-center gap-3">
                    <Image
                      src={`https://api.dicebear.com/7.x/thumbs/png?seed=${encodeURIComponent(
                        testimonial.name
                      )}`}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full bg-purple-50"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-purple-600 font-medium">
                        {testimonial.grade}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
