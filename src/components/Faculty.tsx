import React from 'react';
import { Mail, ExternalLink, Award, BookOpen } from 'lucide-react';

const Faculty = () => {
  const facultyMembers = [
    {
      name: "Dr. Rajesh Kumar Sharma",
      position: "Professor & Head",
      education: "Ph.D. from IIT Delhi",
      research: ["Process Systems Engineering", "Optimization", "Machine Learning"],
      email: "rksharma@iiti.ac.in",
      publications: 85,
      experience: "15+ years",
      image: "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Dr. Priya Srivastava",
      position: "Professor",
      education: "Ph.D. from IISc Bangalore",
      research: ["Reaction Engineering", "Catalysis", "Green Chemistry"],
      email: "priya@iiti.ac.in",
      publications: 72,
      experience: "12+ years",
      image: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Dr. Amit Verma",
      position: "Associate Professor",
      education: "Ph.D. from IIT Bombay",
      research: ["Separation Processes", "Membrane Technology", "Water Treatment"],
      email: "averma@iiti.ac.in",
      publications: 56,
      experience: "10+ years",
      image: "https://images.pexels.com/photos/5212361/pexels-photo-5212361.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Dr. Neha Gupta",
      position: "Associate Professor",
      education: "Ph.D. from IIT Kanpur",
      research: ["Nanotechnology", "Materials Science", "Drug Delivery"],
      email: "ngupta@iiti.ac.in",
      publications: 48,
      experience: "8+ years",
      image: "https://images.pexels.com/photos/5212662/pexels-photo-5212662.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Dr. Suresh Patel",
      position: "Assistant Professor",
      education: "Ph.D. from IIT Madras",
      research: ["Environmental Engineering", "Air Pollution Control", "Sustainability"],
      email: "spatel@iiti.ac.in",
      publications: 35,
      experience: "6+ years",
      image: "https://images.pexels.com/photos/5212703/pexels-photo-5212703.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Dr. Kavita Singh",
      position: "Assistant Professor",
      education: "Ph.D. from IIT Kharagpur",
      research: ["Biotechnology", "Biochemical Engineering", "Fermentation"],
      email: "ksingh@iiti.ac.in",
      publications: 28,
      experience: "5+ years",
      image: "https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  return (
    <section id="faculty" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Faculty
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet our distinguished faculty members who are leaders in their respective fields, 
            committed to excellence in teaching and groundbreaking research.
          </p>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facultyMembers.map((faculty, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Faculty Image */}
              <div className="relative h-48 bg-gradient-to-br from-blue-400 to-blue-600">
                <img
                  src={faculty.image}
                  alt={faculty.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-blue-900/20"></div>
              </div>

              {/* Faculty Info */}
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {faculty.name}
                  </h3>
                  <p className="text-orange-600 font-medium mb-2">
                    {faculty.position}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {faculty.education}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center mb-1">
                      <BookOpen className="h-4 w-4 text-blue-600 mr-1" />
                    </div>
                    <p className="text-lg font-bold text-gray-900">{faculty.publications}</p>
                    <p className="text-xs text-gray-600">Publications</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Award className="h-4 w-4 text-orange-600 mr-1" />
                    </div>
                    <p className="text-lg font-bold text-gray-900">{faculty.experience}</p>
                    <p className="text-xs text-gray-600">Experience</p>
                  </div>
                </div>

                {/* Research Areas */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-900 mb-2">Research Areas:</p>
                  <div className="flex flex-wrap gap-1">
                    {faculty.research.map((area, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <a
                    href={`mailto:${faculty.email}`}
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    <span className="text-sm">Contact</span>
                  </a>
                  <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    <span className="text-sm">Profile</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Join Faculty CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-800 to-blue-700 rounded-2xl p-8 lg:p-12 text-center text-white">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Join Our Faculty Team
          </h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            We are always looking for exceptional faculty members who share our commitment 
            to excellence in teaching and research. Explore current opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200">
              View Openings
            </button>
            <button className="border-2 border-white hover:bg-white hover:text-blue-800 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200">
              Faculty Handbook
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faculty;