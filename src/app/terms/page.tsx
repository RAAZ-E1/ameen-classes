export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm">
          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-6">
              By accessing and using Ameen Classes, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Use License</h2>
            <p className="text-gray-600 mb-6">
              Permission is granted to temporarily access the materials on Ameen Classes for personal, non-commercial transitory viewing only.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Disclaimer</h2>
            <p className="text-gray-600 mb-6">
              The materials on Ameen Classes are provided on an &apos;as is&apos; basis. Ameen Classes makes no warranties, expressed or implied.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Limitations</h2>
            <p className="text-gray-600 mb-6">
              In no event shall Ameen Classes or its suppliers be liable for any damages arising out of the use or inability to use the materials.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Contact Information</h2>
            <p className="text-gray-600">
              If you have any questions about these Terms of Service, please contact us at support@ameenclasses.com.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}