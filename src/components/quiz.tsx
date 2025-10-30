import { InlineMath, BlockMath } from "react-katex";
import 'katex/dist/katex.min.css';

interface Question {
  id: number;
  question: string;
  options: string[];
}

interface QuizProps {
  questions: Question[];
}

export default function Quiz({ questions }: QuizProps) {
  return (
    <div className="space-y-6">
      {questions.map(q => (
        <div key={q.id} className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="mb-4">
            <BlockMath math={q.question} />
          </div>
          <div className="space-y-2">
            {q.options.map((opt, i) => (
              <button 
                key={i}
                className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-brand-300 hover:bg-brand-50 transition-colors"
              >
                <InlineMath math={opt} />
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}