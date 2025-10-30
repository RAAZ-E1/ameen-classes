"use client";

import { useState } from 'react';
import MathQuiz from '@/components/math-quiz';
import { Button } from '@/components/ui/button';

// Sample math questions with LaTeX
const sampleQuestions = [
  {
    id: 1,
    question: "\\text{Solve for } x: \\quad 2x + 5 = 13",
    options: ["x = 3", "x = 4", "x = 5", "x = 6"],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "\\text{Find the derivative of } f(x) = x^2 + 3x + 2",
    options: ["f'(x) = 2x + 3", "f'(x) = x + 3", "f'(x) = 2x + 2", "f'(x) = x^2 + 3"],
    correctAnswer: 0
  },
  {
    id: 3,
    question: "\\text{What is } \\int_0^1 x^2 \\, dx \\text{?}",
    options: ["\\frac{1}{4}", "\\frac{1}{3}", "\\frac{1}{2}", "1"],
    correctAnswer: 1
  },
  {
    id: 4,
    question: "\\text{Solve the quadratic equation: } x^2 - 5x + 6 = 0",
    options: ["x = 1, 6", "x = 2, 3", "x = -2, -3", "x = 0, 5"],
    correctAnswer: 1
  }
];

export default function MathQuizDemo() {
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const handleAnswerSelect = (questionId: number, optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setShowResults(false);
    setAnswers({});
  };

  const calculateScore = () => {
    let correct = 0;
    sampleQuestions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Math Quiz Demo
          </h1>
          <p className="text-gray-600">
            Interactive math quiz with LaTeX rendering using KaTeX
          </p>
        </div>

        {showResults && (
          <div className="mb-8 p-6 bg-white rounded-xl shadow-sm border">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Results</h2>
              <div className="text-4xl font-bold text-brand-600 mb-2">
                {calculateScore()}/{sampleQuestions.length}
              </div>
              <p className="text-gray-600">
                You got {calculateScore()} out of {sampleQuestions.length} questions correct!
              </p>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-brand-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(calculateScore() / sampleQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <MathQuiz 
          questions={sampleQuestions}
          onAnswerSelect={handleAnswerSelect}
          showResults={showResults}
        />

        <div className="mt-8 flex justify-center gap-4">
          {!showResults ? (
            <Button 
              onClick={handleSubmit}
              disabled={Object.keys(answers).length !== sampleQuestions.length}
              className="px-8 py-3"
            >
              Submit Quiz
            </Button>
          ) : (
            <Button 
              onClick={handleReset}
              variant="outline"
              className="px-8 py-3"
            >
              Try Again
            </Button>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">About This Demo</h3>
          <ul className="text-blue-800 space-y-2 text-sm">
            <li>• Mathematical expressions are rendered using KaTeX for crisp, fast display</li>
            <li>• Questions support full LaTeX syntax for complex mathematical notation</li>
            <li>• Interactive answer selection with visual feedback</li>
            <li>• Results show correct answers and scoring</li>
            <li>• Perfect for NEET, JEE, and other competitive exam questions</li>
          </ul>
        </div>
      </div>
    </div>
  );
}