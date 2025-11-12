import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY
});

interface Question {
  id: string;
  questionText: string;
  options: string[];
  correctAnswer: number;
  subject: string;
  chapter: string;
  difficulty: string;
  explanation?: string;
  tags?: string[];
  class: number;
}

async function formatQuestionWithGroq(question: Question): Promise<Question> {
  try {
    const prompt = `Format the following question for display in a web application. Convert any mathematical expressions to LaTeX format (wrapped in $ for inline or $$ for display), chemical formulas to proper notation, and ensure proper formatting.

Question: ${question.questionText}

Options:
A) ${question.options[0]}
B) ${question.options[1]}
C) ${question.options[2]}
D) ${question.options[3]}

${question.explanation ? `Explanation: ${question.explanation}` : ''}

Return ONLY a JSON object with this exact structure (no markdown, no code blocks):
{
  "questionText": "formatted question text",
  "options": ["option A", "option B", "option C", "option D"],
  "explanation": "formatted explanation"
}

Rules:
- Use $ for inline math (e.g., $x^2$)
- Use $$ for display math (e.g., $$\\frac{a}{b}$$)
- Use proper chemical notation (e.g., H₂O, CO₂)
- Keep the meaning exactly the same
- Return valid JSON only`;

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a question formatter that converts questions into properly formatted text with LaTeX math and chemical formulas. Always return valid JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.1,
      max_tokens: 1000,
    });

    const response = completion.choices[0]?.message?.content || '';
    
    // Try to parse the JSON response
    let formatted;
    try {
      // Remove markdown code blocks if present
      const cleanedResponse = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      formatted = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('Failed to parse Groq response:', response);
      throw new Error('Invalid JSON response from Groq');
    }

    return {
      ...question,
      questionText: formatted.questionText || question.questionText,
      options: formatted.options || question.options,
      explanation: formatted.explanation || question.explanation
    };

  } catch (error) {
    console.error('Error formatting question with Groq:', error);
    // Return original question if formatting fails
    return question;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { questions } = body;

    if (!questions || !Array.isArray(questions)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid request: questions array required'
      }, { status: 400 });
    }

    console.log(`🤖 Formatting ${questions.length} questions with Groq...`);

    // Format questions in parallel (but limit concurrency to avoid rate limits)
    const batchSize = 3;
    const formattedQuestions: Question[] = [];

    for (let i = 0; i < questions.length; i += batchSize) {
      const batch = questions.slice(i, i + batchSize);
      const formatted = await Promise.all(
        batch.map((q: Question) => formatQuestionWithGroq(q))
      );
      formattedQuestions.push(...formatted);
      
      // Small delay between batches to avoid rate limiting
      if (i + batchSize < questions.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    console.log(`✅ Successfully formatted ${formattedQuestions.length} questions`);

    return NextResponse.json({
      success: true,
      questions: formattedQuestions
    });

  } catch (error) {
    console.error('Error in formatted questions API:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to format questions'
    }, { status: 500 });
  }
}