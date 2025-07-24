import React from 'react';
import { FlaskConical, Cpu, Leaf, Zap, Award, TrendingUp } from 'lucide-react';

const Research = () => {
  const researchAreas = [
    {
      icon: FlaskConical,
      title: "Process Systems Engineering",
      description: "Advanced modeling, simulation, and optimization of chemical processes using cutting-edge computational tools.",
      projects: 15,
      funding: "₹5.2 Cr",
      color: "bg-blue-500"
    },
    {
      icon: Leaf,
      title: "Environmental Engineering",
      description: "Sustainable solutions for air and water pollution control, waste management, and environmental remediation.",
      projects: 12,
      funding: "₹3.8 Cr",
      color: "bg-green-500"
    },
    {
      icon: Cpu,
      title: "Nanotechnology & Materials",
      description: "Development of novel nanomaterials for catalysis, drug delivery, and advanced functional applications.",
      projects: 18,
      funding: "₹4.5 Cr",
      color: "bg-purple-500"
    },
    {
      icon: Zap,
      title: "Energy Systems",
      description: "Research in renewable energy, fuel cells, batteries, and sustainable energy conversion technologies.",
      projects: 10,
      funding: "₹6.1 Cr",
      color: "bg-orange-500"
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: "Research Excellence",
      value: "250+",
      subtitle: "Publications in Top Journals"
    },
    {
      icon: TrendingUp,
      title: "Impact Factor",
      value: "12.5",
      subtitle: "Average IF of Publications"
    },
    {
      icon: FlaskConical,
      title: "Active Projects",
      value: "55+",
      subtitle: "Ongoing Research Projects"
    },
    {
      icon: Award,
      title: "Funding Secured",
      value: "₹25 Cr+",
      subtitle: "Total Research Funding"
    }
  ];

  const facilities = [
    {
      name: "Advanced Process Control Lab",
      description: "State-of-the-art facility for process monitoring and control research",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=500"
    },
    {
      name: "Nanotechnology Research Center",
      description: "Clean room facilities for nanomaterial synthesis and characterization",
      image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=500"
    },
    {
      name: "Environmental Engineering Lab",
      description: "Comprehensive setup for water and air quality analysis",
      image: "https://images.pexels.com/photos/2280551/pexels-photo-2280551.jpeg?auto=compress&cs=tinysrgb&w=500"
    }
  ];

  return (
    <section id="research" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Research & Innovation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pioneering research in chemical engineering that addresses global challenges 
            and drives technological innovation for a sustainable future.
          </p>
        </div>

        {/* Research Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {researchAreas.map((area, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-start space-x-4">
                <div className={`${area.color} p-3 rounded-lg flex-shrink-0`}>
                  <area.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {area.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {area.description}
                  </p>
                  <div className="flex items-center space-x-6">
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{area.projects}</p>
                      <p className="text-sm text-gray-500">Active Projects</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-orange-600">{area.funding}</p>
                      <p className="text-sm text-gray-500">Total Funding</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Research Achievements */}
        <div className="bg-gray-50 rounded-2xl p-8 lg:p-12 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Research Impact
            </h3>
            <p className="text-lg text-gray-600">
              Our research achievements demonstrate our commitment to excellence and innovation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 text-center hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 mx-auto">
                  <achievement.icon className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {achievement.value}
                </p>
                <p className="text-lg font-medium text-gray-900 mb-1">
                  {achievement.title}
                </p>
                <p className="text-sm text-gray-600">
                  {achievement.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Research Facilities */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Research Facilities
            </h3>
            <p className="text-lg text-gray-600">
              World-class laboratories and equipment supporting cutting-edge research
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {facility.name}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {facility.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collaboration CTA */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-700 rounded-2xl p-8 lg:p-12 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                Collaborate With Us
              </h3>
              <p className="text-blue-100 leading-relaxed mb-6">
                We welcome collaborations with industry, academia, and research institutions. 
                Join us in advancing chemical engineering research and innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                  Partnership Opportunities
                </button>
                <button className="border-2 border-white hover:bg-white hover:text-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200">
                  Research Proposals
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold mb-1">50+</p>
                <p className="text-blue-100 text-sm">Industry Partners</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold mb-1">25+</p>
                <p className="text-blue-100 text-sm">International Collaborations</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold mb-1">100+</p>
                <p className="text-blue-100 text-sm">PhD Scholars</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold mb-1">15+</p>
                <p className="text-blue-100 text-sm">Patents Filed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Research;