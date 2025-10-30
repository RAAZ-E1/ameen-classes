import { InlineMath, BlockMath } from "react-katex";
import 'katex/dist/katex.min.css';
import { physicsToLatex } from '@/lib/math-quiz-utils';

interface PhysicsFormulaProps {
  formula: string;
  className?: string;
}

/**
 * Simple component to render physics formulas with proper mathematical notation
 * Usage: <PhysicsFormula formula="F = ma" />
 */
export function PhysicsFormula({ formula, className = "" }: PhysicsFormulaProps) {
  const latexFormula = physicsToLatex(formula);
  
  return (
    <span className={className}>
      <InlineMath math={latexFormula} />
    </span>
  );
}

/**
 * Component for rendering physics equations as block elements
 */
interface PhysicsEquationProps {
  equation: string;
  className?: string;
}

export function PhysicsEquation({ equation, className = "" }: PhysicsEquationProps) {
  const latexEquation = physicsToLatex(equation);
  
  return (
    <div className={className}>
      <BlockMath math={latexEquation} />
    </div>
  );
}

/**
 * Component for rendering multiple physics formulas in a list
 */
interface PhysicsFormulaListProps {
  formulas: string[];
  className?: string;
}

export function PhysicsFormulaList({ formulas, className = "" }: PhysicsFormulaListProps) {
  return (
    <div className={className}>
      {formulas.map((formula, index) => (
        <div key={index} className="mb-2">
          <PhysicsFormula formula={formula} />
        </div>
      ))}
    </div>
  );
}

/**
 * Component for displaying physics constants with proper notation
 */
interface PhysicsConstantProps {
  name: string;
  symbol: string;
  value: string;
  unit: string;
  className?: string;
}

export function PhysicsConstant({ name, symbol, value, unit, className = "" }: PhysicsConstantProps) {
  const symbolLatex = physicsToLatex(symbol);
  const unitLatex = physicsToLatex(unit);
  
  return (
    <div className={`p-3 bg-gray-50 rounded-lg ${className}`}>
      <div className="font-medium text-gray-900 mb-1">{name}</div>
      <div className="flex items-center gap-2">
        <InlineMath math={symbolLatex} />
        <span className="text-gray-600">=</span>
        <span className="text-gray-800">{value}</span>
        <InlineMath math={unitLatex} />
      </div>
    </div>
  );
}

/**
 * Component for displaying physics units with proper formatting
 */
interface PhysicsUnitProps {
  unit: string;
  description?: string;
  className?: string;
}

export function PhysicsUnit({ unit, description, className = "" }: PhysicsUnitProps) {
  const unitLatex = physicsToLatex(unit);
  
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <InlineMath math={unitLatex} />
      {description && <span className="text-gray-600 text-sm">({description})</span>}
    </div>
  );
}