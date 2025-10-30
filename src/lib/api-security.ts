import { NextRequest, NextResponse } from 'next/server';
import { validateRequestOrigin, getSecurityHeaders } from './security';

export interface SecureApiOptions {
  allowedMethods?: string[];
  requireAuth?: boolean;
  rateLimitKey?: string;
  validateOrigin?: boolean;
  allowedOrigins?: string[];
}

/**
 * Wrapper for secure API routes
 */
export function withSecurity(
  handler: (req: NextRequest) => Promise<NextResponse>,
  options: SecureApiOptions = {}
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const {
      allowedMethods = ['GET', 'POST'],
      validateOrigin = true,
      allowedOrigins = [
        process.env.NEXTAUTH_URL || 'http://localhost:3000',
        ...(process.env.NODE_ENV === 'production' ? ['https://your-domain.com'] : []),
      ],
    } = options;

    try {
      // Method validation
      if (!allowedMethods.includes(req.method || '')) {
        return new NextResponse(
          JSON.stringify({ error: 'Method not allowed' }),
          {
            status: 405,
            headers: {
              'Allow': allowedMethods.join(', '),
              ...getSecurityHeaders(),
            },
          }
        );
      }

      // Origin validation for state-changing requests
      if (validateOrigin && ['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method || '')) {
        if (!validateRequestOrigin(req, allowedOrigins)) {
          return new NextResponse(
            JSON.stringify({ error: 'Invalid origin' }),
            {
              status: 403,
              headers: getSecurityHeaders(),
            }
          );
        }
      }

      // Content-Type validation for POST/PUT requests
      if (['POST', 'PUT', 'PATCH'].includes(req.method || '')) {
        const contentType = req.headers.get('content-type');
        if (contentType && !contentType.includes('application/json')) {
          return new NextResponse(
            JSON.stringify({ error: 'Invalid content type' }),
            {
              status: 400,
              headers: getSecurityHeaders(),
            }
          );
        }
      }

      // Execute the handler
      const response = await handler(req);
      
      // Add security headers to response
      const securityHeaders = getSecurityHeaders();
      Object.entries(securityHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
      });

      return response;
    } catch (error) {
      console.error('API Security Error:', error);
      
      return new NextResponse(
        JSON.stringify({ 
          error: 'Internal server error',
          message: process.env.NODE_ENV === 'development' ? String(error) : 'Something went wrong'
        }),
        {
          status: 500,
          headers: getSecurityHeaders(),
        }
      );
    }
  };
}

/**
 * Validate request body size and structure
 */
export async function validateRequestBody(
  req: NextRequest,
  maxSize: number = 1024 * 1024 // 1MB default
): Promise<Record<string, unknown>> {
  try {
    const body = await req.text();
    
    if (body.length > maxSize) {
      throw new Error('Request body too large');
    }
    
    if (!body.trim()) {
      return {};
    }
    
    return JSON.parse(body) as Record<string, unknown>;
  } catch {
    throw new Error('Invalid request body');
  }
}

/**
 * Create standardized error response
 */
export function createErrorResponse(
  message: string,
  status: number = 400,
  details?: Record<string, unknown>
): NextResponse {
  return new NextResponse(
    JSON.stringify({
      error: message,
      ...(process.env.NODE_ENV === 'development' && details ? { details } : {}),
    }),
    {
      status,
      headers: {
        'Content-Type': 'application/json',
        ...getSecurityHeaders(),
      },
    }
  );
}

/**
 * Create standardized success response
 */
export function createSuccessResponse(
  data: Record<string, unknown>,
  status: number = 200
): NextResponse {
  return new NextResponse(
    JSON.stringify(data),
    {
      status,
      headers: {
        'Content-Type': 'application/json',
        ...getSecurityHeaders(),
      },
    }
  );
}