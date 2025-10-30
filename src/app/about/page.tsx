export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            About Ameen Classes
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Empowering students with quality education and comprehensive test preparation.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To provide accessible, high-quality education that helps students achieve their academic goals 
              and build a strong foundation for their future careers.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What We Offer</h2>
            <ul className="text-gray-600 space-y-2">
              <li>• Free Class 10 video lectures</li>
              <li>• AI-powered mock tests</li>
              <li>• NEET, JEE, and CLAT preparation</li>
              <li>• Previous year question papers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}