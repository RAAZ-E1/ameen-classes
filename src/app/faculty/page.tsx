import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Faculty - Ameen Classes',
  description: 'Meet our expert faculty members',
};

const facultyMembers = [
  {
    name: 'Dr. Ahmed Khan',
    subject: 'Physics',
    qualification: 'Ph.D. Physics, IIT Delhi',
    experience: '15+ years'
  },
  {
    name: 'Prof. Rajesh Sharma',
    subject: 'Mathematics',
    qualification: 'M.Tech Mathematics, IIT Bombay',
    experience: '12+ years'
  },
  {
    name: 'Dr. Priya Patel',
    subject: 'Chemistry',
    qualification: 'Ph.D. Organic Chemistry, AIIMS',
    experience: '10+ years'
  },
  {
    name: 'Dr. Suresh Kumar',
    subject: 'Biology',
    qualification: 'MBBS, MD Anatomy',
    experience: '14+ years'
  },
  {
    name: 'Ms. Kavita Singh',
    subject: 'English & CLAT',
    qualification: 'MA English, LLB',
    experience: '8+ years'
  },
  {
    name: 'Prof. Ankit Gupta',
    subject: 'Foundation Mathematics',
    qualification: 'M.Sc Mathematics, B.Ed',
    experience: '9+ years'
  }
];

export default function FacultyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Our Faculty
          </h1>
          <p className="text-gray-600">
            Expert teachers with years of experience
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {facultyMembers.map((faculty, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{faculty.name}</h3>
              <p className="text-brand-600 font-medium mb-3">{faculty.subject}</p>
              <div className="space-y-2 text-sm text-gray-600">
                <p>{faculty.qualification}</p>
                <p>{faculty.experience} experience</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}