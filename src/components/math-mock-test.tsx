"use client";

import { useState, useEffect } from 'react';
import { InlineMath, BlockMath } from "react-katex";
import 'katex/dist/katex.min.css';
// Database operations moved to API calls
import { Button } from '@/components/ui/button';

interface Question {
  id: number;
  question: string;
  options: string[];
}

export default function MathMockTest() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    async function loadQuestions() {
      try {
        const response = await fetch('/api/questions?subject=Mathematics&limit=10');
        const result = await response.json();
        const data = result.success ? result.questions : null;
        if (data) {
          setQuestions(data);
        }
      } catch (error) {
        console.error('Error loading questions:', error);
      } finally {
        setLoading(false);
      }
    }

    loadQuestions();
  }, []);

  const handleAnswerSelect = (optionIndex: number) => {
    const questionId = questions[currentQuestion].id;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No questions available.</p>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Test Completed!</h2>
        <p className="text-gray-600 mb-6">
          You answered {Object.keys(selectedAnswers).length} out of {questions.length} questions.
        </p>
        <Button onClick={() => window.location.reload()}>
          Take Test Again
        </Button>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const selectedAnswer = selectedAnswers[question.id];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-brand-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 mb-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-sm font-medium">
              Question {currentQuestion + 1}
            </span>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <BlockMath math={question.question} />
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedAnswer === index
                  ? 'border-brand-500 bg-brand-50'
                  : 'border-gray-200 hover:border-brand-300 hover:bg-brand-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                  selectedAnswer === index
                    ? 'border-brand-500 bg-brand-500 text-white'
                    : 'border-gray-300'
                }`}>
                  {String.fromCharCode(65 + index)}
                </span>
                <div className="flex-1">
                  <InlineMath math={option} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          variant="outline"
        >
          Previous
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={selectedAnswer === undefined}
        >
          {currentQuestion === questions.length - 1 ? 'Finish Test' : 'Next Question'}
        </Button>
      </div>
    </div>
  );
}