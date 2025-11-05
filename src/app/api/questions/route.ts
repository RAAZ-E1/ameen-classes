import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/db';
import Question from '@/models/Question.js';
import { queryLocalQuestions } from '@/lib/local-storage.js';

interface QuestionData {
  _id: string | { toString(): string };
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

// Sample questions for fallback when database is not accessible
function getSampleQuestions(examType: 'NEET' | 'JEE', limit: number) {
  const neetQuestions = [
    {
      id: 'sample-1',
      questionText: 'Which of the following is the powerhouse of the cell?',
      question: 'Which of the following is the powerhouse of the cell?',
      options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi Body'],
      correctAnswer: 1,
      correct_answer: 1,
      subject: 'Biology',
      chapter: 'Cell Biology',
      topic: 'Cell Biology',
      difficulty: 'easy',
      exam_type: examType,
      explanation: 'Mitochondria is known as the powerhouse of the cell because it produces ATP.',
      tags: ['cell', 'organelles'],
      class: 11
    },
    {
      id: 'sample-2',
      questionText: 'What is the SI unit of force?',
      question: 'What is the SI unit of force?',
      options: ['Joule', 'Newton', 'Watt', 'Pascal'],
      correctAnswer: 1,
      correct_answer: 1,
      subject: 'Physics',
      chapter: 'Laws of Motion',
      topic: 'Laws of Motion',
      difficulty: 'easy',
      exam_type: examType,
      explanation: 'Newton (N) is the SI unit of force, named after Sir Isaac Newton.',
      tags: ['force', 'units'],
      class: 11
    },
    {
      id: 'sample-3',
      questionText: 'Which element has the chemical symbol "O"?',
      question: 'Which element has the chemical symbol "O"?',
      options: ['Osmium', 'Oxygen', 'Gold', 'Silver'],
      correctAnswer: 1,
      correct_answer: 1,
      subject: 'Chemistry',
      chapter: 'Periodic Table',
      topic: 'Periodic Table',
      difficulty: 'easy',
      exam_type: examType,
      explanation: 'Oxygen has the chemical symbol "O" and atomic number 8.',
      tags: ['elements', 'symbols'],
      class: 11
    }
  ];

  const jeeQuestions = [
    {
      id: 'sample-4',
      questionText: 'What is the derivative of x²?',
      question: 'What is the derivative of x²?',
      options: ['x', '2x', 'x²', '2x²'],
      correctAnswer: 1,
      correct_answer: 1,
      subject: 'Mathematics',
      chapter: 'Differentiation',
      topic: 'Differentiation',
      difficulty: 'easy',
      exam_type: examType,
      explanation: 'The derivative of x² is 2x using the power rule.',
      tags: ['calculus', 'derivatives'],
      class: 11
    },
    {
      id: 'sample-5',
      questionText: 'What is the acceleration due to gravity on Earth?',
      question: 'What is the acceleration due to gravity on Earth?',
      options: ['9.8 m/s²', '10 m/s²', '8.9 m/s²', '11 m/s²'],
      correctAnswer: 0,
      correct_answer: 0,
      subject: 'Physics',
      chapter: 'Gravitation',
      topic: 'Gravitation',
      difficulty: 'easy',
      exam_type: examType,
      explanation: 'The standard acceleration due to gravity on Earth is approximately 9.8 m/s².',
      tags: ['gravity', 'acceleration'],
      class: 11
    }
  ];

  const questions = examType === 'NEET' ? neetQuestions : [...neetQuestions.slice(0, 2), ...jeeQuestions];
  return questions.slice(0, Math.min(limit, questions.length));
}

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Questions API called');
    console.log('Environment check:', {
      hasMongoUri: !!process.env.MONGODB_URI,
      mongoUri: process.env.MONGODB_URI ? 'Set' : 'Missing',
      nodeEnv: process.env.NODE_ENV
    });

    const { searchParams } = new URL(request.url);
    const examType = searchParams.get('examType') as 'NEET' | 'JEE';
    const limit = parseInt(searchParams.get('limit') || '10');

    console.log(`📝 Request params: examType=${examType}, limit=${limit}`);

    if (!examType || !['NEET', 'JEE'].includes(examType)) {
      console.log('❌ Invalid exam type');
      return NextResponse.json({
        success: false,
        error: 'Invalid exam type. Must be NEET or JEE'
      }, { status: 400 });
    }

    console.log(`🔍 Fetching ${limit} questions for ${examType}...`);

    // Define query parameters
    const classNumbers = examType === 'NEET' ? [11, 12] : [11, 12];
    const subjects = examType === 'NEET' ? ['Physics', 'Chemistry', 'Biology'] : ['Physics', 'Chemistry', 'Mathematics'];

    console.log('🔍 Query parameters:', {
      examType,
      classNumbers,
      subjects,
      limit
    });

    // Build query with PYQ logic
    const query = {
      class: { $in: classNumbers },
      subject: { $in: subjects },
      $or: [
        { isPYQ: true, examType: examType }, // PYQ questions must match exact exam type
        { isPYQ: { $ne: true } } // Non-PYQ questions can appear in any exam
      ]
    };

    console.log('📝 Query:', JSON.stringify(query, null, 2));

    // Try MongoDB first, fallback to local storage
    let rawQuestions = [];
    let usingFallback = false;
    
    try {
      console.log('🔗 Connecting to database...');
      const connection = await connectDB();
      
      if (!connection || mongoose.connection.readyState !== 1) {
        console.log('⚠️ Database connection not ready, using fallback');
        throw new Error('Database connection failed');
      }
      
      console.log('✅ Database connected and ready');
      
      // Query database with timeout
      const queryPromise = Question.find(query)
        .limit(limit)
        .sort({ _id: 1 })
        .lean()
        .maxTimeMS(10000); // 10 second timeout
      
      rawQuestions = await queryPromise;
        
      console.log('📊 MongoDB result:', {
        count: rawQuestions.length,
        firstQuestion: rawQuestions[0] ? {
          id: rawQuestions[0]._id,
          subject: rawQuestions[0].subject,
          class: rawQuestions[0].class
        } : 'No questions'
      });
      
    } catch (dbError) {
      console.error('❌ Database connection failed, using local storage:', dbError);
      usingFallback = true;
      
      // Use local storage as fallback
      rawQuestions = queryLocalQuestions(query, limit);
      console.log('📊 Local storage result:', {
        count: rawQuestions.length,
        firstQuestion: rawQuestions[0] ? {
          id: rawQuestions[0]._id,
          subject: rawQuestions[0].subject,
          class: rawQuestions[0].class
        } : 'No questions'
      });
    }

    if (!rawQuestions || rawQuestions.length === 0) {
      console.log('❌ No questions found in database');

      // Provide sample questions as fallback
      const sampleQuestions = getSampleQuestions(examType, limit);
      console.log(`🔄 Using ${sampleQuestions.length} sample questions as fallback`);

      return NextResponse.json({
        success: true,
        questions: sampleQuestions,
        fallback: true,
        message: 'Using sample questions - database is empty or inaccessible',
        debug: {
          examType,
          limit,
          query,
          totalInDB: await Question.countDocuments().catch(() => 0)
        }
      });
    }

    // Format questions for frontend
    const questions = rawQuestions.map((q: QuestionData) => ({
      id: (q._id as { toString(): string }).toString(),
      questionText: q.questionText as string,
      question: q.questionText as string, // Legacy compatibility
      options: q.options as string[],
      correctAnswer: q.correctAnswer as number,
      correct_answer: q.correctAnswer as number, // Legacy compatibility
      subject: q.subject as string,
      chapter: q.chapter as string,
      topic: q.chapter as string, // Legacy compatibility
      difficulty: q.difficulty as string,
      exam_type: examType,
      explanation: q.explanation as string | undefined,
      tags: q.tags as string[] | undefined,
      class: q.class as number
    }));

    console.log(`✅ Found ${questions.length} questions, returning success`);

    return NextResponse.json({
      success: true,
      questions: questions,
      storage: usingFallback ? 'local' : 'mongodb',
      fallback: usingFallback,
      debug: {
        count: questions.length,
        examType,
        limit,
        storage: usingFallback ? 'local' : 'mongodb'
      }
    });
  } catch (error) {
    console.error('💥 API Error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });

    // Check if we have examType from the URL to provide fallback questions
    try {
      const { searchParams } = new URL(request.url);
      const examType = searchParams.get('examType') as 'NEET' | 'JEE';
      const limit = parseInt(searchParams.get('limit') || '10');

      if (examType && ['NEET', 'JEE'].includes(examType)) {
        console.log('🔄 Database failed, providing sample questions as fallback');
        const sampleQuestions = getSampleQuestions(examType, limit);
        
        return NextResponse.json({
          success: true,
          questions: sampleQuestions,
          fallback: true,
          message: 'Database connection failed - using sample questions',
          error: error instanceof Error ? error.message : 'Unknown error',
          debug: {
            errorMessage: error instanceof Error ? error.message : 'Unknown error',
            hasMongoUri: !!process.env.MONGODB_URI,
            fallbackUsed: true
          }
        });
      }
    } catch (fallbackError) {
      console.error('❌ Fallback also failed:', fallbackError);
    }

    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      debug: {
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        hasMongoUri: !!process.env.MONGODB_URI
      }
    }, { status: 500 });
  }
}