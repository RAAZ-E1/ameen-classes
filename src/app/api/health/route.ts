import { NextResponse } from 'next/server';
import connectDB from '@/lib/db.js';
import Question from '@/models/Question.js';
import mongoose from 'mongoose';

export async function GET() {
  try {
    console.log('🏥 Health check initiated...');
    
    // Check MongoDB connection
    await connectDB();
    const dbState = mongoose.connection.readyState;
    const dbStates: Record<number, string> = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    
    console.log(`🔌 Database state: ${dbStates[dbState] || 'unknown'} (${dbState})`);
    
    // Test database operations
    const totalQuestions = await Question.countDocuments();
    console.log(`📊 Total questions in database: ${totalQuestions}`);
    
    // Test write operation with a temporary document
    const testDoc = new Question({
      class: 11,
      subject: 'Biology',
      chapter: 'Health Check',
      questionText: 'Health check test question - will be deleted',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 0,
      difficulty: 'medium'
    });
    
    const saved = await testDoc.save();
    console.log(`✅ Test write successful: ${saved._id}`);
    
    // Clean up test document
    await Question.findByIdAndDelete(saved._id);
    console.log('🧹 Test document cleaned up');
    
    return NextResponse.json({
      success: true,
      status: 'healthy',
      database: {
        connected: dbState === 1,
        state: dbStates[dbState] || 'unknown',
        totalQuestions
      },
      mongodb: {
        uri: process.env.MONGODB_URI ? 'configured' : 'missing',
        cluster: process.env.MONGODB_URI?.includes('mongodb.net') ? 'atlas' : 'local'
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('💥 Health check failed:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json({
      success: false,
      status: 'unhealthy',
      error: errorMessage,
      database: {
        connected: false,
        error: errorMessage
      },
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}