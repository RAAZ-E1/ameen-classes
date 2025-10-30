import { ChemistryFormula, ChemicalEquation } from '@/components/chemistry-formula-renderer';

export default function ChemistryExamples() {
  const commonFormulas = [
    'H2O', 'CO2', 'H2SO4', 'NaCl', 'CaCO3', 'NH3', 'CH4', 'C6H12O6',
    'Ca(OH)2', 'Al2(SO4)3', 'KMnO4', 'K2Cr2O7', 'NH4NO3', 'AgNO3'
  ];

  const ionFormulas = [
    'H+', 'OH-', 'Na+', 'Cl-', 'Ca2+', 'Mg2+', 'Al3+', 'Fe2+', 'Fe3+',
    'SO42-', 'CO32-', 'NO3-', 'PO43-', 'NH4+'
  ];

  const organicCompounds = [
    'CH4', 'C2H6', 'C2H4', 'C2H2', 'C6H6', 'CH3OH', 'C2H5OH',
    'CH3COOH', 'C6H12O6', 'C12H22O11'
  ];

  const chemicalEquations = [
    'H2 + Cl2 → 2HCl',
    '2Na + Cl2 → 2NaCl',
    'CaCO3 → CaO + CO2',
    'Mg + 2HCl → MgCl2 + H2',
    '2H2O2 → 2H2O + O2',
    'CH4 + 2O2 → CO2 + 2H2O',
    'C6H12O6 + 6O2 → 6CO2 + 6H2O',
    'N2 + 3H2 ⇌ 2NH3'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Chemistry Formula Examples
          </h1>
          <p className="text-xl text-gray-600">
            Comprehensive examples of chemistry formula rendering with proper subscripts and superscripts
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Common Chemical Compounds */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Common Chemical Compounds</h2>
            <div className="grid grid-cols-2 gap-4">
              {commonFormulas.map((formula, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600 text-sm">{formula}</span>
                  <ChemistryFormula formula={formula} className="text-lg" />
                </div>
              ))}
            </div>
          </div>

          {/* Ions */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Common Ions</h2>
            <div className="grid grid-cols-2 gap-4">
              {ionFormulas.map((formula, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600 text-sm">{formula}</span>
                  <ChemistryFormula formula={formula} className="text-lg" />
                </div>
              ))}
            </div>
          </div>

          {/* Organic Compounds */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Organic Compounds</h2>
            <div className="grid grid-cols-2 gap-4">
              {organicCompounds.map((formula, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600 text-sm">{formula}</span>
                  <ChemistryFormula formula={formula} className="text-lg" />
                </div>
              ))}
            </div>
          </div>

          {/* Chemical Equations */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Chemical Equations</h2>
            <div className="space-y-4">
              {chemicalEquations.map((equation, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-gray-600 text-sm mb-2">{equation}</div>
                  <ChemicalEquation equation={equation} className="text-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="mt-12 bg-white p-8 rounded-xl shadow-sm border">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Usage Examples</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Simple Formula Rendering</h3>
              <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm mb-2">
                {`<ChemistryFormula formula="H2SO4" />`}
              </div>
              <div className="text-xl">
                Result: <ChemistryFormula formula="H2SO4" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Chemical Equation</h3>
              <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm mb-2">
                {`<ChemicalEquation equation="2H2 + O2 → 2H2O" />`}
              </div>
              <div className="text-xl">
                Result: <ChemicalEquation equation="2H2 + O2 → 2H2O" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Complex Compound</h3>
              <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm mb-2">
                {`<ChemistryFormula formula="Ca3(PO4)2" />`}
              </div>
              <div className="text-xl">
                Result: <ChemistryFormula formula="Ca3(PO4)2" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Ion with Charge</h3>
              <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm mb-2">
                {`<ChemistryFormula formula="SO42-" />`}
              </div>
              <div className="text-xl">
                Result: <ChemistryFormula formula="SO42-" />
              </div>
            </div>
          </div>
        </div>

        {/* Integration with Quiz */}
        <div className="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Integration with Quiz Components</h3>
          <p className="text-blue-800 mb-4">
            These chemistry formulas can be seamlessly integrated into your quiz questions:
          </p>
          <ul className="text-blue-800 space-y-2 text-sm">
            <li>• Store formulas as plain text in your MongoDB database (e.g., &quot;H2SO4&quot;, &quot;Ca(OH)2&quot;)</li>
            <li>• The components automatically convert them to proper LaTeX with subscripts and superscripts</li>
            <li>• Works with the existing Quiz, MathQuiz, and ChemistryQuiz components</li>
            <li>• Perfect for NEET Chemistry, JEE Chemistry, and other competitive exams</li>
            <li>• Supports complex organic compounds, inorganic salts, and chemical equations</li>
          </ul>
        </div>
      </div>
    </div>
  );
}