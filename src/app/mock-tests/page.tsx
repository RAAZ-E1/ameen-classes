"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Target, TrendingUp, Award, Play, Brain, Lightbulb, Stethoscope, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import EnhancedMockTest from '@/components/enhanced-mock-test';

type ExamType = 'NEET' | 'JEE' | null;

export default function MockTestsPage() {
  const [selectedExam, setSelectedExam] = useState<ExamType>(null);
  const [testStarted, setTestStarted] = useState(false);

  const startTest = (examType: 'NEET' | 'JEE') => {
    setSelectedExam(examType);
    setTestStarted(true);
  };

  const resetTest = () => {
    setSelectedExam(null);
    setTestStarted(false);
  };

  if (testStarted && selectedExam) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button onClick={resetTest} variant="outline">
              ← Back to Test Selection
            </Button>
          </div>
          <EnhancedMockTest examType={selectedExam} questionLimit={50} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            AI-Powered Mock Tests
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Take comprehensive mock tests with real questions from our database and get intelligent AI analysis of your performance
          </motion.p>
        </div>

        {/* Exam Type Selection */}
        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => startTest('NEET')}>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <Stethoscope className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl text-green-700">NEET Mock Test</CardTitle>
                <CardDescription className="text-lg">
                  National Eligibility cum Entrance Test for Medical
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">180</div>
                    <div className="text-sm text-gray-600">Questions</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">3</div>
                    <div className="text-sm text-gray-600">Hours</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BookOpen className="w-4 h-4" />
                    <span>Physics (45) • Chemistry (45) • Biology (90)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Brain className="w-4 h-4" />
                    <span>AI-powered performance analysis</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Target className="w-4 h-4" />
                    <span>Personalized study recommendations</span>
                  </div>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 group-hover:scale-105 transition-transform">
                  <Play className="w-4 h-4 mr-2" />
                  Start NEET Test
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={() => startTest('JEE')}>
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <Calculator className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl text-blue-700">JEE Mock Test</CardTitle>
                <CardDescription className="text-lg">
                  Joint Entrance Examination for Engineering
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">90</div>
                    <div className="text-sm text-gray-600">Questions</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">3</div>
                    <div className="text-sm text-gray-600">Hours</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <BookOpen className="w-4 h-4" />
                    <span>Physics (30) • Chemistry (30) • Mathematics (30)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Brain className="w-4 h-4" />
                    <span>AI-powered performance analysis</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Target className="w-4 h-4" />
                    <span>Personalized study recommendations</span>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 group-hover:scale-105 transition-transform">
                  <Play className="w-4 h-4 mr-2" />
                  Start JEE Test
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-8 shadow-sm border mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Advanced AI-Powered Testing System
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Groq AI Analysis</h3>
              <p className="text-sm text-gray-600">Advanced AI analyzes your performance and identifies weak areas</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Real Database Questions</h3>
              <p className="text-sm text-gray-600">Questions fetched directly from our MongoDB database</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Lightbulb className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart Recommendations</h3>
              <p className="text-sm text-gray-600">Personalized study plan based on your performance</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Detailed Analytics</h3>
              <p className="text-sm text-gray-600">Subject-wise breakdown and topic-level insights</p>
            </div>
          </div>
        </motion.div>

        {/* How it Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 border"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            How Our AI-Powered System Works
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Take the Test</h3>
              <p className="text-sm text-gray-600">Answer questions with proper math and chemistry formula rendering</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI Analysis</h3>
              <p className="text-sm text-gray-600">Groq AI analyzes your answers and identifies patterns in your mistakes</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Get Insights</h3>
              <p className="text-sm text-gray-600">Receive detailed feedback and personalized study recommendations</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}