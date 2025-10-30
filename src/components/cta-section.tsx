'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CTASection() {
    return (
        <section className="py-20 bg-brand-50 text-gray-900 relative overflow-hidden">
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 tracking-tight text-brand-800">
                        Ready to Start Your Success Journey?
                    </h2>

                    <p className="text-lg sm:text-xl mb-8 max-w-3xl mx-auto opacity-90 leading-relaxed">
                        Join Thousands of students who are already improving their grades with our free resources.
                        Start today and see the difference!
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/free-learning">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    size="lg"
                                    className="w-full sm:w-auto bg-brand-700 text-white hover:bg-brand-800 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <Play className="mr-2 h-5 w-5" />
                                    Start Free Learning
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </motion.div>
                        </Link>

                        <Link href="/mock-tests">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="w-full sm:w-auto bg-white/90 border-brand-200 text-brand-700 hover:bg-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
                                >
                                    <Target className="mr-2 h-5 w-5" />
                                    Take Mock Test
                                </Button>
                            </motion.div>
                        </Link>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                        className="mt-8 text-sm text-gray-600"
                    >
                        🎯 No credit card required • 📚 Access Free lectures • 🚀 Start in 30 seconds
                    </motion.div>
                </motion.div>
            </div>

            {/* Background decoration */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10">
                <div className="w-80 h-80 rounded-full bg-white"></div>
            </div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 opacity-10">
                <div className="w-60 h-60 rounded-full bg-white"></div>
            </div>
        </section>
    );
}