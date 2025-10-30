"use client";

import { useState } from 'react';
import { InlineMath, BlockMath } from "react-katex";
import 'katex/dist/katex.min.css';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer?: number;
}

interface MathQuizProps {
  questions: Question[];
  onAnswerSelect?: (questionId: number, optionIndex: number) => void;
  showResults?: boolean;
}

export default function MathQuiz({ questions, onAnswerSelect, showResults = false }: MathQuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const handleOptionSelect = (questionId: number, optionIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
    
    if (onAnswerSelect) {
      onAnswerSelect(questionId, optionIndex);
    }
  };

  return (
    <div className="space-y-8">
      {questions.map((q, questionIndex) => (
        <div key={q.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          {/* Question Number */}
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-sm font-medium">
              Question {questionIndex + 1}
            </span>
          </div>

          {/* Question Text with Math */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <BlockMath math={q.question} />
          </div>

          {/* Options */}
          <div className="space-y-3">
            {q.options.map((opt, optionIndex) => {
              const isSelected = selectedAnswers[q.id] === optionIndex;
              const isCorrect = showResults && q.correctAnswer === optionIndex;
              const isWrong = showResults && isSelected && q.correctAnswer !== optionIndex;
              
              return (
                <button 
                  key={optionIndex}
                  onClick={() => handleOptionSelect(q.id, optionIndex)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    isCorrect && showResults
                      ? 'border-green-500 bg-green-50'
                      : isWrong
                      ? 'border-red-500 bg-red-50'
                      : isSelected
                      ? 'border-brand-500 bg-brand-50'
                      : 'border-gray-200 hover:border-brand-300 hover:bg-brand-50'
                  }`}
                  disabled={showResults}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                      isCorrect && showResults
                        ? 'border-green-500 bg-green-500 text-white'
                        : isWrong
                        ? 'border-red-500 bg-red-500 text-white'
                        : isSelected
                        ? 'border-brand-500 bg-brand-500 text-white'
                        : 'border-gray-300'
                    }`}>
                      {String.fromCharCode(65 + optionIndex)}
                    </span>
                    <div className="flex-1">
                      <InlineMath math={opt} />
                    </div>
                    {showResults && isCorrect && (
                      <span className="text-green-600 text-sm font-medium">✓ Correct</span>
                    )}
                    {showResults && isWrong && (
                      <span className="text-red-600 text-sm font-medium">✗ Wrong</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Show correct answer if results are shown and user got it wrong */}
          {showResults && selectedAnswers[q.id] !== undefined && selectedAnswers[q.id] !== q.correctAnswer && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-sm">
                <strong>Correct Answer:</strong> Option {q.correctAnswer !== undefined ? String.fromCharCode(65 + q.correctAnswer) : 'N/A'}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}