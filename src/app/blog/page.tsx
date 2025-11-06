import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '12 Rules of Success - Ameen Classes',
  description: 'Discover the 12 fundamental rules of success for academic and personal excellence',
};

// 12 Laws of Success with meaningful titles and descriptions
const rulesOfSuccess = [
  {
    id: 1,
    imageNumber: 1,
    title: "Foundation",
    subtitle: "A Strong Foundation will Increase your Rank.",
    description: "Just as a skyscraper cannot stand without solid groundwork, your academic success depends entirely on the strength of your foundational knowledge.",
    imagePath: "/blog/images/1.png",
  },
  {
    id: 2,
    imageNumber: 2,
    title: "Language",
    subtitle: "If you Understand the Problem, Half of It is Already Solved.",
    description: "Language isn't just a tool for communication—it's the framework through which we organize our thoughts and solve problems effectively.",
    imagePath: "/blog/images/2.png",
  },
  {
    id: 3,
    imageNumber: 3,
    title: "Surrounding",
    subtitle: "Find Peaceful and Positive Surrounding, It will Increase your Learning Ability.",
    description: "Your environment shapes your mind more profoundly than most people realize. Optimal learning occurs in spaces that support focus and reduce stress.",
    imagePath: "/blog/images/3.png",
  },
  {
    id: 4,
    imageNumber: 4,
    title: "Companionship",
    subtitle: "Stay Around the People Who Share the Same Dream.",
    description: "The people you surround yourself with shape your aspirations, standards, habits, and ultimately your trajectory toward success.",
    imagePath: "/blog/images/4.png",
  },
  {
    id: 5,
    imageNumber: 5,
    title: "Hard Work",
    subtitle: "There is No Substitute for Hard Work.",
    description: "Despite all strategies and shortcuts, sustained effort remains the non-negotiable foundation of significant achievement.",
    imagePath: "/blog/images/5.png",
  },
  {
    id: 6,
    imageNumber: 6,
    title: "Smart Work",
    subtitle: "Think! Even God Wants You to Work Smart.",
    description: "While hard work provides the engine for success, smart work provides the steering. Effort without strategy can be wasteful.",
    imagePath: "/blog/images/6.png",
  },
  {
    id: 7,
    imageNumber: 7,
    title: "Seek Guidance",
    subtitle: "Do Not Hold Doubts, If You Stuck Somewhere Just Ask.",
    description: "Seeking guidance isn't weakness; it's wisdom. The most successful people have been voracious learners who weren't too proud to ask questions.",
    imagePath: "/blog/images/7.png",
  },
  {
    id: 8,
    imageNumber: 8,
    title: "Consistency",
    subtitle: "Success is the Result of Consistent Efforts.",
    description: "Consistency transforms ordinary actions into extraordinary results through the power of compound growth over time.",
    imagePath: "/blog/images/8.png",
  },
  {
    id: 9,
    imageNumber: 9,
    title: "Stay Motivated",
    subtitle: "Do Something Everyday That Inspires You.",
    description: "While discipline carries you through uninspired days, inspiration fuels the passion that makes the journey meaningful.",
    imagePath: "/blog/images/9.png",
  },
  {
    id: 10,
    imageNumber: 10,
    title: "Exercise",
    subtitle: "A Strong Body Makes the Mind Strong.",
    description: "Physical activity enhances memory formation, improves concentration, and boosts cognitive processing speed significantly.",
    imagePath: "/blog/images/10.png",
  },
  {
    id: 11,
    imageNumber: 11,
    title: "Prayer",
    subtitle: "Prayer Gives Us Hope, Wisdom, and Guidance.",
    description: "Spiritual grounding provides an anchor that keeps us steady through storms of doubt, pressure, and uncertainty in academic pursuit.",
    imagePath: "/blog/images/11.png",
  },
  {
    id: 12,
    imageNumber: 12,
    title: "Repeat & Revise",
    subtitle: "You Must Repeat These Principles and Revise your Studies Everyday.",
    description: "Knowledge requires repetition to become permanent. The human brain is designed to forget information that isn't regularly reinforced.",
    imagePath: "/blog/images/12.png",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-gradient-to-r from-brand-100 to-blue-100 rounded-full px-6 py-2 mb-6">
            <span className="text-sm font-semibold text-brand-700">✨ Laws of Academic Excellence</span>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-brand-800 to-blue-900 bg-clip-text text-transparent mb-8 leading-tight">
            12 Laws of Success
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            Master these fundamental principles to achieve academic excellence and unlock your full potential in competitive exams.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-brand-500 rounded-full"></div>
              <span>Evidence-Based</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Proven Results</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Expert Curated</span>
            </div>
          </div>
        </div>

        {/* Beautiful 3x4 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {rulesOfSuccess.map((rule) => (
            <Link
              key={rule.id}
              href={`/blog/rule-${rule.id}`}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-white/20 hover:border-brand-200/50 hover:bg-white"
            >
              {/* Decorative Elements */}
              <div className="absolute top-4 left-4 w-12 h-12 bg-gradient-to-br from-brand-500/20 to-blue-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="absolute bottom-4 right-4 w-8 h-8 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-500"></div>

              {/* Image Container */}
              <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-brand-50 via-blue-50 to-indigo-50 m-4 rounded-2xl">
                <Suspense fallback={<div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse rounded-2xl"></div>}>
                  <Image
                    src={rule.imagePath}
                    alt={`${rule.title} - Law of Success`}
                    fill
                    className="object-cover scale-95 group-hover:scale-105 transition-transform duration-500 rounded-2xl"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    quality={80}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  />
                </Suspense>

                {/* Elegant Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                {/* Floating Action Button */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 shadow-lg">
                  <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Enhanced Content */}
              <div className="p-6 relative">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-brand-500 to-blue-500 rounded-full"></div>
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Law {rule.imageNumber}</span>
                    </div>
                    <div className="w-8 h-1 bg-gradient-to-r from-brand-500 to-blue-500 rounded-full"></div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-colors leading-tight">
                    {rule.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 group-hover:text-gray-700 transition-colors">
                    {rule.subtitle}
                  </p>
                </div>

                {/* Enhanced Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs font-medium text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                    Success Principle
                  </span>
                  <div className="flex items-center space-x-1 text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span className="text-xs">Read More</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <div className="relative">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-500/10 via-blue-500/10 to-indigo-500/10 rounded-3xl blur-3xl"></div>

          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-12 border border-white/20 shadow-2xl">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center bg-gradient-to-r from-brand-100 to-blue-100 rounded-full px-6 py-2 mb-6">
                <span className="text-sm font-semibold text-brand-700">🚀 Start Your Journey</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-brand-800 bg-clip-text text-transparent mb-6">
                Ready to Master These Laws?
              </h2>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Transform your academic performance with our comprehensive courses designed around these proven success principles. Join thousands of students who have achieved their dreams.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="/premium"
                  className="group bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center space-x-2"
                >
                  <span>Explore Premium Courses</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>

                <a
                  href="/mock-tests"
                  className="group bg-white hover:bg-gray-50 text-brand-600 border-2 border-brand-200 hover:border-brand-300 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Take Practice Test</span>
                </a>
              </div>

              <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>10,000+ Students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}