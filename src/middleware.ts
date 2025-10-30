import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Add security headers for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
  }
  
  // Admin route protection - now handled within the admin page component
  // No redirect needed as login is integrated into the main admin page
  
  return response;
}

export const config = {
  matcher: [
    '/api/:path*',
    '/admin/:path*'
  ],
};