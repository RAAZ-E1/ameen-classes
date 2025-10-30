import { InlineMath } from "react-katex";
import 'katex/dist/katex.min.css';
import { enhancedChemistryToLatex } from '@/lib/math-quiz-utils';

interface ChemistryFormulaProps {
  formula: string;
  className?: string;
}

/**
 * Simple component to render chemistry formulas with proper subscripts and superscripts
 * Usage: <ChemistryFormula formula="H2SO4" />
 */
export function ChemistryFormula({ formula, className = "" }: ChemistryFormulaProps) {
  const latexFormula = enhancedChemistryToLatex(formula);
  
  return (
    <span className={className}>
      <InlineMath math={latexFormula} />
    </span>
  );
}

/**
 * Component for rendering multiple chemistry formulas in a list
 */
interface ChemistryFormulaListProps {
  formulas: string[];
  className?: string;
}

export function ChemistryFormulaList({ formulas, className = "" }: ChemistryFormulaListProps) {
  return (
    <div className={className}>
      {formulas.map((formula, index) => (
        <div key={index} className="mb-2">
          <ChemistryFormula formula={formula} />
        </div>
      ))}
    </div>
  );
}

/**
 * Component for rendering chemical equations
 */
interface ChemicalEquationProps {
  equation: string;
  className?: string;
}

export function ChemicalEquation({ equation, className = "" }: ChemicalEquationProps) {
  // Convert arrow symbols to LaTeX
  const latexEquation = enhancedChemistryToLatex(equation)
    .replace(/→/g, '\\rightarrow')
    .replace(/->/g, '\\rightarrow')
    .replace(/⇌/g, '\\rightleftharpoons')
    .replace(/<->/g, '\\rightleftharpoons')
    .replace(/\+/g, ' + ')
    .replace(/=/g, ' = ');
  
  return (
    <div className={className}>
      <InlineMath math={latexEquation} />
    </div>
  );
}