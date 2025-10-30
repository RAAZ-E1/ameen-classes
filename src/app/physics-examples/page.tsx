import { PhysicsFormula, PhysicsEquation, PhysicsConstant, PhysicsUnit } from '@/components/physics-formula-renderer';

export default function PhysicsExamples() {
  const mechanicsFormulas = [
    'F = ma', 'v = u + at', 's = ut + \\frac{1}{2}at^2', 'v^2 = u^2 + 2as',
    'KE = \\frac{1}{2}mv^2', 'PE = mgh', 'p = mv', 'W = F \\cdot d'
  ];

  const electromagnetismFormulas = [
    'V = IR', 'P = VI', 'P = I^2R', 'F = \\frac{kq_1q_2}{r^2}',
    'E = \\frac{F}{q}', 'F = qvB', 'B = \\frac{\\mu_0I}{2\\pi r}'
  ];

  const wavesOpticsFormulas = [
    'v = f\\lambda', 'f = \\frac{1}{T}', 'n = \\frac{c}{v}',
    'T = 2\\pi\\sqrt{\\frac{l}{g}}', 'n_1\\sin\\theta_1 = n_2\\sin\\theta_2'
  ];

  const modernPhysicsFormulas = [
    'E = mc^2', 'E = hf', '\\lambda = \\frac{h}{p}', 'E = \\frac{hc}{\\lambda}'
  ];

  const physicsConstants = [
    { name: 'Speed of Light', symbol: 'c', value: '3.00 × 10⁸', unit: 'm/s' },
    { name: 'Planck Constant', symbol: 'h', value: '6.626 × 10⁻³⁴', unit: 'J·s' },
    { name: 'Gravitational Constant', symbol: 'G', value: '6.674 × 10⁻¹¹', unit: 'N·m²/kg²' },
    { name: 'Elementary Charge', symbol: 'e', value: '1.602 × 10⁻¹⁹', unit: 'C' },
    { name: 'Electron Mass', symbol: 'm_e', value: '9.109 × 10⁻³¹', unit: 'kg' },
    { name: 'Proton Mass', symbol: 'm_p', value: '1.673 × 10⁻²⁷', unit: 'kg' }
  ];

  const physicsUnits = [
    { unit: 'N', description: 'Newton (Force)' },
    { unit: 'J', description: 'Joule (Energy)' },
    { unit: 'W', description: 'Watt (Power)' },
    { unit: 'V', description: 'Volt (Voltage)' },
    { unit: 'A', description: 'Ampere (Current)' },
    { unit: '\\Omega', description: 'Ohm (Resistance)' },
    { unit: 'Hz', description: 'Hertz (Frequency)' },
    { unit: 'Pa', description: 'Pascal (Pressure)' },
    { unit: 'T', description: 'Tesla (Magnetic Field)' },
    { unit: 'Wb', description: 'Weber (Magnetic Flux)' }
  ];

  const complexEquations = [
    'F = G\\frac{m_1m_2}{r^2}',
    'E = \\frac{1}{2}\\epsilon_0E^2',
    '\\nabla \\cdot \\vec{E} = \\frac{\\rho}{\\epsilon_0}',
    '\\nabla \\times \\vec{B} = \\mu_0\\vec{J} + \\mu_0\\epsilon_0\\frac{\\partial\\vec{E}}{\\partial t}',
    'i\\hbar\\frac{\\partial\\psi}{\\partial t} = \\hat{H}\\psi',
    'ds^2 = c^2dt^2 - dx^2 - dy^2 - dz^2'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Physics Formula Examples
          </h1>
          <p className="text-xl text-gray-600">
            Comprehensive examples of physics formula rendering with proper mathematical notation
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Mechanics */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Classical Mechanics</h2>
            <div className="space-y-3">
              {mechanicsFormulas.map((formula, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600 text-sm font-mono">{formula.replace(/\\/g, '')}</span>
                  <PhysicsFormula formula={formula} className="text-lg" />
                </div>
              ))}
            </div>
          </div>

          {/* Electromagnetism */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Electromagnetism</h2>
            <div className="space-y-3">
              {electromagnetismFormulas.map((formula, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600 text-sm font-mono">{formula.replace(/\\/g, '')}</span>
                  <PhysicsFormula formula={formula} className="text-lg" />
                </div>
              ))}
            </div>
          </div>

          {/* Waves & Optics */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Waves & Optics</h2>
            <div className="space-y-3">
              {wavesOpticsFormulas.map((formula, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600 text-sm font-mono">{formula.replace(/\\/g, '')}</span>
                  <PhysicsFormula formula={formula} className="text-lg" />
                </div>
              ))}
            </div>
          </div>

          {/* Modern Physics */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Modern Physics</h2>
            <div className="space-y-3">
              {modernPhysicsFormulas.map((formula, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600 text-sm font-mono">{formula.replace(/\\/g, '')}</span>
                  <PhysicsFormula formula={formula} className="text-lg" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Physics Constants */}
        <div className="mt-12 bg-white p-8 rounded-xl shadow-sm border">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Fundamental Constants</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {physicsConstants.map((constant, index) => (
              <PhysicsConstant
                key={index}
                name={constant.name}
                symbol={constant.symbol}
                value={constant.value}
                unit={constant.unit}
              />
            ))}
          </div>
        </div>

        {/* Physics Units */}
        <div className="mt-8 bg-white p-8 rounded-xl shadow-sm border">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Common Physics Units</h2>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {physicsUnits.map((unit, index) => (
              <PhysicsUnit
                key={index}
                unit={unit.unit}
                description={unit.description}
                className="p-3 bg-gray-50 rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* Complex Equations */}
        <div className="mt-8 bg-white p-8 rounded-xl shadow-sm border">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Advanced Physics Equations</h2>
          <div className="space-y-4">
            {complexEquations.map((equation, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <PhysicsEquation equation={equation} className="text-center" />
              </div>
            ))}
          </div>
        </div>

        {/* Usage Examples */}
        <div className="mt-8 bg-white p-8 rounded-xl shadow-sm border">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Usage Examples</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Simple Formula</h3>
              <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm mb-2">
                {`<PhysicsFormula formula="F = ma" />`}
              </div>
              <div className="text-xl">
                Result: <PhysicsFormula formula="F = ma" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Complex Equation</h3>
              <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm mb-2">
                {`<PhysicsEquation equation="E = \\frac{1}{2}mv^2 + mgh" />`}
              </div>
              <div className="text-xl">
                Result: <PhysicsEquation equation="E = \\frac{1}{2}mv^2 + mgh" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Physics Constant</h3>
              <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm mb-2">
                {`<PhysicsConstant name="Speed of Light" symbol="c" value="3.00 × 10⁸" unit="m/s" />`}
              </div>
              <div>
                Result: 
                <PhysicsConstant 
                  name="Speed of Light" 
                  symbol="c" 
                  value="3.00 × 10⁸" 
                  unit="m/s" 
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Integration Guide */}
        <div className="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Integration with Quiz Components</h3>
          <ul className="text-blue-800 space-y-2 text-sm">
            <li>• Store physics equations as plain text in your database (e.g., &quot;F = ma&quot;, &quot;E = mc^2&quot;)</li>
            <li>• Components automatically convert to proper LaTeX with mathematical notation</li>
            <li>• Greek letters (α, β, γ, θ, λ, μ, π, ω) are automatically formatted</li>
            <li>• Units are properly formatted (m/s², kg·m/s², J, W, V, A, Ω)</li>
            <li>• Mathematical functions (sin, cos, log, √, ∫, ∑) are handled correctly</li>
            <li>• Perfect for JEE Physics, NEET Physics, and competitive exam preparation</li>
            <li>• Supports vectors, subscripts, superscripts, and complex equations</li>
          </ul>
        </div>
      </div>
    </div>
  );
}