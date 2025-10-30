"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Brain, Target, TrendingUp, BookOpen, Clock } from 'lucide-react';

interface DetailedAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  testResult: {
    overall_performance: {
      score_percentage: number;
      grade: string;
      strengths: string[];
      weaknesses: string[];
    };
    subject_analysis: Record<string, {
      score: number;
      total: number;
      percentage: number;
      weak_topics: string[];
      recommendations: string[];
    }>;
    detailed_feedback: string;
    study_plan: {
      priority_subjects: string[];
      recommended_topics: string[];
      study_hours_per_week: number;
      focus_areas: string[];
    };
  };
}

export default function DetailedAnalysisModal({ isOpen, onClose, testResult }: DetailedAnalysisModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'subjects' | 'recommendations'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Detailed Analysis Report</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('subjects')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'subjects'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Subject Analysis
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'recommendations'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Study Plan
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Performance Summary */}
              <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {testResult.overall_performance.score_percentage.toFixed(1)}%
                </div>
                <div className="text-lg text-gray-700">
                  Grade: {testResult.overall_performance.grade}
                </div>
              </div>

              {/* AI Feedback */}
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  AI Analysis
                </h3>
                <p className="text-blue-800 leading-relaxed">
                  {testResult.detailed_feedback}
                </p>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-green-800 mb-3">Strengths</h3>
                  <ul className="space-y-2">
                    {testResult.overall_performance.strengths.map((strength, index) => (
                      <li key={index} className="text-green-700 flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-red-800 mb-3">Areas for Improvement</h3>
                  <ul className="space-y-2">
                    {testResult.overall_performance.weaknesses.map((weakness, index) => (
                      <li key={index} className="text-red-700 flex items-start gap-2">
                        <span className="text-red-500 mt-1">•</span>
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'subjects' && (
            <div className="space-y-6">
              {Object.entries(testResult.subject_analysis).map(([subject, data]) => (
                <div key={subject} className="bg-gray-50 p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">{subject}</h3>
                    <div className="text-2xl font-bold text-blue-600">
                      {data.percentage.toFixed(1)}%
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Performance</h4>
                      <div className="text-sm text-gray-600 mb-2">
                        {data.score} out of {data.total} questions correct
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full ${
                            data.percentage >= 80 ? 'bg-green-500' : 
                            data.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${data.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Recommendations</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {data.recommendations.slice(0, 3).map((rec, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {data.weak_topics.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-medium text-gray-700 mb-2">Topics to Focus On</h4>
                      <div className="flex flex-wrap gap-2">
                        {data.weak_topics.map((topic, index) => (
                          <span key={index} className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div className="space-y-6">
              {/* Study Schedule */}
              <div className="bg-purple-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recommended Study Schedule
                </h3>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {testResult.study_plan.study_hours_per_week} hours/week
                </div>
                <p className="text-purple-700">
                  Based on your performance, this is the optimal study time to improve your weak areas.
                </p>
              </div>

              {/* Priority Subjects */}
              <div className="bg-orange-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-orange-900 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Priority Subjects
                </h3>
                <div className="grid gap-3">
                  {testResult.study_plan.priority_subjects.map((subject, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                      <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="font-medium text-gray-900">{subject}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Focus Areas */}
              <div className="bg-blue-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Focus Areas
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {testResult.study_plan.focus_areas.map((area, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg">
                      <div className="font-medium text-gray-900">{area}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Topics */}
              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Topics to Study
                </h3>
                <div className="flex flex-wrap gap-2">
                  {testResult.study_plan.recommended_topics.map((topic, index) => (
                    <span key={index} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-gray-50">
          <div className="flex justify-end">
            <Button onClick={onClose}>Close Report</Button>
          </div>
        </div>
      </div>
    </div>
  );
}