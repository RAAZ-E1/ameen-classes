import { NextResponse } from 'next/server';
import connectDB from '@/lib/db.js';
import Question from '@/models/Question.js';

export async function GET() {
  try {
    console.log('🧪 Testing database connection...');
    console.log('MongoDB URI exists:', !!process.env.MONGODB_URI);
    
    await connectDB();
    console.log('✅ Connected to database');
    
    const count = await Question.countDocuments();
    console.log('📊 Total questions:', count);
    
    const sampleQuestions = await Question.find().limit(3).lean();
    console.log('📋 Sample questions:', sampleQuestions.length);
    
    return NextResponse.json({
      success: true,
      totalQuestions: count,
      sampleCount: sampleQuestions.length,
      mongoUri: process.env.MONGODB_URI ? 'Connected' : 'Missing',
      samples: sampleQuestions.map(q => ({
        id: (q._id as { toString(): string }).toString(),
        subject: q.subject as string,
        class: q.class as number,
        questionText: (q.questionText as string)?.substring(0, 50) + '...'
      }))
    });
  } catch (error) {
    console.error('💥 Database test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      mongoUri: process.env.MONGODB_URI ? 'Set but failed' : 'Missing'
    }, { status: 500 });
  }
}