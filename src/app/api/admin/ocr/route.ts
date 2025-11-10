import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Check admin authentication
async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const adminAuth = cookieStore.get('admin-auth');
  return adminAuth?.value === 'authenticated';
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    if (!await isAdminAuthenticated()) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const examType = formData.get('examType') as string;
    const classLevel = formData.get('class') as string;
    const subject = formData.get('subject') as string;
    const chapter = formData.get('chapter') as string;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    // Get file buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert to base64 for AI processing
    const base64 = buffer.toString('base64');
    const fileType = file.type;

    // Use Groq AI to extract and parse questions
    const groqApiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;
    
    if (!groqApiKey) {
      return NextResponse.json(
        { success: false, error: 'AI API key not configured' },
        { status: 500 }
      );
    }

    // For now, we'll extract text and let AI parse it
    // In production, you'd use OCR libraries here
    const extractedText = await extractTextFromFile(buffer, fileType);

    // Use AI to parse questions
    const questions = await parseQuestionsWithAI(extractedText, {
      examType,
      class: classLevel,
      subject,
      chapter
    });

    return NextResponse.json({
      success: true,
      questions,
      extractedText: extractedText.substring(0, 500) + '...' // Preview
    });

  } catch (error) {
    console.error('OCR processing error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'OCR processing failed' 
      },
      { status: 500 }
    );
  }
}

async function extractTextFromFile(buffer: Buffer, fileType: string): Promise<string> {
  // This is a placeholder - in production you'd use:
  // - pdf-parse for PDFs
  // - Tesseract.js for images
  // For now, return a simple message
  return `Extracted text from ${fileType} file. In production, this would contain the actual OCR text.`;
}

interface ParsedQuestion {
  questionText: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  examType: string;
  class: string;
  subject: string;
  chapter: string;
  isPYQ: boolean;
  pyqYear: string;
}

async function parseQuestionsWithAI(text: string, metadata: {
  examType: string;
  class: string;
  subject: string;
  chapter: string;
}): Promise<ParsedQuestion[]> {
  const groqApiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${groqApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'mixtral-8x7b-32768',
      messages: [
        {
          role: 'system',
          content: `You are an expert at parsing educational questions. Extract multiple-choice questions from the given text and format them as JSON. Each question should have:
- questionText: the question
- options: array of 4 options
- correctAnswer: index (0-3) of correct option
- explanation: brief explanation of the answer
- difficulty: "easy", "medium", or "hard"

Return ONLY a JSON array of questions, no other text.`
        },
        {
          role: 'user',
          content: `Extract questions from this text for ${metadata.subject} (${metadata.examType}, Class ${metadata.class}, Chapter: ${metadata.chapter}):\n\n${text}`
        }
      ],
      temperature: 0.3,
      max_tokens: 4000,
    }),
  });

  if (!response.ok) {
    throw new Error('AI parsing failed');
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content || '[]';
  
  try {
    const questions = JSON.parse(content);
    return questions.map((q: Partial<ParsedQuestion>) => ({
      ...q,
      examType: metadata.examType,
      class: metadata.class,
      subject: metadata.subject,
      chapter: metadata.chapter,
      isPYQ: false,
      pyqYear: ''
    }));
  } catch {
    return [];
  }
}
