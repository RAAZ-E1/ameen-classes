"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Question {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
  subject: string;
  topic: string;
  difficulty: string;
  explanation?: string;
  tags?: string[];
}

export default function TestQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/questions?class=11&subject=Biology&limit=5');
      const data = await response.json();
      
      if (data.success) {
        setQuestions(data.questions);
        console.log('Loaded questions:', data.questions);
      } else {
        setError(data.error || 'Failed to fetch questions');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const checkAnswers = () => {
    let correct = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correct_answer) {
        correct++;
      }
    });
    alert(`You got ${correct} out of ${questions.length} questions correct!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Test MongoDB Questions
          </h1>
          <p className="text-gray-600">
            Testing questions loaded from your MongoDB database
          </p>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Loading questions from MongoDB...</p>
          </div>
        )}

        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <p className="text-red-700">Error: {error}</p>
              <Button onClick={fetchQuestions} className="mt-2">
                Retry
              </Button>
            </CardContent>
          </Card>
        )}

        {questions.length > 0 && (
          <>
            <div className="mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-700">
                    ✅ Successfully loaded {questions.length} questions from MongoDB!
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Subject: Biology | Class: 11 | Chapter: {questions[0]?.topic}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {questions.map((question, index) => (
                <Card key={question.id} className="border-l-4 border-l-blue-500">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Question {index + 1}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <p className="text-gray-900 font-medium">
                        {question.question}
                      </p>
                    </div>

                    <div className="space-y-2 mb-4">
                      {question.options.map((option, optionIndex) => (
                        <button
                          key={optionIndex}
                          onClick={() => handleAnswerSelect(question.id, optionIndex)}
                          className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                            selectedAnswers[question.id] === optionIndex
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          <span className="font-medium mr-2">
                            {String.fromCharCode(65 + optionIndex)}.
                          </span>
                          {option}
                        </button>
                      ))}
                    </div>

                    <div className="text-sm text-gray-500 space-y-1">
                      <p><strong>Difficulty:</strong> {question.difficulty}</p>
                      <p><strong>Tags:</strong> {question.tags?.join(', ')}</p>
                      {question.explanation && (
                        <details className="mt-2">
                          <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                            Show Explanation
                          </summary>
                          <p className="mt-2 p-3 bg-blue-50 rounded text-blue-900">
                            {question.explanation}
                          </p>
                        </details>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button onClick={checkAnswers} className="px-8 py-3">
                Check Answers
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}