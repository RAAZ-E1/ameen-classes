import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import TestResult from '@/models/TestResult';

export async function POST(request) {
  try {
    await connectDB();
    
    const testData = await request.json();
    
    console.log('Saving test result:', {
      exam_type: testData.exam_type,
      total_questions: testData.total_questions,
      correct_answers: testData.correct_answers
    });
    
    const testResult = new TestResult(testData);
    const savedResult = await testResult.save();
    
    return NextResponse.json({
      success: true,
      id: savedResult._id.toString(),
      message: 'Test result saved successfully'
    });
    
  } catch (error) {
    console.error('API Error saving test result:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message 
      },
      { status: 500 }
    );
  }
}