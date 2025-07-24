import React from 'react';
import { GraduationCap, BookOpen, FlaskConical, ChevronRight } from 'lucide-react';

const Programs = () => {
  const programs = [
    {
      icon: BookOpen,
      title: "B.Tech Chemical Engineering",
      duration: "4 Years",
      description: "Comprehensive undergraduate program covering fundamentals of chemical engineering with hands-on laboratory experience.",
      highlights: [
        "Core chemical engineering principles",
        "Process design and simulation",
        "Industrial training",
        "Capstone projects"
      ],
      color: "bg-blue-500"
    },
    {
      icon: GraduationCap,
      title: "M.Tech Chemical Engineering",
      duration: "2 Years",
      description: "Advanced postgraduate program with specialization options and research-oriented curriculum.",
      highlights: [
        "Specialized electives",
        "Research methodology",
        "Thesis work",
        "Industry collaboration"
      ],
      color: "bg-green-500"
    },
    {
      icon: FlaskConical,
      title: "Ph.D. Program",
      duration: "3-5 Years",
      description: "Research-intensive doctoral program for aspiring researchers and academicians.",
      highlights: [
        "Cutting-edge research",
        "International collaborations",
        "Publication opportunities",
        "Teaching experience"
      ],
      color: "bg-purple-500"
    }
  ];

  const specializations = [
    "Process Systems Engineering",
    "Reaction Engineering",
    "Separation Processes",
    "Environmental Engineering",
    "Nanotechnology",
    "Biotechnology",
    "Energy Systems",
    "Materials Engineering"
  ];

  return (
    <section id="academics" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Academic Programs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive programs designed to prepare the next generation of chemical engineers 
            with strong theoretical foundation and practical skills.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center mb-6">
                <div className={`${program.color} p-3 rounded-lg mr-4`}>
                  <program.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{program.title}</h3>
                  <p className="text-gray-500 text-sm">{program.duration}</p>
                </div>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {program.description}
              </p>

              <div className="space-y-3 mb-8">
                {program.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{highlight}</span>
                  </div>
                ))}
              </div>

              <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200">
                Learn More
              </button>
            </div>
          ))}
        </div>

        {/* Specializations */}
        <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Research Specializations
            </h3>
            <p className="text-lg text-gray-600">
              Explore cutting-edge research areas and find your passion in chemical engineering
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {specializations.map((spec, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 text-center hover:bg-blue-50 hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <p className="text-gray-800 font-medium text-sm">{spec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Admission Info */}
        <div className="mt-16 bg-gradient-to-r from-blue-800 to-blue-700 rounded-2xl p-8 lg:p-12 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Ready to Join Us?
              </h3>
              <p className="text-blue-100 leading-relaxed mb-6">
                Take the first step towards an exciting career in chemical engineering. 
                Our admissions process is designed to identify passionate and talented individuals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                  Admission Process
                </button>
                <button className="border-2 border-white hover:bg-white hover:text-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200">
                  Download Brochure
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold mb-1">JEE Advanced</p>
                <p className="text-blue-100 text-sm">For B.Tech</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold mb-1">GATE</p>
                <p className="text-blue-100 text-sm">For M.Tech</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold mb-1">NET/GATE</p>
                <p className="text-blue-100 text-sm">For Ph.D</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold mb-1">100%</p>
                <p className="text-blue-100 text-sm">Placement Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Programs;