"use client";

import { useState, useEffect, useCallback } from 'react';
import { InlineMath, BlockMath } from "react-katex";
import 'katex/dist/katex.min.css';
import { Button } from '@/components/ui/button';
// Database operations will be done via API calls
import { groqAnalysis } from '@/lib/groq-analysis';
import { smartTextToLatex } from '@/lib/math-quiz-utils';
import { Clock, CheckCircle, XCircle, Brain, BookOpen, Target } from 'lucide-react';
import DetailedAnalysisModal from './detailed-analysis-modal';

interface Question {
  id: string;
  class?: number;
  subject: string;
  chapter?: string;
  questionText: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  difficulty: string;
  tags?: string[];
  // Legacy fields for backward compatibility
  question?: string;
  correct_answer?: number;
  topic?: string;
  exam_type?: string;
}

interface TestResult {
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
}

interface EnhancedMockTestProps {
  examType: 'NEET' | 'JEE';
  questionLimit?: number;
}

export default function EnhancedMockTest({ examType, questionLimit = 50 }: EnhancedMockTestProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(3 * 60 * 60); // 3 hours in seconds
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [startTime, setStartTime] = useState<number>(0);
  const [showDetailedModal, setShowDetailedModal] = useState(false);



  const loadQuestions = useCallback(async () => {
    setLoading(true);
    console.log('🔍 Loading questions from MongoDB Atlas...', { examType, questionLimit });
    
    try {
      const url = `/api/questions?examType=${examType}&limit=${questionLimit}`;
      console.log('📡 Fetching from:', url);
      
      const response = await fetch(url);
      console.log('📊 Response status:', response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      console.log('📝 API Response:', result);
      
      if (result.success && result.questions && result.questions.length > 0) {
        console.log('✅ Successfully loaded questions from MongoDB Atlas:', result.questions.length);
        setQuestions(result.questions);
      } else {
        console.error('❌ No questions found in MongoDB Atlas');
        console.error('API result:', result);
        // Show error instead of fallback
        alert(`Error: No ${examType} questions found in database. Please check your MongoDB Atlas connection and ensure questions are imported.`);
        setQuestions([]);
      }
    } catch (error) {
      console.error('💥 Failed to load questions from MongoDB Atlas:', error);
      alert(`Error loading questions: ${error instanceof Error ? error.message : 'Unknown error'}. Please check your internet connection and try again.`);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  }, [examType, questionLimit]);

  const handleSubmitTest = useCallback(async () => {
    setTestCompleted(true);
    setAnalyzing(true);

    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const studentAnswers = questions.map(q => ({
      question_id: q.id,
      selected_answer: selectedAnswers[q.id] ?? -1,
      is_correct: selectedAnswers[q.id] === (q.correctAnswer ?? q.correct_answer),
      question_data: {
        ...q,
        question: q.questionText || q.question || '',
        difficulty: (q.difficulty as 'easy' | 'medium' | 'hard') || 'medium',
        exam_type: (q.exam_type as 'NEET' | 'JEE') || examType
      }
    }));

    try {
      // Analyze with Groq AI
      const analysis = await groqAnalysis.analyzeTestResults(examType, studentAnswers);
      
      if (analysis) {
        setTestResult(analysis);
        
        // Save to database
        const testData = {
          exam_type: examType,
          total_questions: questions.length,
          correct_answers: studentAnswers.filter(a => a.is_correct).length,
          time_taken: timeTaken,
          subject_scores: Object.entries(analysis.subject_analysis).reduce((acc, [subject, data]) => {
            acc[subject] = { correct: data.score, total: data.total };
            return acc;
          }, {} as Record<string, { correct: number; total: number }>),
          answers: studentAnswers.map(a => ({
            question_id: a.question_id,
            selected_answer: a.selected_answer,
            is_correct: a.is_correct
          }))
        };

        // Save test result via API
        await fetch('/api/test-results', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(testData)
        });
      }
    } catch (error) {
      console.error('Error analyzing test:', error);
    } finally {
      setAnalyzing(false);
    }
  }, [questions, selectedAnswers, startTime, examType]);

  // Load questions on component mount
  useEffect(() => {
    loadQuestions();
  }, [loadQuestions]);

  // Timer effect
  useEffect(() => {
    if (testStarted && !testCompleted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [testStarted, testCompleted, timeLeft, handleSubmitTest]);

  const startTest = () => {
    if (questions.length === 0) {
      alert('No questions available. Please reload the page and try again.');
      return;
    }
    setTestStarted(true);
    setStartTime(Date.now());
  };

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const renderQuestion = (question: string) => {
    // Check if the question contains math symbols that need LaTeX rendering
    const hasMathSymbols = /[\^_{}\\]|\\[a-zA-Z]+|\$/.test(question);
    
    if (hasMathSymbols) {
      const latexContent = smartTextToLatex(question);
      return <BlockMath math={latexContent} />;
    } else {
      // For regular text questions, use normal text rendering with proper spacing
      return (
        <div className="text-gray-900 leading-relaxed font-normal text-base question-text">
          {question}
        </div>
      );
    }
  };

  const renderOption = (option: string) => {
    // Check if the option contains math symbols that need LaTeX rendering
    const hasMathSymbols = /[\^_{}\\]|\\[a-zA-Z]+|\$/.test(option);
    
    if (hasMathSymbols) {
      const latexContent = smartTextToLatex(option);
      return <InlineMath math={latexContent} />;
    } else {
      // For regular text options, use normal text rendering
      return (
        <span className="text-gray-800 font-normal option-text">
          {option}
        </span>
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading {examType} questions from MongoDB Atlas...</p>
        </div>
      </div>
    );
  }

  // Show error if no questions are loaded
  if (!loading && questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-red-50 border border-red-200 p-8 rounded-2xl">
          <div className="text-red-600 mb-4">
            <XCircle className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">No Questions Available</h2>
            <p className="text-red-700 mb-6">
              Unable to load {examType} questions from the database. This could be due to:
            </p>
            <ul className="text-left text-red-700 space-y-2 mb-6 max-w-md mx-auto">
              <li>• Database connection issues</li>
              <li>• No questions imported for {examType}</li>
              <li>• Server configuration problems</li>
            </ul>
          </div>
          <div className="space-y-3">
            <Button onClick={() => window.location.reload()} className="px-6 py-2">
              Retry Loading Questions
            </Button>
            <div>
              <Button variant="outline" onClick={() => window.location.href = '/admin'} className="px-6 py-2">
                Admin Panel
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!testStarted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-white p-8 rounded-2xl shadow-sm border">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{examType} Mock Test</h2>
          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <BookOpen className="w-5 h-5" />
              <span>{questions.length} Questions</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Clock className="w-5 h-5" />
              <span>3 Hours Duration</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Brain className="w-5 h-5" />
              <span>AI-Powered Analysis</span>
            </div>
          </div>
          <Button onClick={startTest} className="px-8 py-3 text-lg">
            Start {examType} Test
          </Button>
        </div>
      </div>
    );
  }

  if (testCompleted) {
    if (analyzing) {
      return (
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <Brain className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-pulse" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Your Performance</h3>
            <p className="text-gray-600">Our AI is analyzing your answers and preparing detailed feedback...</p>
          </div>
        </div>
      );
    }

    if (testResult) {
      return (
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Score Card */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">
                {testResult.overall_performance.score_percentage.toFixed(0)}%
              </div>
              <div className="text-xl mb-4">Grade: {testResult.overall_performance.grade}</div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div 
                  className="bg-white h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${testResult.overall_performance.score_percentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Quick Summary */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-xl border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Strong Areas
              </h3>
              <div className="text-sm text-green-700">
                {testResult.overall_performance.strengths.slice(0, 2).join(', ') || 'Keep practicing!'}
              </div>
            </div>
            <div className="bg-red-50 p-4 rounded-xl border border-red-200">
              <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                Needs Work
              </h3>
              <div className="text-sm text-red-700">
                {testResult.overall_performance.weaknesses.slice(0, 2).join(', ') || 'Great job overall!'}
              </div>
            </div>
          </div>

          {/* Subject Performance */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Subject Performance</h3>
            <div className="space-y-4">
              {Object.entries(testResult.subject_analysis).map(([subject, data]) => (
                <div key={subject} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-sm font-medium text-gray-900">{subject}</div>
                    <div className="text-xs text-gray-500">{data.score}/{data.total}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          data.percentage >= 80 ? 'bg-green-500' : 
                          data.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${data.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-sm font-medium text-gray-900 w-12 text-right">
                      {data.percentage.toFixed(0)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights - Simplified */}
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <Brain className="w-5 h-5" />
              AI Insights
            </h3>
            <div className="text-sm text-blue-800 leading-relaxed">
              {testResult.detailed_feedback.length > 200 
                ? testResult.detailed_feedback.substring(0, 200) + '...'
                : testResult.detailed_feedback
              }
            </div>
          </div>

          {/* Action Items */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              What to Focus On Next
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Priority Subjects</h4>
                <div className="flex flex-wrap gap-2">
                  {testResult.study_plan.priority_subjects.slice(0, 3).map((subject, index) => (
                    <span key={index} className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Study Time</h4>
                <div className="bg-purple-100 text-purple-700 px-3 py-2 rounded text-sm font-medium inline-block">
                  {testResult.study_plan.study_hours_per_week} hours/week
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center">
            <Button onClick={() => window.location.reload()} className="px-6 py-2">
              Take Another Test
            </Button>
            <Button variant="outline" className="px-6 py-2" onClick={() => setShowDetailedModal(true)}>
              View Detailed Report
            </Button>
          </div>

          {/* Detailed Analysis Modal */}
          <DetailedAnalysisModal
            isOpen={showDetailedModal}
            onClose={() => setShowDetailedModal(false)}
            testResult={testResult}
          />
        </div>
      );
    }
  }

  // Test in progress
  const currentQ = questions[currentQuestion];
  const selectedAnswer = selectedAnswers[currentQ.id];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white p-4 rounded-xl shadow-sm border mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold text-gray-900">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
              {currentQ.subject}
            </span>
          </div>
          <div className="flex items-center gap-2 text-lg font-mono">
            <Clock className="w-5 h-5 text-red-500" />
            <span className={timeLeft < 300 ? 'text-red-500' : 'text-gray-700'}>
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white p-8 rounded-xl shadow-sm border mb-6">
        <div className="mb-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            {renderQuestion(currentQ.questionText || currentQ.question || '')}
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedAnswer === index
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-500 text-white'
                    : 'border-gray-300'
                }`}>
                  {String.fromCharCode(65 + index)}
                </span>
                <div className="flex-1">
                  {renderOption(option)}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          variant="outline"
        >
          Previous
        </Button>
        
        <div className="flex gap-2">
          {currentQuestion === questions.length - 1 ? (
            <Button
              onClick={handleSubmitTest}
              className="bg-green-600 hover:bg-green-700"
            >
              Submit Test
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={selectedAnswer === undefined}
            >
              Next Question
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}