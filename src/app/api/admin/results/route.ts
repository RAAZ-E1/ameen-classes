import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// Check admin authentication
async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const adminAuth = cookieStore.get('admin-auth');
  return adminAuth?.value === 'authenticated';
}

// GET - Get test results
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

    // In a real application, you would fetch from a TestResults collection
    // For now, return mock data
    const mockResults = [
      {
        id: '1',
        studentName: 'Anonymous User',
        examType: 'NEET',
        subject: 'Biology',
        score: 85,
        totalQuestions: 20,
        correctAnswers: 17,
        timeTaken: '15:30',
        completedAt: new Date().toISOString(),
        difficulty: 'medium'
      },
      {
        id: '2',
        studentName: 'Anonymous User',
        examType: 'JEE',
        subject: 'Physics',
        score: 75,
        totalQuestions: 20,
        correctAnswers: 15,
        timeTaken: '18:45',
        completedAt: new Date(Date.now() - 86400000).toISOString(),
        difficulty: 'hard'
      }
    ];

    return NextResponse.json({
      success: true,
      results: mockResults,
      pagination: {
        page,
        limit,
        total: mockResults.length,
        pages: Math.ceil(mockResults.length / limit)
      },
      summary: {
        totalTests: mockResults.length,
        averageScore: mockResults.reduce((sum, result) => sum + result.score, 0) / mockResults.length,
        highestScore: Math.max(...mockResults.map(r => r.score)),
        lowestScore: Math.min(...mockResults.map(r => r.score))
      }
    });

  } catch (error) {
    console.error('Error fetching results:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch test results' },
      { status: 500 }
    );
  }
}