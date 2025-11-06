import { Metadata } from 'next';
import { GraduationCap, Award, Clock, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Faculty - Ameen Classes',
  description: 'Meet our expert faculty members with years of experience in NEET and JEE preparation',
};

const facultyMembers = [
  {
    name: 'Mohd Aatif',
    role: 'Founder & Director',
    experience: '10+ years',
    specialization: 'Chemistry',
    description: 'Former Research Associate NCL.',
    qualification: 'Research Associate NCL'
  },
  {
    name: 'Javed Shaikh Sir',
    role: 'Chemistry Faculty',
    experience: '10+ years',
    specialization: 'Chemistry',
    description: 'PHD/NET/JRF Qualified',
    qualification: 'PHD/NET/JRF'
  },
  {
    name: 'Mujtaba Farooque Sir',
    role: 'Mathematics Faculty',
    experience: '6+ years',
    specialization: 'Mathematics',
    description: 'Lecturer MIT-WPU.',
    qualification: 'Lecturer MIT-WPU'
  },
    {
    name: 'Shaikh Mudassir Sir',
    role: 'Biology Faculty',
    experience: '11+ years',
    specialization: 'Biology',
    description: 'Ex-Faculty Shaheen.',
    qualification: 'Ex-Faculty Shaheen'
  },
  {
    name: 'Dr. Mohd Ubaid Sir',
    role: 'Biology Faculty',
    experience: '3+ years',
    specialization: 'Biology',
    description: 'MBBS qualified medical professional',
    qualification: 'MBBS'
  },
  {
    name: 'Shaikh Jafer Sir',
    role: 'Physics Faculty',
    experience: '7+ years',
    specialization: 'Physics',
    description: 'Experienced Physics educator',
    qualification: 'Physics Specialist'
  },

  {
    name: 'Ramza Sulaim Mam',
    role: 'Physics Faculty',
    experience: '3+ years',
    specialization: 'Physics',
    description: 'Experienced Physics lecturer',
    qualification: 'Physics Lecturer'
  }
];

const getSubjectColor = (subject: string) => {
  switch (subject.toLowerCase()) {
    case 'chemistry':
      return 'text-green-600 bg-green-50';
    case 'biology':
      return 'text-blue-600 bg-blue-50';
    case 'mathematics':
      return 'text-purple-600 bg-purple-50';
    case 'physics':
      return 'text-blue-900 bg-blue-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

const getSubjectIcon = (subject: string) => {
  switch (subject.toLowerCase()) {
    case 'chemistry':
      return '🧪';
    case 'biology':
      return '🧬';
    case 'mathematics':
      return '📐';
    case 'physics':
      return '⚛️';
    default:
      return '📚';
  }
};

export default function FacultyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
            <GraduationCap className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Expert Faculty</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet our dedicated team of experienced educators who are committed to your success in NEET and JEE preparation
          </p>
        </div>

        {/* Faculty Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {facultyMembers.map((faculty, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              {/* Faculty Avatar */}
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-24 flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl">
                  {getSubjectIcon(faculty.specialization)}
                </div>
              </div>

              {/* Faculty Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{faculty.name}</h3>
                <p className="text-gray-600 font-medium mb-3">{faculty.role}</p>

                {/* Subject Badge */}
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${getSubjectColor(faculty.specialization)}`}>
                  <BookOpen className="w-4 h-4 mr-1" />
                  {faculty.specialization}
                </div>

                {/* Details */}
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{faculty.experience} experience</span>
                  </div>

                  <div className="flex items-start text-sm text-gray-600">
                    <Award className="w-4 h-4 mr-2 text-gray-400 mt-0.5" />
                    <span>{faculty.qualification}</span>
                  </div>

                  {faculty.description && (
                    <p className="text-sm text-gray-500 mt-3 italic">
                      {faculty.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Faculty Excellence</h2>
            <p className="text-gray-600">Our faculty brings decades of combined experience</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">7</div>
              <div className="text-sm text-gray-600">Expert Faculty</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">50+</div>
              <div className="text-sm text-gray-600">Years Combined Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">4</div>
              <div className="text-sm text-gray-600">Subjects Covered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-1">1000+</div>
              <div className="text-sm text-gray-600">Students Mentored</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Learn from the Best?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of successful students who have achieved their dreams with guidance from our expert faculty
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Start Your Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}