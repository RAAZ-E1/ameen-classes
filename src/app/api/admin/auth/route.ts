import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// POST - Admin login
export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { success: false, error: 'Password is required' },
        { status: 400 }
      );
    }

    // Check against environment variable or hardcoded password
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123secure';
    
    if (password.trim() === adminPassword) {
      // Set secure cookie for admin session
      const cookieStore = await cookies();
      cookieStore.set('admin-auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 24 hours
      });

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid password' },
        { status: 401 }
      );
    }
  } catch (err) {
    console.error('Admin auth error:', err);
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

// GET - Check authentication status
export async function GET() {
  try {
    const cookieStore = await cookies();
    const adminAuth = cookieStore.get('admin-auth');
    
    return NextResponse.json({
      authenticated: adminAuth?.value === 'authenticated'
    });
  } catch (err) {
    return NextResponse.json({ authenticated: false });
  }
}

// DELETE - Logout
export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('admin-auth');
    
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: 'Logout failed' },
      { status: 500 }
    );
  }
}