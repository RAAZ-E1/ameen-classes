"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Mohammad Zafeer",
      grade: "Class 10 - 97%",
      content: "The mock tests and analysis were super helpful. I knew exactly where to improve and focus my studies.",
      achievement: "State Topper",
      color: "bg-yellow-500",
    },
    {
      name: "Umaima Firdous", 
      grade: "NEET Qualified - AIR 1,247",
      content: "Clear explanations and structured content. The platform kept me consistent throughout my preparation.",
      achievement: "NEET Qualified",
      color: "bg-green-500",
    },
    {
      name: "Mohammad Faizan",
      grade: "JEE Main - 99.2%ile", 
      content: "Loved the progress dashboard. Small wins every week kept me motivated and on track.",
      achievement: "JEE Qualified",
      color: "bg-blue-500",
    },
    {
      name: "Ayesha Khan",
      grade: "CLAT - AIR 156",
      content: "The faculty guidance and personalized study plans made all the difference in my preparation.",
      achievement: "CLAT Qualified",
      color: "bg-purple-500",
    },
    {
      name: "Arman Sheikh",
      grade: "Class 12 - 96.8%",
      content: "Amazing teaching methodology and doubt clearing sessions. Highly recommend to all students.",
      achievement: "Board Topper",
      color: "bg-red-500",
    },
    {
      name: "Fatima Begum",
      grade: "NEET - AIR 892", 
      content: "The comprehensive study material and regular assessments helped me achieve my dream score.",
      achievement: "NEET Qualified",
      color: "bg-teal-500",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Duplicate testimonials for infinite scroll
  const extendedTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentIndex >= testimonials.length) {
      // When we reach the end of the original array, reset to beginning without transition
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
        setTimeout(() => {
          setIsTransitioning(true);
        }, 50);
      }, 500); // Wait for transition to complete
    }
  }, [currentIndex, testimonials.length]);



  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real students, real results from Ameen Classes
          </p>
        </div>

        {/* Slideshow Container */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {extendedTestimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="max-w-4xl mx-auto">
                    <Card className="bg-white shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-8 text-center">
                        {/* Achievement Badge */}
                        <div className="flex justify-center mb-6">
                          <span className={`${testimonial.color} text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg`}>
                            🏆 {testimonial.achievement}
                          </span>
                        </div>

                        {/* Stars */}
                        <div className="flex justify-center mb-6">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400 mx-1" />
                          ))}
                        </div>

                        {/* Quote */}
                        <p className="text-xl text-gray-700 mb-8 italic leading-relaxed">
                          &ldquo;{testimonial.content}&rdquo;
                        </p>

                        {/* Student Info */}
                        <div className="border-t pt-6">
                          <p className="text-xl font-bold text-gray-900 mb-2">{testimonial.name}</p>
                          <p className="text-lg text-blue-600 font-semibold">{testimonial.grade}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  index === (currentIndex % testimonials.length) ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
