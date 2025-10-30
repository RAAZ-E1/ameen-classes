/** @type {import('next').NextConfig} */
const nextConfig = {
  // Security: Disable powered by header
  poweredByHeader: false,
  
  // Security: Enable strict mode
  reactStrictMode: true,
  
  // Security: Configure image optimization securely
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },

      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    // Security: Restrict SVG handling
    dangerouslyAllowSVG: false,
    minimumCacheTTL: 60,
  },
  
  // Security: Comprehensive security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent clickjacking
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // Prevent MIME type sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Control referrer information
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // XSS Protection (legacy but still useful)
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // Strict Transport Security (only in production)
          ...(process.env.NODE_ENV === 'production' ? [{
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          }] : []),
          // Permissions Policy
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // Content Security Policy (relaxed for development)
          {
            key: "Content-Security-Policy",
            value: process.env.NODE_ENV === 'development' 
              ? [
                  "default-src 'self'",
                  "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
                  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                  "font-src 'self' https://fonts.gstatic.com",
                  "img-src 'self' data: blob: https://images.unsplash.com https://api.dicebear.com",
                  "connect-src 'self' https://api.groq.com ws://localhost:* wss://localhost:*",
                  "frame-ancestors 'none'",
                  "base-uri 'self'",
                  "form-action 'self'",
                  "object-src 'none'",
                ].join("; ")
              : [
                  "default-src 'self'",
                  "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live",
                  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                  "font-src 'self' https://fonts.gstatic.com",
                  "img-src 'self' data: blob: https://images.unsplash.com https://api.dicebear.com",
                  "connect-src 'self' https://api.groq.com",
                  "frame-ancestors 'none'",
                  "base-uri 'self'",
                  "form-action 'self'",
                  "object-src 'none'",
                ].join("; "),
          },
        ],
      },
      // API routes security
      {
        source: "/api/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0",
          },
        ],
      },
    ];
  },
  
  // Security: Configure redirects for security
  async redirects() {
    return [
      // Redirect HTTP to HTTPS in production
      ...(process.env.NODE_ENV === 'production' ? [
        {
          source: '/(.*)',
          has: [
            {
              type: 'header',
              key: 'x-forwarded-proto',
              value: 'http',
            },
          ],
          destination: 'https://your-domain.com/:path*',
          permanent: true,
        },
      ] : []),
    ];
  },

  // Experimental features (removed invalid option)
  experimental: {
    // Add any valid experimental features here
  },
  
  // Ensure proper MIME types for static assets
  async rewrites() {
    return [];
  },
};

export default nextConfig;
