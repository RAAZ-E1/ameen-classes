import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/db';
import Question from '@/models/Question.js';

export async function GET() {
  try {
    console.log('🏥 Health check started...');
    
    // Check environment variables
    const envCheck = {
      hasMongoUri: !!process.env.MONGODB_URI,
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV || 'local'
    };
    
    console.log('📋 Environment check:', envCheck);
    
    if (!envCheck.hasMongoUri) {
      return NextResponse.json({
        status: 'error',
        message: 'MONGODB_URI not configured',
        environment: envCheck,
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }
    
    // Test database connection
    let dbStatus = 'disconnected';
    let questionCount = 0;
    let connectionError = null;
    
    try {
      console.log('🔗 Testing database connection...');
      const connection = await connectDB();
      
      if (connection && mongoose.connection.readyState === 1) {
        dbStatus = 'connected';
        console.log('✅ Database connected, counting questions...');
        
        // Count questions
        questionCount = await Question.countDocuments({ isActive: true });
        console.log(`📊 Found ${questionCount} active questions`);
      } else {
        dbStatus = 'failed';
        connectionError = 'Connection returned null or not ready';
      }
    } catch (error) {
      dbStatus = 'error';
      connectionError = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ Database connection failed:', connectionError);
    }
    
    const healthStatus = {
      status: dbStatus === 'connected' ? 'healthy' : 'unhealthy',
      database: {
        status: dbStatus,
        questionCount,
        error: connectionError
      },
      environment: envCheck,
      timestamp: new Date().toISOString()
    };
    
    console.log('🏥 Health check result:', healthStatus);
    
    return NextResponse.json(healthStatus, {
      status: healthStatus.status === 'healthy' ? 200 : 500
    });
    
  } catch (error) {
    console.error('🚨 Health check failed:', error);
    
    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'Health check failed',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}