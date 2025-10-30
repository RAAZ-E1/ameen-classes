"use client";

import { useState } from 'react';
import { InlineMath, BlockMath } from "react-katex";
import 'katex/dist/katex.min.css';
import { physicsToLatex, smartTextToLatex } from '@/lib/math-quiz-utils';

interface PhysicsQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer?: number;
  type?: 'formula' | 'equation' | 'calculation' | 'text';
  topic?: string;
}

interface PhysicsQuizProps {
  questions: PhysicsQuestion[];
  onAnswerSelect?: (questionId: number, optionIndex: number) => void;
  showResults?: boolean;
}

export default function PhysicsQuiz({ questions, onAnswerSelect, showResults = false }: PhysicsQuizProps) {
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

  const renderContent = (content: string, type: string = 'text') => {
    if (type === 'formula' || type === 'equation' || type === 'calculation') {
      // For physics formulas and equations, use physics-specific LaTeX conversion
      const latexContent = physicsToLatex(content);
      return <InlineMath math={latexContent} />;
    } else {
      // For mixed content, use smart conversion
      const latexContent = smartTextToLatex(content);
      return <InlineMath math={latexContent} />;
    }
  };

  const renderQuestion = (question: string, type: string = 'text') => {
    if (type === 'equation' || type === 'calculation') {
      const latexContent = physicsToLatex(question);
      return <BlockMath math={latexContent} />;
    } else {
      const latexContent = smartTextToLatex(question);
      return <BlockMath math={latexContent} />;
    }
  };

  const getTopicColor = (topic: string = '') => {
    const colors: Record<string, string> = {
      'mechanics': 'bg-blue-100 text-blue-700',
      'thermodynamics': 'bg-red-100 text-red-700',
      'electromagnetism': 'bg-yellow-100 text-yellow-700',
      'optics': 'bg-purple-100 text-purple-700',
      'waves': 'bg-green-100 text-green-700',
      'modern': 'bg-indigo-100 text-indigo-700',
      'default': 'bg-gray-100 text-gray-700'
    };
    return colors[topic.toLowerCase()] || colors.default;
  };

  return (
    <div className="space-y-8">
      {questions.map((q, questionIndex) => (
        <div key={q.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          {/* Question Number and Topic */}
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              Question {questionIndex + 1}
            </span>
            {q.type && (
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                {q.type}
              </span>
            )}
            {q.topic && (
              <span className={`px-2 py-1 rounded text-xs font-medium ${getTopicColor(q.topic)}`}>
                {q.topic}
              </span>
            )}
          </div>

          {/* Question Text with Physics Equations */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            {renderQuestion(q.question, q.type)}
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
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
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
                        ? 'border-blue-500 bg-blue-500 text-white'
                        : 'border-gray-300'
                    }`}>
                      {String.fromCharCode(65 + optionIndex)}
                    </span>
                    <div className="flex-1">
                      {renderContent(opt, q.type)}
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