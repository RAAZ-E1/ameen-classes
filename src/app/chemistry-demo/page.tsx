"use client";

import { useState } from 'react';
import ChemistryQuiz from '@/components/chemistry-quiz';
import { Button } from '@/components/ui/button';

// Sample chemistry questions with proper formulas
const sampleChemistryQuestions = [
  {
    id: 1,
    question: "\\text{What is the molecular formula of water?}",
    options: ["H2O", "H2O2", "HO", "H3O"],
    correctAnswer: 0,
    type: 'formula' as const
  },
  {
    id: 2,
    question: "\\text{Balance the equation: } \\text{C} + \\text{O}_2 \\rightarrow \\text{CO}_2",
    options: ["C + O2 → CO2", "2C + O2 → 2CO", "C + 2O2 → CO2", "2C + 2O2 → 2CO2"],
    correctAnswer: 0,
    type: 'equation' as const
  },
  {
    id: 3,
    question: "\\text{What is the charge on sulfate ion?}",
    options: ["SO42-", "SO4-", "SO43-", "SO4+"],
    correctAnswer: 0,
    type: 'formula' as const
  },
  {
    id: 4,
    question: "\\text{Which compound is calcium carbonate?}",
    options: ["CaCO3", "Ca(CO3)2", "CaC2O3", "Ca2CO3"],
    correctAnswer: 0,
    type: 'formula' as const
  },
  {
    id: 5,
    question: "\\text{What is the formula for sulfuric acid?}",
    options: ["H2SO4", "HSO4", "H2SO3", "H3SO4"],
    correctAnswer: 0,
    type: 'formula' as const
  },
  {
    id: 6,
    question: "\\text{Balance: } \\text{Mg} + \\text{HCl} \\rightarrow \\text{MgCl}_2 + \\text{H}_2",
    options: ["Mg + 2HCl → MgCl2 + H2", "2Mg + HCl → MgCl2 + H2", "Mg + HCl → MgCl + H2", "Mg + 3HCl → MgCl2 + H2"],
    correctAnswer: 0,
    type: 'equation' as const
  },
  {
    id: 7,
    question: "\\text{What is the molecular formula of glucose?}",
    options: ["C6H12O6", "C6H6O6", "C12H22O11", "C6H10O5"],
    correctAnswer: 0,
    type: 'formula' as const
  },
  {
    id: 8,
    question: "\\text{Which ion has a 3+ charge?}",
    options: ["Al3+", "Ca2+", "Na+", "Cl-"],
    correctAnswer: 0,
    type: 'formula' as const
  }
];

export default function ChemistryDemo() {
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
    sampleChemistryQuestions.forEach(q => {
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
            Chemistry Quiz Demo
          </h1>
          <p className="text-gray-600">
            Interactive chemistry quiz with proper formula rendering
          </p>
        </div>

        {showResults && (
          <div className="mb-8 p-6 bg-white rounded-xl shadow-sm border">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Results</h2>
              <div className="text-4xl font-bold text-green-600 mb-2">
                {calculateScore()}/{sampleChemistryQuestions.length}
              </div>
              <p className="text-gray-600">
                You got {calculateScore()} out of {sampleChemistryQuestions.length} questions correct!
              </p>
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-green-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(calculateScore() / sampleChemistryQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <ChemistryQuiz 
          questions={sampleChemistryQuestions}
          onAnswerSelect={handleAnswerSelect}
          showResults={showResults}
        />

        <div className="mt-8 flex justify-center gap-4">
          {!showResults ? (
            <Button 
              onClick={handleSubmit}
              disabled={Object.keys(answers).length !== sampleChemistryQuestions.length}
              className="px-8 py-3 bg-green-600 hover:bg-green-700"
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

        {/* Chemistry Formula Examples */}
        <div className="mt-12 p-6 bg-white rounded-xl border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Chemistry Formula Examples</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Common Compounds:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>Water: H₂O</li>
                <li>Carbon Dioxide: CO₂</li>
                <li>Sulfuric Acid: H₂SO₄</li>
                <li>Glucose: C₆H₁₂O₆</li>
                <li>Calcium Carbonate: CaCO₃</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Common Ions:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>Hydrogen: H⁺</li>
                <li>Hydroxide: OH⁻</li>
                <li>Calcium: Ca²⁺</li>
                <li>Aluminum: Al³⁺</li>
                <li>Sulfate: SO₄²⁻</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 p-6 bg-green-50 rounded-xl border border-green-200">
          <h3 className="text-lg font-semibold text-green-900 mb-3">About Chemistry Rendering</h3>
          <ul className="text-green-800 space-y-2 text-sm">
            <li>• Chemical formulas are automatically rendered with proper subscripts (H₂O, CO₂)</li>
            <li>• Ion charges are displayed with superscripts (Ca²⁺, SO₄²⁻)</li>
            <li>• Chemical equations are balanced and properly formatted</li>
            <li>• Perfect for NEET Chemistry, JEE Chemistry, and other competitive exams</li>
            <li>• Supports complex organic compounds and inorganic salts</li>
          </ul>
        </div>
      </div>
    </div>
  );
}