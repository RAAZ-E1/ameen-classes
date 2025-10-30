'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Users, BookOpen, Target, Award, Zap, Clock, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PremiumPage() {
    const [selectedPlan, setSelectedPlan] = useState('neet');

    useEffect(() => {
        // Handle anchor links
        const hash = window.location.hash.replace('#', '');
        if (hash && ['neet', 'jee', 'clat'].includes(hash)) {
            setSelectedPlan(hash);
        }
    }, []);

    const courses = {
        neet: {
            title: 'NEET Preparation',
            subtitle: 'Complete Medical Entrance Preparation',
            icon: '🩺',
            color: 'from-green-500 to-emerald-500',
            price: '₹00',
            originalPrice: '₹00',
            duration: '1 Year',
            features: [
                'Complete NEET syllabus coverage (Physics, Chemistry, Biology)',
                '500+ recorded lectures by expert faculty',
                'Weekly live doubt clearing sessions',
                '50+ full-length mock tests with analysis',
                'Previous year question papers with solutions',
                'Study material and notes (PDF)',
                '24/7 doubt clearing support',
                'Performance tracking and analytics',
                'Mobile app access',
                'Certificate upon completion'
            ],
            highlights: [
                { icon: BookOpen, text: '500+ Video Lectures' },
                { icon: Target, text: '50+ Mock Tests' },
                { icon: Users, text: 'Expert Faculty' },
                { icon: Clock, text: '24/7 Support' }
            ]
        },
        jee: {
            title: 'JEE Preparation',
            subtitle: 'Complete Engineering Entrance Preparation',
            icon: '⚙️',
            color: 'from-blue-500 to-cyan-500',
            price: '₹00',
            originalPrice: '₹00',
            duration: '1 Year',
            features: [
                'Complete JEE Main & Advanced syllabus (Physics, Chemistry, Maths)',
                '600+ recorded lectures by IIT alumni',
                'Daily live classes and doubt sessions',
                '100+ mock tests including JEE pattern tests',
                'Chapter-wise practice tests',
                'Comprehensive study material',
                'Personal mentor assignment',
                'Performance analysis and improvement tips',
                'Mobile and tablet app access',
                'Success guarantee program'
            ],
            highlights: [
                { icon: BookOpen, text: '600+ Video Lectures' },
                { icon: Target, text: '100+ Mock Tests' },
                { icon: Award, text: 'IIT Alumni Faculty' },
                { icon: Users, text: 'Personal Mentor' }
            ]
        },
        clat: {
            title: 'CLAT Preparation',
            subtitle: 'Complete Law Entrance Preparation',
            icon: '⚖️',
            color: 'from-purple-500 to-pink-500',
            price: '₹00',
            originalPrice: '₹00',
            duration: '1 Year',
            features: [
                'Complete CLAT syllabus (English, GK, Legal Reasoning, Logical Reasoning, Maths)',
                '300+ recorded lectures by law experts',
                'Current affairs updates (daily)',
                '75+ sectional and full-length tests',
                'Legal reasoning case studies',
                'English comprehension practice',
                'Monthly performance review calls',
                'Study planner and time management',
                'Previous year papers analysis',
                'Interview preparation guidance'
            ],
            highlights: [
                { icon: BookOpen, text: '300+ Video Lectures' },
                { icon: Target, text: '75+ Mock Tests' },
                { icon: Zap, text: 'Daily Current Affairs' },
                { icon: Phone, text: 'Monthly Review Calls' }
            ]
        }
    };

    const testimonials = [
        {
            name: 'Arjun Patel',
            course: 'NEET',
            result: 'AIR 850 in NEET 2024',
            image: '/api/placeholder/64/64',
            quote: 'Ameen Classes helped me achieve my dream of becoming a doctor. The faculty is exceptional and the study material is comprehensive.'
        },
        {
            name: 'Priya Sharma',
            course: 'JEE',
            result: 'IIT Delhi CSE',
            image: '/api/placeholder/64/64',
            quote: 'The JEE preparation at Ameen Classes is top-notch. The mock tests and doubt clearing sessions were extremely helpful.'
        },
        {
            name: 'Rohit Kumar',
            course: 'CLAT',
            result: 'NLU Delhi',
            image: '/api/placeholder/64/64',
            quote: 'Got into my dream law school with help from Ameen Classes. The current affairs updates and legal reasoning practice were amazing.'
        }
    ];

    const freeVsPremium = [
        { feature: 'Class 10 Video Lectures', free: true, premium: true },
        { feature: 'Basic Mock Tests', free: true, premium: true },
        { feature: 'Performance Analysis', free: 'Basic', premium: 'Advanced' },
        { feature: 'NEET/JEE/CLAT Content', free: false, premium: true },
        { feature: 'Live Doubt Sessions', free: false, premium: true },
        { feature: 'Personal Mentor', free: false, premium: true },
        { feature: 'Study Material (PDF)', free: false, premium: true },
        { feature: '24/7 Support', free: false, premium: true },
        { feature: 'Mobile App Access', free: 'Limited', premium: 'Full Access' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
                        <Clock className="mr-2 h-4 w-4" />
                        Coming Soon
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        Premium Courses
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        We&apos;re preparing comprehensive courses for NEET, JEE, and CLAT preparation.
                    </p>
                </motion.div>

                {/* Course Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-12"
                >
                    <Tabs value={selectedPlan} onValueChange={setSelectedPlan}>
                        <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
                            {Object.entries(courses).map(([key, course]) => (
                                <TabsTrigger key={key} value={key} className="text-sm">
                                    <span className="mr-2">{course.icon}</span>
                                    {course.title.split(' ')[0]}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {Object.entries(courses).map(([key, course]) => (
                            <TabsContent key={key} value={key} className="mt-8">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {/* Course Header */}
                                    <Card className={`mb-8 bg-gradient-to-r ${course.color} text-white border-0 overflow-hidden relative`}>
                                        <div className="absolute inset-0 bg-black/10"></div>
                                        <CardContent className="p-8 relative z-10">
                                            <div className="grid lg:grid-cols-2 gap-8 items-center">
                                                <div>
                                                    <div className="text-6xl mb-4">{course.icon}</div>
                                                    <h2 className="text-3xl font-bold mb-2">{course.title}</h2>
                                                    <p className="text-white/90 text-lg mb-6">{course.subtitle}</p>

                                                    <div className="flex items-center space-x-4 mb-6">
                                                        <div>
                                                            <span className="text-4xl font-bold">{course.price}</span>
                                                            <span className="text-2xl line-through text-white/60 ml-2">{course.originalPrice}</span>
                                                        </div>
                                                        
                                                    </div>

                                                    <div className="flex flex-wrap gap-4">
                                                        {course.highlights.map((highlight, index) => (
                                                            <div key={index} className="flex items-center bg-white/20 px-3 py-1 rounded-full">
                                                                <highlight.icon className="h-4 w-4 mr-2" />
                                                                <span className="text-sm">{highlight.text}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                                                    <h3 className="text-xl font-semibold mb-4">What&apos;s Included:</h3>
                                                    <ul className="space-y-2">
                                                        {course.features.slice(0, 6).map((feature, index) => (
                                                            <li key={index} className="flex items-start">
                                                                <Check className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                                                                <span className="text-sm">{feature}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <Button disabled className="w-full mt-6 bg-gray-300 text-gray-500 cursor-not-allowed font-semibold">
                                                        Coming Soon
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Detailed Features */}
                                    <Card className="mb-8 border-0 shadow-lg">
                                        <CardHeader>
                                            <CardTitle>Complete Feature List</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                {course.features.map((feature, index) => (
                                                    <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                                                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                                                        <span>{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </TabsContent>
                        ))}
                    </Tabs>
                </motion.div>

                {/* Success Stories */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-12"
                >
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Success Stories</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50">
                                <CardContent className="p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                            <Award className="h-6 w-6 text-purple-600" />
                                        </div>
                                        <div className="ml-4">
                                            <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                            <p className="text-sm text-purple-600 font-medium">{testimonial.result}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 italic mb-4">&quot;{testimonial.quote}&quot;</p>
                                    <Badge variant="outline">{testimonial.course} Student</Badge>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </motion.div>

                {/* Free vs Premium Comparison */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-12"
                >
                    <Card className="border-0 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-center">Free vs Premium Comparison</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="text-left py-4 px-2">Features</th>
                                            <th className="text-center py-4 px-2">Free</th>
                                            <th className="text-center py-4 px-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-t-lg">Premium</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {freeVsPremium.map((item, index) => (
                                            <tr key={index} className="border-b">
                                                <td className="py-4 px-2 font-medium">{item.feature}</td>
                                                <td className="py-4 px-2 text-center">
                                                    {item.free === true ? (
                                                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                                                    ) : item.free === false ? (
                                                        <span className="text-gray-400">—</span>
                                                    ) : (
                                                        <span className="text-sm text-gray-600">{item.free}</span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-2 text-center bg-gradient-to-r from-purple-50 to-blue-50">
                                                    {item.premium === true ? (
                                                        <Check className="h-5 w-5 text-green-500 mx-auto" />
                                                    ) : item.premium === false ? (
                                                        <span className="text-gray-400">—</span>
                                                    ) : (
                                                        <span className="text-sm font-medium text-purple-600">{item.premium}</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-center"
                >
                    <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
                        <CardContent className="p-8">
                            <h3 className="text-3xl font-bold mb-4">Ready to Start Your Success Journey?</h3>
                            <p className="text-xl mb-8 opacity-90">
                                Join thousands of students who achieved their dreams with our premium courses
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button disabled size="lg" className="bg-gray-300 text-gray-500 cursor-not-allowed px-8 py-4 text-lg">
                                    Notify Me When Available
                                </Button>
                                <Link href="/auth">
                                    <Button size="lg" variant="outline" className="border-white text-black hover:bg-white hover:text-purple-600 px-8 py-4 text-lg">
                                        Start Free Trial
                                    </Button>
                                </Link>
                            </div>
                            <p className="mt-6 text-sm opacity-80">
                                💰 30-day money-back guarantee • 📞 24/7 support • 📱 Mobile app included
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}