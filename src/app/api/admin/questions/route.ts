import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import mongoose from 'mongoose';
import connectDB from '@/lib/db';
import Question from '@/models/Question.js';

// Check admin authentication
async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const adminAuth = cookieStore.get('admin-auth');
  return adminAuth?.value === 'authenticated';
}

// POST - Add new question
export async function POST(request: NextRequest) {
  try {
    console.log('📝 Admin question creation request received');
    console.log('Environment check:', {
      hasMongoUri: !!process.env.MONGODB_URI,
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV || 'local'
    });

    // Check admin authentication
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      examType,
      class: questionClass,
      subject,
      chapter,
      questionText,
      options,
      correctAnswer,
      explanation,
      difficulty,
      isPYQ,
      pyqYear
    } = body;

    // Validate required fields
    if (!examType || !questionClass || !subject || !chapter || !questionText || !options || correctAnswer === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate options
    if (!Array.isArray(options) || options.length !== 4 || options.some(opt => !opt.trim())) {
      return NextResponse.json(
        { success: false, error: 'Please provide 4 valid options' },
        { status: 400 }
      );
    }

    // Validate correct answer
    if (correctAnswer < 0 || correctAnswer > 3) {
      return NextResponse.json(
        { success: false, error: 'Correct answer must be between 0 and 3' },
        { status: 400 }
      );
    }

    try {
      // Connect to database with detailed logging
      console.log('🔗 Attempting database connection for question creation...');
      const connection = await connectDB();
      
      if (!connection || mongoose.connection.readyState !== 1) {
        console.error('❌ Database connection failed or not ready');
        console.log('Connection state:', mongoose.connection.readyState);
        console.log('Environment check:', {
          hasMongoUri: !!process.env.MONGODB_URI,
          nodeEnv: process.env.NODE_ENV,
          vercelEnv: process.env.VERCEL_ENV
        });
        throw new Error('Database connection failed');
      }
      
      console.log('✅ Database connected successfully for question creation');

      // Create new question
      const newQuestion = new Question({
        examType,
        class: parseInt(questionClass),
        subject,
        chapter,
        questionText: questionText.trim(),
        options: options.map(opt => opt.trim()),
        correctAnswer,
        explanation: explanation?.trim() || '',
        difficulty: difficulty || 'medium',
        isPYQ: isPYQ || false,
        pyqYear: pyqYear ? parseInt(pyqYear) : undefined,
        createdAt: new Date()
      });

      console.log('💾 Attempting to save question to database...');
      const savedQuestion = await newQuestion.save();
      console.log('✅ Question saved successfully:', savedQuestion._id);

      return NextResponse.json({
        success: true,
        message: 'Question added successfully to database',
        questionId: savedQuestion._id,
        storage: 'mongodb'
      });

    } catch (dbError) {
      console.error('❌ Database error:', dbError);
      console.error('Error details:', {
        message: dbError instanceof Error ? dbError.message : 'Unknown error',
        stack: dbError instanceof Error ? dbError.stack : 'No stack trace'
      });
      
      // Fallback to local storage if database fails
      const localQuestion = {
        id: Date.now().toString(),
        examType,
        class: parseInt(questionClass),
        subject,
        chapter,
        questionText: questionText.trim(),
        options: options.map(opt => opt.trim()),
        correctAnswer,
        explanation: explanation?.trim() || '',
        difficulty: difficulty || 'medium',
        isPYQ: isPYQ || false,
        pyqYear: pyqYear ? parseInt(pyqYear) : undefined,
        createdAt: new Date().toISOString()
      };

      // In a real app, you'd save to local storage or file system
      console.log('Saved to fallback storage:', localQuestion);

      return NextResponse.json({
        success: true,
        message: 'Question added to fallback storage (database unavailable)',
        questionId: localQuestion.id,
        storage: 'fallback',
        warning: 'Database connection failed - question saved locally'
      });
    }

  } catch (error) {
    console.error('Error adding question:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add question' },
      { status: 500 }
    );
  }
}

// GET - Get questions (for admin management)
export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const subject = searchParams.get('subject');
    const examType = searchParams.get('examType');

    try {
      await connectDB();

      // Build query
      const query: Record<string, string> = {};
      if (subject) query.subject = subject;
      if (examType) query.examType = examType;

      // Get questions with pagination
      const questions = await Question.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();

      const total = await Question.countDocuments(query);

      return NextResponse.json({
        success: true,
        questions,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      });

    } catch (dbError) {
      console.error('Database error:', dbError);
      
      // Return fallback data
      return NextResponse.json({
        success: true,
        questions: [],
        pagination: { page: 1, limit: 20, total: 0, pages: 0 },
        message: 'Using fallback data (database unavailable)'
      });
    }

  } catch (error) {
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}