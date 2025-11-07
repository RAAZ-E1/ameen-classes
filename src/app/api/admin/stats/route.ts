import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import connectDB from '@/lib/db';
import Question from '@/models/Question.js';

// Check admin authentication
async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const adminAuth = cookieStore.get('admin-auth');
  return adminAuth?.value === 'authenticated';
}

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
      // Connect to database
      const connection = await connectDB();
      
      if (!connection) {
        throw new Error('Database connection failed');
      }

      // Get basic stats
      const totalQuestions = await Question.countDocuments({ isActive: true });
      
      // Get subject distribution
      const subjectStats = await Question.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$subject', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);

      // Get exam type distribution
      const examTypeStats = await Question.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$examType', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);

      // Get difficulty distribution
      const difficultyStats = await Question.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$difficulty', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]);

      const stats = {
        totalQuestions,
        testAttempts: 0, // Placeholder - implement when you add test results
        avgScore: 0, // Placeholder - implement when you add test results
        subjects: subjectStats.length,
        subjectStats,
        examTypeStats,
        difficultyStats,
        lastUpdated: new Date().toISOString()
      };

      return NextResponse.json(stats);

    } catch (dbError) {
      console.error('Database error:', dbError);
      
      // Return fallback stats
      return NextResponse.json({
        totalQuestions: 0,
        testAttempts: 0,
        avgScore: 0,
        subjects: 0,
        subjectStats: [],
        examTypeStats: [],
        difficultyStats: [],
        lastUpdated: new Date().toISOString(),
        message: 'Using fallback data (database unavailable)'
      });
    }

  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
}