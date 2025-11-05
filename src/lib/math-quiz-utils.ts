// Database operations moved to API calls

export interface MathQuestion {
  id: number;
  question: string;
  options: string[];
  correct_answer?: number;
}

/**
 * Fetch questions from MongoDB and format them for the math quiz component
 */
export async function fetchMathQuestions(): Promise<MathQuestion[]> {
  try {
    const response = await fetch('/api/questions?subject=Mathematics&limit=20');
    const result = await response.json();
    
    if (!result.success || !result.questions) {
      return [];
    }

    return result.questions.map((q: { id: string; question: string; options: string[]; correct_answer: number }) => ({
      id: q.id,
      question: q.question,
      options: Array.isArray(q.options) ? q.options : [],
      correct_answer: q.correct_answer
    }));
    
  } catch (error) {
    console.error('Error fetching math questions:', error);
    return [];
  }
}

/**
 * Validate LaTeX syntax (basic validation)
 */
export function validateLatex(latex: string): boolean {
  try {
    // Basic checks for common LaTeX issues
    const openBraces = (latex.match(/\{/g) || []).length;
    const closeBraces = (latex.match(/\}/g) || []).length;
    
    if (openBraces !== closeBraces) {
      return false;
    }

    // Check for unescaped special characters that might cause issues
    const problematicChars = /[&%$#_{}~^\\]/g;
    const matches = latex.match(problematicChars);
    
    if (matches) {
      // Allow properly escaped characters
      const properlyEscaped = /\\[&%$#_{}~^\\]/g;
      const escapedMatches = latex.match(properlyEscaped) || [];
      
      if (matches.length > escapedMatches.length) {
        console.warn('Potentially unescaped special characters found in LaTeX');
      }
    }

    return true;
  } catch (error) {
    console.error('Error validating LaTeX:', error);
    return false;
  }
}

/**
 * Clean and prepare LaTeX text for rendering
 */
export function cleanLatex(latex: string): string {
  return latex
    .trim()
    // Remove any HTML tags that might interfere
    .replace(/<[^>]*>/g, '')
    // Ensure proper spacing around operators
    .replace(/([+\-=])/g, ' $1 ')
    // Clean up multiple spaces
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Convert plain text math to LaTeX format
 */
export function textToLatex(text: string): string {
  return text
    // Convert fractions like 1/2 to \frac{1}{2}
    .replace(/(\d+)\/(\d+)/g, '\\frac{$1}{$2}')
    // Convert exponents like x^2 to x^{2}
    .replace(/\^(\d+)/g, '^{$1}')
    // Convert square roots
    .replace(/sqrt\(([^)]+)\)/g, '\\sqrt{$1}')
    // Convert integrals
    .replace(/integral/gi, '\\int')
    // Convert summations
    .replace(/sum/gi, '\\sum')
    // Convert Greek letters
    .replace(/\balpha\b/gi, '\\alpha')
    .replace(/\bbeta\b/gi, '\\beta')
    .replace(/\bgamma\b/gi, '\\gamma')
    .replace(/\bdelta\b/gi, '\\delta')
    .replace(/\bpi\b/gi, '\\pi')
    .replace(/\btheta\b/gi, '\\theta')
    .replace(/\blambda\b/gi, '\\lambda')
    .replace(/\bmu\b/gi, '\\mu')
    .replace(/\bsigma\b/gi, '\\sigma');
}

/**
 * Convert chemistry formulas to proper LaTeX format with subscripts and superscripts
 */
export function chemistryToLatex(text: string): string {
  return text
    // Handle common chemical formulas with subscripts
    .replace(/H2O/g, 'H_2O')
    .replace(/CO2/g, 'CO_2')
    .replace(/H2SO4/g, 'H_2SO_4')
    .replace(/NaCl/g, 'NaCl')
    .replace(/CaCO3/g, 'CaCO_3')
    .replace(/NH3/g, 'NH_3')
    .replace(/CH4/g, 'CH_4')
    .replace(/C2H6/g, 'C_2H_6')
    .replace(/C2H4/g, 'C_2H_4')
    .replace(/C2H2/g, 'C_2H_2')
    .replace(/C6H12O6/g, 'C_6H_{12}O_6')
    .replace(/NaOH/g, 'NaOH')
    .replace(/HCl/g, 'HCl')
    .replace(/HNO3/g, 'HNO_3')
    .replace(/H3PO4/g, 'H_3PO_4')
    .replace(/Ca\(OH\)2/g, 'Ca(OH)_2')
    .replace(/Mg\(OH\)2/g, 'Mg(OH)_2')
    .replace(/Al2O3/g, 'Al_2O_3')
    .replace(/Fe2O3/g, 'Fe_2O_3')
    .replace(/CuSO4/g, 'CuSO_4')
    .replace(/AgNO3/g, 'AgNO_3')
    .replace(/BaCl2/g, 'BaCl_2')
    .replace(/KMnO4/g, 'KMnO_4')
    .replace(/K2Cr2O7/g, 'K_2Cr_2O_7')
    .replace(/Na2CO3/g, 'Na_2CO_3')
    .replace(/CaCl2/g, 'CaCl_2')
    .replace(/MgSO4/g, 'MgSO_4')
    .replace(/ZnSO4/g, 'ZnSO_4')
    .replace(/FeSO4/g, 'FeSO_4')
    .replace(/Al2\(SO4\)3/g, 'Al_2(SO_4)_3')
    .replace(/Ca3\(PO4\)2/g, 'Ca_3(PO_4)_2')
    
    // Handle ions with charges (superscripts)
    .replace(/H\+/g, 'H^+')
    .replace(/OH-/g, 'OH^-')
    .replace(/Na\+/g, 'Na^+')
    .replace(/Cl-/g, 'Cl^-')
    .replace(/Ca2\+/g, 'Ca^{2+}')
    .replace(/Mg2\+/g, 'Mg^{2+}')
    .replace(/Al3\+/g, 'Al^{3+}')
    .replace(/Fe2\+/g, 'Fe^{2+}')
    .replace(/Fe3\+/g, 'Fe^{3+}')
    .replace(/Cu2\+/g, 'Cu^{2+}')
    .replace(/Zn2\+/g, 'Zn^{2+}')
    .replace(/SO42-/g, 'SO_4^{2-}')
    .replace(/CO32-/g, 'CO_3^{2-}')
    .replace(/NO3-/g, 'NO_3^-')
    .replace(/PO43-/g, 'PO_4^{3-}')
    .replace(/NH4\+/g, 'NH_4^+')
    
    // Generic patterns for subscripts (numbers after elements)
    .replace(/([A-Z][a-z]?)(\d+)/g, '$1_{$2}')
    
    // Generic patterns for charges
    .replace(/(\+|\-)(\d+)/g, '^{$2$1}')
    .replace(/(\d+)(\+|\-)/g, '^{$1$2}')
    
    // Handle parentheses with subscripts
    .replace(/\)(\d+)/g, ')_{$1}');
}

/**
 * Convert physics equations and formulas to proper LaTeX format
 */
export function physicsToLatex(text: string): string {
  return text
    // Enhanced physics formulas with better pattern matching
    .replace(/F\s*=\s*ma\b/gi, 'F = ma')
    .replace(/E\s*=\s*mc2\b/gi, 'E = mc^2')
    .replace(/E\s*=\s*mc\^2\b/gi, 'E = mc^2')
    .replace(/E\s*=\s*hf\b/gi, 'E = hf')
    .replace(/E\s*=\s*h\\nu\b/gi, 'E = h\\nu')
    .replace(/v\s*=\s*u\s*\+\s*at\b/gi, 'v = u + at')
    .replace(/s\s*=\s*ut\s*\+\s*(1\/2)at2\b/gi, 's = ut + \\frac{1}{2}at^2')
    .replace(/s\s*=\s*ut\s*\+\s*\\frac\{1\}\{2\}at\^2\b/gi, 's = ut + \\frac{1}{2}at^2')
    .replace(/v2\s*=\s*u2\s*\+\s*2as\b/gi, 'v^2 = u^2 + 2as')
    .replace(/v\^2\s*=\s*u\^2\s*\+\s*2as\b/gi, 'v^2 = u^2 + 2as')
    .replace(/PV\s*=\s*nRT\b/gi, 'PV = nRT')
    .replace(/V\s*=\s*IR\b/gi, 'V = IR')
    .replace(/P\s*=\s*VI\b/gi, 'P = VI')
    .replace(/P\s*=\s*I2R\b/gi, 'P = I^2R')
    .replace(/P\s*=\s*I\^2R\b/gi, 'P = I^2R')
    .replace(/P\s*=\s*V2\/R\b/gi, 'P = \\frac{V^2}{R}')
    .replace(/F\s*=\s*kx\b/gi, 'F = kx')
    .replace(/F\s*=\s*G\s*\\frac\{m1m2\}\{r\^2\}/gi, 'F = G\\frac{m_1m_2}{r^2}')
    .replace(/F\s*=\s*G\s*m1m2\/r2\b/gi, 'F = G\\frac{m_1m_2}{r^2}')
    .replace(/T\s*=\s*2π√\(l\/g\)/gi, 'T = 2\\pi\\sqrt{\\frac{l}{g}}')
    .replace(/T\s*=\s*2\\pi\\sqrt\{\\frac\{l\}\{g\}\}/gi, 'T = 2\\pi\\sqrt{\\frac{l}{g}}')
    .replace(/f\s*=\s*1\/T\b/gi, 'f = \\frac{1}{T}')
    .replace(/λf\s*=\s*v\b/gi, '\\lambda f = v')
    .replace(/\\lambda f\s*=\s*v\b/gi, '\\lambda f = v')
    .replace(/n\s*=\s*c\/v\b/gi, 'n = \\frac{c}{v}')
    .replace(/\\frac\{1\}\{2\}mv2\b/gi, '\\frac{1}{2}mv^2')
    .replace(/KE\s*=\s*(1\/2)mv2\b/gi, 'KE = \\frac{1}{2}mv^2')
    .replace(/PE\s*=\s*mgh\b/gi, 'PE = mgh')
    .replace(/W\s*=\s*Fd\b/gi, 'W = Fd')
    .replace(/W\s*=\s*F\s*\\cdot\s*d\b/gi, 'W = F \\cdot d')
    .replace(/p\s*=\s*mv\b/gi, 'p = mv')
    .replace(/I\s*=\s*mr2\b/gi, 'I = mr^2')
    .replace(/τ\s*=\s*rF\b/gi, '\\tau = rF')
    .replace(/τ\s*=\s*Iα\b/gi, '\\tau = I\\alpha')
    .replace(/ω\s*=\s*2πf\b/gi, '\\omega = 2\\pi f')
    .replace(/v\s*=\s*rω\b/gi, 'v = r\\omega')
    .replace(/a\s*=\s*rα\b/gi, 'a = r\\alpha')
    .replace(/Q\s*=\s*mcΔT\b/gi, 'Q = mc\\Delta T')
    .replace(/Q\s*=\s*mc\\Delta T\b/gi, 'Q = mc\\Delta T')
    
    // Electromagnetic formulas
    .replace(/F\s*=\s*qE\b/gi, 'F = qE')
    .replace(/F\s*=\s*qvB\b/gi, 'F = qvB')
    .replace(/F\s*=\s*BIl\b/gi, 'F = BIl')
    .replace(/\\Phi\s*=\s*BA\b/gi, '\\Phi = BA')
    .replace(/\\varepsilon\s*=\s*-\\frac\{d\\Phi\}\{dt\}/gi, '\\varepsilon = -\\frac{d\\Phi}{dt}')
    .replace(/C\s*=\s*\\frac\{Q\}\{V\}/gi, 'C = \\frac{Q}{V}')
    .replace(/C\s*=\s*Q\/V\b/gi, 'C = \\frac{Q}{V}')
    
    // Wave equations
    .replace(/v\s*=\s*fλ\b/gi, 'v = f\\lambda')
    .replace(/v\s*=\s*f\\lambda\b/gi, 'v = f\\lambda')
    .replace(/T\s*=\s*1\/f\b/gi, 'T = \\frac{1}{f}')
    
    // Quantum physics
    .replace(/E\s*=\s*hf\b/gi, 'E = hf')
    .replace(/E\s*=\s*\\frac\{hc\}\{\\lambda\}/gi, 'E = \\frac{hc}{\\lambda}')
    .replace(/p\s*=\s*\\frac\{h\}\{\\lambda\}/gi, 'p = \\frac{h}{\\lambda}')
    .replace(/\\lambda\s*=\s*\\frac\{h\}\{p\}/gi, '\\lambda = \\frac{h}{p}')
    
    // Thermodynamics
    .replace(/\\Delta U\s*=\s*Q\s*-\s*W\b/gi, '\\Delta U = Q - W')
    .replace(/PV\\gamma\s*=\s*constant\b/gi, 'PV^\\gamma = \\text{constant}')
    .replace(/\\eta\s*=\s*1\s*-\s*\\frac\{T_c\}\{T_h\}/gi, '\\eta = 1 - \\frac{T_c}{T_h}')
    
    // Units with better context awareness
    .replace(/\b(\d+(?:\.\d+)?)\s*m\/s2\b/g, '$1\\,\\text{m/s}^2')
    .replace(/\b(\d+(?:\.\d+)?)\s*m\/s\^2\b/g, '$1\\,\\text{m/s}^2')
    .replace(/\b(\d+(?:\.\d+)?)\s*m\/s\b/g, '$1\\,\\text{m/s}')
    .replace(/\b(\d+(?:\.\d+)?)\s*kg\b/g, '$1\\,\\text{kg}')
    .replace(/\b(\d+(?:\.\d+)?)\s*N\b/g, '$1\\,\\text{N}')
    .replace(/\b(\d+(?:\.\d+)?)\s*J\b/g, '$1\\,\\text{J}')
    .replace(/\b(\d+(?:\.\d+)?)\s*W\b/g, '$1\\,\\text{W}')
    .replace(/\b(\d+(?:\.\d+)?)\s*V\b/g, '$1\\,\\text{V}')
    .replace(/\b(\d+(?:\.\d+)?)\s*A\b/g, '$1\\,\\text{A}')
    .replace(/\b(\d+(?:\.\d+)?)\s*Ω\b/g, '$1\\,\\Omega')
    .replace(/\b(\d+(?:\.\d+)?)\s*ohm\b/g, '$1\\,\\Omega')
    .replace(/\b(\d+(?:\.\d+)?)\s*Hz\b/g, '$1\\,\\text{Hz}')
    .replace(/\b(\d+(?:\.\d+)?)\s*Pa\b/g, '$1\\,\\text{Pa}')
    .replace(/\b(\d+(?:\.\d+)?)\s*K\b/g, '$1\\,\\text{K}')
    .replace(/\b(\d+(?:\.\d+)?)\s*°C\b/g, '$1\\,°\\text{C}')
    .replace(/\b(\d+(?:\.\d+)?)\s*°F\b/g, '$1\\,°\\text{F}')
    
    // Greek letters commonly used in physics
    .replace(/\btheta\b/gi, '\\theta')
    .replace(/\bphi\b/gi, '\\phi')
    .replace(/\bomega\b/gi, '\\omega')
    .replace(/\balpha\b/gi, '\\alpha')
    .replace(/\bbeta\b/gi, '\\beta')
    .replace(/\bgamma\b/gi, '\\gamma')
    .replace(/\bdelta\b/gi, '\\delta')
    .replace(/\bepsilon\b/gi, '\\epsilon')
    .replace(/\blambda\b/gi, '\\lambda')
    .replace(/\bmu\b/gi, '\\mu')
    .replace(/\bnu\b/gi, '\\nu')
    .replace(/\bpi\b/gi, '\\pi')
    .replace(/\brho\b/gi, '\\rho')
    .replace(/\bsigma\b/gi, '\\sigma')
    .replace(/\btau\b/gi, '\\tau')
    .replace(/\bchi\b/gi, '\\chi')
    .replace(/\bpsi\b/gi, '\\psi')
    .replace(/\bPhi\b/gi, '\\Phi')
    .replace(/\bDelta\b/gi, '\\Delta')
    .replace(/\bOmega\b/gi, '\\Omega')
    
    // Mathematical operations and symbols
    .replace(/\bsin\b/g, '\\sin')
    .replace(/\bcos\b/g, '\\cos')
    .replace(/\btan\b/g, '\\tan')
    .replace(/\bsec\b/g, '\\sec')
    .replace(/\bcsc\b/g, '\\csc')
    .replace(/\bcot\b/g, '\\cot')
    .replace(/\barcsin\b/g, '\\arcsin')
    .replace(/\barccos\b/g, '\\arccos')
    .replace(/\barctan\b/g, '\\arctan')
    .replace(/\bsinh\b/g, '\\sinh')
    .replace(/\bcosh\b/g, '\\cosh')
    .replace(/\btanh\b/g, '\\tanh')
    .replace(/\blog\b/g, '\\log')
    .replace(/\bln\b/g, '\\ln')
    .replace(/\bexp\b/g, '\\exp')
    .replace(/\bsqrt\(/g, '\\sqrt{')
    .replace(/sqrt\(([^)]+)\)/g, '\\sqrt{$1}')
    .replace(/\b∞\b/g, '\\infty')
    .replace(/\binfinity\b/g, '\\infty')
    .replace(/±/g, '\\pm')
    .replace(/\+\/-/g, '\\pm')
    .replace(/≈/g, '\\approx')
    .replace(/≠/g, '\\neq')
    .replace(/≤/g, '\\leq')
    .replace(/≥/g, '\\geq')
    .replace(/∝/g, '\\propto')
    .replace(/∆/g, '\\Delta')
    .replace(/∇/g, '\\nabla')
    .replace(/∂/g, '\\partial')
    .replace(/∫/g, '\\int')
    .replace(/∑/g, '\\sum')
    .replace(/∏/g, '\\prod')
    .replace(/×/g, '\\times')
    .replace(/·/g, '\\cdot')
    .replace(/÷/g, '\\div')
    
    // Vectors (bold notation)
    .replace(/\bvec\(([^)]+)\)/g, '\\vec{$1}')
    .replace(/\b([a-zA-Z])_vec\b/g, '\\vec{$1}')
    .replace(/\\vec\{([a-zA-Z])\}/g, '\\vec{$1}')
    
    // Enhanced subscripts and superscripts for physics
    .replace(/([a-zA-Z])_([a-zA-Z0-9]+)/g, '$1_{$2}')
    .replace(/([a-zA-Z])\^([a-zA-Z0-9]+)/g, '$1^{$2}')
    .replace(/([a-zA-Z])(\d+)/g, '$1_$2') // Auto-subscript numbers after letters
    
    // Enhanced fractions
    .replace(/(\w+)\/(\w+)/g, '\\frac{$1}{$2}')
    .replace(/\(([^)]+)\)\/\(([^)]+)\)/g, '\\frac{$1}{$2}')
    
    // Degrees and angles
    .replace(/°/g, '^\\circ')
    .replace(/\bdeg\b/g, '^\\circ')
    .replace(/\brad\b/g, '\\,\\text{rad}')
    
    // Constants with proper formatting
    .replace(/\bc\b(?=\s*=|\s*≈|\s*\d)/g, 'c') // speed of light
    .replace(/\bg\b(?=\s*=|\s*≈|\s*\d)/g, 'g') // gravitational acceleration
    .replace(/\bG\b(?=\s*=|\s*≈|\s*\d)/g, 'G') // gravitational constant
    .replace(/\bh\b(?=\s*=|\s*≈|\s*\d)/g, 'h') // Planck's constant
    .replace(/\bk_B\b/g, 'k_B') // Boltzmann constant
    .replace(/\bR\b(?=\s*=|\s*≈|\s*\d)/g, 'R') // gas constant
    .replace(/\bN_A\b/g, 'N_A') // Avogadro's number
    .replace(/\be\b(?=\s*=|\s*≈|\s*\d)/g, 'e') // elementary charge
    .replace(/\bm_e\b/g, 'm_e') // electron mass
    .replace(/\bm_p\b/g, 'm_p'); // proton mass
}

/**
 * Enhanced text to LaTeX converter that handles math, chemistry, and physics
 */
export function smartTextToLatex(text: string): string {
  // First apply physics conversions
  let result = physicsToLatex(text);
  
  // Then apply chemistry conversions
  result = enhancedChemistryToLatex(result);
  
  // Finally apply general math conversions
  result = textToLatex(result);
  
  return result;
}

/**
 * Comprehensive chemistry formula database for automatic conversion
 */
const CHEMISTRY_FORMULAS = {
  // Common acids
  'HCl': 'HCl',
  'H2SO4': 'H_2SO_4',
  'HNO3': 'HNO_3',
  'H3PO4': 'H_3PO_4',
  'CH3COOH': 'CH_3COOH',
  'HCOOH': 'HCOOH',
  
  // Common bases
  'NaOH': 'NaOH',
  'KOH': 'KOH',
  'Ca(OH)2': 'Ca(OH)_2',
  'Mg(OH)2': 'Mg(OH)_2',
  
  // Common salts
  'NaCl': 'NaCl',
  'KCl': 'KCl',
  'CaCl2': 'CaCl_2',
  'MgCl2': 'MgCl_2',
  'AlCl3': 'AlCl_3',
  'FeCl2': 'FeCl_2',
  'FeCl3': 'FeCl_3',
  'CuCl2': 'CuCl_2',
  'ZnCl2': 'ZnCl_2',
  'AgCl': 'AgCl',
  'PbCl2': 'PbCl_2',
  
  // Sulfates
  'Na2SO4': 'Na_2SO_4',
  'K2SO4': 'K_2SO_4',
  'CaSO4': 'CaSO_4',
  'MgSO4': 'MgSO_4',
  'Al2(SO4)3': 'Al_2(SO_4)_3',
  'FeSO4': 'FeSO_4',
  'Fe2(SO4)3': 'Fe_2(SO_4)_3',
  'CuSO4': 'CuSO_4',
  'ZnSO4': 'ZnSO_4',
  
  // Carbonates
  'Na2CO3': 'Na_2CO_3',
  'K2CO3': 'K_2CO_3',
  'CaCO3': 'CaCO_3',
  'MgCO3': 'MgCO_3',
  'BaCO3': 'BaCO_3',
  'SrCO3': 'SrCO_3',
  
  // Nitrates
  'NaNO3': 'NaNO_3',
  'KNO3': 'KNO_3',
  'Ca(NO3)2': 'Ca(NO_3)_2',
  'Mg(NO3)2': 'Mg(NO_3)_2',
  'AgNO3': 'AgNO_3',
  'Pb(NO3)2': 'Pb(NO_3)_2',
  
  // Oxides
  'H2O': 'H_2O',
  'CO2': 'CO_2',
  'SO2': 'SO_2',
  'SO3': 'SO_3',
  'NO': 'NO',
  'NO2': 'NO_2',
  'N2O': 'N_2O',
  'N2O4': 'N_2O_4',
  'CaO': 'CaO',
  'MgO': 'MgO',
  'Al2O3': 'Al_2O_3',
  'Fe2O3': 'Fe_2O_3',
  'FeO': 'FeO',
  'CuO': 'CuO',
  'ZnO': 'ZnO',
  'PbO': 'PbO',
  'PbO2': 'PbO_2',
  
  // Organic compounds
  'CH4': 'CH_4',
  'C2H6': 'C_2H_6',
  'C2H4': 'C_2H_4',
  'C2H2': 'C_2H_2',
  'C3H8': 'C_3H_8',
  'C3H6': 'C_3H_6',
  'C4H10': 'C_4H_{10}',
  'C6H6': 'C_6H_6',
  'C6H12O6': 'C_6H_{12}O_6',
  'C12H22O11': 'C_{12}H_{22}O_{11}',
  'CH3OH': 'CH_3OH',
  'C2H5OH': 'C_2H_5OH',
  'CH3CHO': 'CH_3CHO',
  'CH3COCH3': 'CH_3COCH_3',
  
  // Other important compounds
  'NH3': 'NH_3',
  'NH4Cl': 'NH_4Cl',
  'NH4NO3': 'NH_4NO_3',
  'NH4OH': 'NH_4OH',
  'H2O2': 'H_2O_2',
  'KMnO4': 'KMnO_4',
  'K2Cr2O7': 'K_2Cr_2O_7',
  'Na2S2O3': 'Na_2S_2O_3',
  'CaC2': 'CaC_2',
  'SiO2': 'SiO_2',
  'P4O10': 'P_4O_{10}',
  'PCl3': 'PCl_3',
  'PCl5': 'PCl_5'
};

/**
 * Enhanced chemistry formula converter using the comprehensive database
 */
export function enhancedChemistryToLatex(text: string): string {
  let result = text;
  
  // First, apply specific formula conversions from our database
  Object.entries(CHEMISTRY_FORMULAS).forEach(([formula, latex]) => {
    const regex = new RegExp(`\\b${formula.replace(/[()]/g, '\\$&')}\\b`, 'g');
    result = result.replace(regex, latex);
  });
  
  // Then apply the original chemistry conversion for any missed patterns
  result = chemistryToLatex(result);
  
  return result;
}

/**
 * Sample math questions for testing
 */
export const sampleMathQuestions: MathQuestion[] = [
  {
    id: 1,
    question: "\\text{If } f(x) = x^2 + 2x + 1, \\text{ find } f'(x)",
    options: ["2x + 2", "x + 2", "2x + 1", "x^2 + 2"],
    correct_answer: 0
  },
  {
    id: 2,
    question: "\\text{Solve: } \\int x^2 \\, dx",
    options: ["\\frac{x^3}{3} + C", "\\frac{x^2}{2} + C", "2x + C", "x^3 + C"],
    correct_answer: 0
  },
  {
    id: 3,
    question: "\\text{Find the limit: } \\lim_{x \\to 0} \\frac{\\sin x}{x}",
    options: ["0", "1", "\\infty", "\\text{undefined}"],
    correct_answer: 1
  }
];

/**
 * Sample chemistry questions for testing
 */
export const sampleChemistryQuestions: MathQuestion[] = [
  {
    id: 1,
    question: "\\text{What is the molecular formula of water?}",
    options: ["H_2O", "H_2O_2", "HO", "H_3O"],
    correct_answer: 0
  },
  {
    id: 2,
    question: "\\text{Which compound is sulfuric acid?}",
    options: ["H_2SO_4", "HSO_4", "H_2SO_3", "H_3SO_4"],
    correct_answer: 0
  },
  {
    id: 3,
    question: "\\text{What is the formula for calcium carbonate?}",
    options: ["CaCO_3", "Ca(CO_3)_2", "CaC_2O_3", "Ca_2CO_3"],
    correct_answer: 0
  }
];

/**
 * Sample physics questions for testing
 */
export const samplePhysicsQuestions: MathQuestion[] = [
  {
    id: 1,
    question: "\\text{Newton's second law of motion is:}",
    options: ["F = ma", "F = mv", "F = m/a", "F = a/m"],
    correct_answer: 0
  },
  {
    id: 2,
    question: "\\text{Einstein's mass-energy equivalence is:}",
    options: ["E = mc^2", "E = mv^2", "E = m^2c", "E = mc"],
    correct_answer: 0
  },
  {
    id: 3,
    question: "\\text{Ohm's law is expressed as:}",
    options: ["V = IR", "V = I/R", "V = R/I", "V = I + R"],
    correct_answer: 0
  }
];
