import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/db';
import Question from '@/models/Question';

// Check admin authentication
async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const adminAuth = cookieStore.get('admin-auth');
  return adminAuth?.value === 'authenticated';
}

// GET - Get admin statistics
export async function GET() {
  try {
    // Check admin authentication
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    try {
      await connectDB();

      // Get total questions
      const totalQuestions = await Question.countDocuments();

      // Get questions by subject
      const subjectStats = await Question.aggregate([
        {
          $group: {
            _id: '$subject',
            count: { $sum: 1 }
          }
        },
        {
          $sort: { count: -1 }
        }
      ]);

      // Get questions by exam type
      const examTypeStats = await Question.aggregate([
        {
          $group: {
            _id: '$examType',
            count: { $sum: 1 }
          }
        }
      ]);

      // Get questions by difficulty
      const difficultyStats = await Question.aggregate([
        {
          $group: {
            _id: '$difficulty',
            count: { $sum: 1 }
          }
        }
      ]);

      // Get unique subjects count
      const subjects = await Question.distinct('subject');

      return NextResponse.json({
        success: true,
        totalQuestions,
        subjects: subjects.length,
        subjectStats,
        examTypeStats,
        difficultyStats,
        testAttempts: 0, // This would come from a test results collection
        avgScore: 0, // This would be calculated from test results
        lastUpdated: new Date().toISOString()
      });

    } catch (dbError) {
      console.error('Database error:', dbError);
      
      // Return fallback stats
      return NextResponse.json({
        success: true,
        totalQuestions: 0,
        subjects: 0,
        subjectStats: [],
        examTypeStats: [],
        difficultyStats: [],
        testAttempts: 0,
        avgScore: 0,
        message: 'Using fallback data (database unavailable)',
        lastUpdated: new Date().toISOString()
      });
    }

  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}