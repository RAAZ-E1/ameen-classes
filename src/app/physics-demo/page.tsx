"use client";

import { useState } from 'react';
import PhysicsQuiz from '@/components/physics-quiz';
import { Button } from '@/components/ui/button';

// Sample physics questions with proper equations and formulas
const samplePhysicsQuestions = [
  {
    id: 1,
    question: "\\text{Newton's second law of motion is expressed as:}",
    options: ["F = ma", "F = mv", "F = m/a", "F = a/m"],
    correctAnswer: 0,
    type: 'formula' as const,
    topic: 'mechanics'
  },
  {
    id: 2,
    question: "\\text{Einstein's mass-energy equivalence is:}",
    options: ["E = mc^2", "E = mv^2", "E = m^2c", "E = mc"],
    correctAnswer: 0,
    type: 'formula' as const,
    topic: 'modern'
  },
  {
    id: 3,
    question: "\\text{The equation for kinematic motion with constant acceleration is:}",
    options: ["v^2 = u^2 + 2as", "v = u + at", "s = ut + \\frac{1}{2}at^2", "\\text{All of the above}"],
    correctAnswer: 3,
    type: 'equation' as const,
    topic: 'mechanics'
  },
  {
    id: 4,
    question: "\\text{Ohm's law relates voltage, current, and resistance as:}",
    options: ["V = IR", "V = I/R", "V = R/I", "V = I + R"],
    correctAnswer: 0,
    type: 'formula' as const,
    topic: 'electromagnetism'
  },
  {
    id: 5,
    question: "\\text{The ideal gas law is expressed as:}",
    options: ["PV = nRT", "PV = nR/T", "P/V = nRT", "PV/n = RT"],
    correctAnswer: 0,
    type: 'formula' as const,
    topic: 'thermodynamics'
  },
  {
    id: 6,
    question: "\\text{The period of a simple pendulum is:}",
    options: ["T = 2\\pi\\sqrt{\\frac{l}{g}}", "T = 2\\pi\\sqrt{\\frac{g}{l}}", "T = \\pi\\sqrt{\\frac{l}{g}}", "T = \\sqrt{\\frac{l}{g}}"],
    correctAnswer: 0,
    type: 'formula' as const,
    topic: 'waves'
  },
  {
    id: 7,
    question: "\\text{The wave equation relating wavelength, frequency, and speed is:}",
    options: ["\\lambda f = v", "\\lambda / f = v", "\\lambda + f = v", "\\lambda - f = v"],
    correctAnswer: 0,
    type: 'equation' as const,
    topic: 'waves'
  },
  {
    id: 8,
    question: "\\text{The refractive index is defined as:}",
    options: ["n = \\frac{c}{v}", "n = \\frac{v}{c}", "n = cv", "n = c - v"],
    correctAnswer: 0,
    type: 'formula' as const,
    topic: 'optics'
  },
  {
    id: 9,
    question: "\\text{Power in an electrical circuit is given by:}",
    options: ["P = VI", "P = V/I", "P = I/V", "P = V - I"],
    correctAnswer: 0,
    type: 'formula' as const,
    topic: 'electromagnetism'
  },
  {
    id: 10,
    question: "\\text{Hooke's law for elastic deformation is:}",
    options: ["F = kx", "F = k/x", "F = x/k", "F = k + x"],
    correctAnswer: 0,
    type: 'formula' as const,
    topic: 'mechanics'
  }
];

export default function PhysicsDemo() {
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
    samplePhysicsQuestions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const getTopicStats = () => {
    const topics = ['mechanics', 'electromagnetism', 'thermodynamics', 'waves', 'optics', 'modern'];
    return topics.map(topic => {
      const topicQuestions = samplePhysicsQuestions.filter(q => q.topic === topic);
      const correct = topicQuestions.filter(q => answers[q.id] === q.correctAnswer).length;
      return { topic, total: topicQuestions.length, correct };
    }).filter(stat => stat.total > 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Physics Quiz Demo
          </h1>
          <p className="text-gray-600">
            Interactive physics quiz with proper equation and formula rendering
          </p>
        </div>

        {showResults && (
          <div className="mb-8 space-y-6">
            {/* Overall Results */}
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Results</h2>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {calculateScore()}/{samplePhysicsQuestions.length}
                </div>
                <p className="text-gray-600">
                  You got {calculateScore()} out of {samplePhysicsQuestions.length} questions correct!
                </p>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(calculateScore() / samplePhysicsQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Topic-wise Results */}
            <div className="p-6 bg-white rounded-xl shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance by Topic</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {getTopicStats().map(stat => (
                  <div key={stat.topic} className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-sm font-medium text-gray-700 capitalize mb-1">
                      {stat.topic}
                    </div>
                    <div className="text-lg font-bold text-blue-600">
                      {stat.correct}/{stat.total}
                    </div>
                    <div className="text-xs text-gray-500">
                      {Math.round((stat.correct / stat.total) * 100)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <PhysicsQuiz 
          questions={samplePhysicsQuestions}
          onAnswerSelect={handleAnswerSelect}
          showResults={showResults}
        />

        <div className="mt-8 flex justify-center gap-4">
          {!showResults ? (
            <Button 
              onClick={handleSubmit}
              disabled={Object.keys(answers).length !== samplePhysicsQuestions.length}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700"
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

        {/* Physics Formula Examples */}
        <div className="mt-12 p-6 bg-white rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Physics Formula Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Mechanics:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Force: F = ma</li>
                <li>Kinetic Energy: KE = ½mv²</li>
                <li>Potential Energy: PE = mgh</li>
                <li>Momentum: p = mv</li>
                <li>Work: W = F·d</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Electromagnetism:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Ohm&apos;s Law: V = IR</li>
                <li>Power: P = VI = I²R</li>
                <li>Coulomb&apos;s Law: F = kq₁q₂/r²</li>
                <li>Electric Field: E = F/q</li>
                <li>Magnetic Force: F = qvB</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Waves & Optics:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Wave Speed: v = fλ</li>
                <li>Refractive Index: n = c/v</li>
                <li>Snell&apos;s Law: n₁sinθ₁ = n₂sinθ₂</li>
                <li>Frequency: f = 1/T</li>
                <li>Pendulum Period: T = 2π√(l/g)</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Modern Physics:</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Mass-Energy: E = mc²</li>
                <li>Photon Energy: E = hf</li>
                <li>de Broglie: λ = h/p</li>
                <li>Planck&apos;s Constant: h = 6.626×10⁻³⁴ J·s</li>
                <li>Speed of Light: c = 3×10⁸ m/s</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 p-6 bg-blue-50 rounded-xl border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">About Physics Rendering</h3>
          <ul className="text-blue-800 space-y-2 text-sm">
            <li>• Physics equations are automatically rendered with proper mathematical notation</li>
            <li>• Greek letters (α, β, γ, θ, λ, μ, π, ω) are properly displayed</li>
            <li>• Units are formatted correctly (m/s², kg·m/s², J, W, V, A, Ω)</li>
            <li>• Mathematical operations (sin, cos, log, √, ∫, ∑) are properly formatted</li>
            <li>• Vectors, subscripts, and superscripts are handled automatically</li>
            <li>• Perfect for JEE Physics, NEET Physics, and other competitive exams</li>
          </ul>
        </div>
      </div>
    </div>
  );
}