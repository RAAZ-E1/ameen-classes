import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ameen Classes - Free Class 10 Lectures & Mock Tests",
  description: "Free educational content and mock tests for Class 10 students",
  keywords: "education, class 10, mock tests, free lectures, learning",
  authors: [{ name: "Ameen Classes" }],
  robots: "index, follow",
  // Security: Prevent sensitive information leakage
  other: {
    "referrer": "strict-origin-when-cross-origin",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Security: Essential meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />

        {/* Security: Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Security: DNS prefetch control */}
        <meta httpEquiv="x-dns-prefetch-control" content="off" />
      </head>
      <body className={inter.className}>
        <Navbar />
        <main role="main">
          {children}
        </main>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
