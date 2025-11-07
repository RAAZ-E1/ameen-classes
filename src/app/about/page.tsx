'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Award, 
  Target, 
  Heart, 
  Star, 
  TrendingUp,
  Clock,
  ArrowRight,
  Play,
  Globe,
  Lightbulb
} from 'lucide-react';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('mission');

  const stats = [
    { icon: Users, label: 'Students Helped', value: '10,000+', color: 'text-blue-600' },
    { icon: BookOpen, label: 'Mock Tests Taken', value: '50,000+', color: 'text-green-600' },
    { icon: Award, label: 'Success Rate', value: '95%', color: 'text-purple-600' },
    { icon: Clock, label: 'Years of Experience', value: '8+', color: 'text-orange-600' }
  ];

  const features = [
    {
      icon: Target,
      title: 'Personalized Learning',
      description: 'AI-powered adaptive learning that adjusts to your pace and learning style.'
    },
    {
      icon: TrendingUp,
      title: 'Performance Analytics',
      description: 'Detailed insights into your progress with actionable improvement suggestions.'
    },
    {
      icon: Globe,
      title: 'Accessible Anywhere',
      description: 'Learn from anywhere, anytime with our mobile-friendly platform.'
    },
    {
      icon: Lightbulb,
      title: 'Expert Content',
      description: 'Curated by experienced educators and subject matter experts.'
    }
  ];

  const team = [
    {
      name: 'Mohd Aatif',
      role: 'Founder & Director',
      experience: '10+ years',
      specialization: 'Chemistry',
      description: 'Former Research Associate NCL.'
    },
    {
      name: 'Javed Shaikh Sir',
      role: 'Chemistry Faculty',
      experience: '10+ years',
      specialization: 'Chemistry',
      description: 'PHD/NET/JRF Qualified'
    },
    {
      name: 'Shaikh Mudassir Sir',
      role: 'Biology Faculty',
      experience: '11+ years',
      specialization: 'Biology',
      description: 'Ex-Faculty Shaheen.'
    },
    {
      name: 'Mujtaba Farooque Sir',
      role: 'Maths Faculty',
      experience: '6+ years',
      specialization: 'Maths',
      description: 'Lecturer MIT-WPU.'
    },
     {
      name: 'Shaikh Jafer Sir',
      role: 'Maths Faculty',
      experience: '4+ years',
      specialization: 'Maths',
      description: ''
    },
    {
      name: 'Dr. Mohd Ubaid Sir',
      role: 'Biology Faculty',
      experience: '3+ years',
      specialization: 'Biology',
      description: 'MBBS'
    },
    {
      name: 'Ramza Sulaim Mam',
      role: 'Physics Faculty',
      experience: '3+ years',
      specialization: 'Physics',
      description: 'Lecturer.'
    },

  ];



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-2 text-sm font-medium bg-blue-100 text-blue-800">
              Transforming Education Since 2016
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-blue-600">Ameen Classes</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Empowering the next generation of achievers through innovative learning solutions, 
              personalized guidance, and unwavering commitment to educational excellence.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Foundation</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Built on strong principles that guide everything we do
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {['mission', 'vision', 'values'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            {activeTab === 'mission' && (
              <Card className="border-l-4 border-l-blue-600">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <Target className="w-8 h-8 text-blue-600 mt-1" />
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                      <p className="text-gray-600 text-lg leading-relaxed mb-4">
                        To democratize quality education by providing accessible, innovative, and personalized 
                        learning experiences that empower students to achieve their highest potential and succeed 
                        in competitive examinations.
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        We believe every student deserves the opportunity to excel, regardless of their 
                        geographical location or economic background. Through technology and expert guidance, 
                        we bridge the gap between aspiration and achievement.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'vision' && (
              <Card className="border-l-4 border-l-green-600">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <Star className="w-8 h-8 text-green-600 mt-1" />
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                      <p className="text-gray-600 text-lg leading-relaxed mb-4">
                        To become India&apos;s most trusted and innovative educational platform, transforming 
                        how students prepare for competitive examinations and building a generation of 
                        confident, capable, and successful individuals.
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        We envision a future where every student has access to world-class education, 
                        personalized mentorship, and the tools they need to turn their dreams into reality.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'values' && (
              <Card className="border-l-4 border-l-purple-600">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <Heart className="w-8 h-8 text-purple-600 mt-1" />
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Excellence</h4>
                          <p className="text-gray-600 text-sm">Striving for the highest standards in everything we do.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Innovation</h4>
                          <p className="text-gray-600 text-sm">Embracing technology to enhance learning experiences.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Integrity</h4>
                          <p className="text-gray-600 text-sm">Building trust through transparency and honesty.</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2">Accessibility</h4>
                          <p className="text-gray-600 text-sm">Making quality education available to all students.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Ameen Classes?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover what makes us different and why thousands of students trust us
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <feature.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Passionate educators and innovators dedicated to your success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <GraduationCap className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                  <Badge variant="outline" className="mb-3">{member.experience}</Badge>
                  <p className="text-sm text-gray-600 mb-3">{member.specialization}</p>
                  <p className="text-sm text-gray-500">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>



      {/* What We Offer Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive learning solutions designed for your success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="w-5 h-5 text-blue-600" />
                  Free Video Lectures
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">High-quality video content covering Class 10-12 syllabus with expert explanations.</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Physics, Chemistry, Biology, Mathematics</li>
                  <li>• Chapter-wise organized content</li>
                  <li>• HD video quality with clear audio</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-600" />
                  AI-Powered Mock Tests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Intelligent testing system that adapts to your learning pattern and provides detailed analysis.</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• NEET, JEE, CBSE pattern tests</li>
                  <li>• Instant results and explanations</li>
                  <li>• Performance analytics</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  Study Materials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Comprehensive study resources including notes, question banks, and previous year papers.</p>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li>• Curated by expert faculty</li>
                  <li>• Regular updates and additions</li>
                  <li>• Downloadable PDF format</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Your Journey?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of successful students who have achieved their dreams with Ameen Classes. 
            Your success story starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 py-3">
              Start Free Trial
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3">
              View Courses
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}