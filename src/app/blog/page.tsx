import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog - Ameen Classes',
  description: 'Latest updates and study tips',
};

const blogPosts = [
  {
    id: 1,
    title: 'NEET 2025 Preparation Strategy',
    excerpt: 'Complete guide to crack NEET 2025 with effective study plans.',
    date: '2024-12-15',
    category: 'NEET'
  },
  {
    id: 2,
    title: 'JEE Main vs JEE Advanced',
    excerpt: 'Key differences and preparation strategies for both exams.',
    date: '2024-12-10',
    category: 'JEE'
  },
  {
    id: 3,
    title: 'Class 10 Foundation Tips',
    excerpt: 'Building strong basics for competitive exam success.',
    date: '2024-12-05',
    category: 'Foundation'
  },
  {
    id: 4,
    title: 'Time Management for Exams',
    excerpt: 'Proven strategies for effective time management.',
    date: '2024-11-28',
    category: 'Study Tips'
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Blog
          </h1>
          <p className="text-gray-600">
            Latest updates and study tips
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-3">
                <span className="bg-brand-100 text-brand-700 px-2 py-1 rounded text-xs font-medium">
                  {post.category}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {new Date(post.date).toLocaleDateString()}
                </span>
                <Link
                  href={`/blog/${post.id}`}
                  className="text-brand-600 hover:text-brand-700 text-sm font-medium"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}