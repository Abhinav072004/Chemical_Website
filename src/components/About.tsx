import React from 'react';
import { Target, Eye, Award, Users } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Target,
      title: "Excellence in Education",
      description: "Providing world-class education in chemical engineering with cutting-edge curriculum and industry-relevant skills."
    },
    {
      icon: Eye,
      title: "Research Innovation",
      description: "Leading groundbreaking research in sustainable processes, nanotechnology, and environmental engineering."
    },
    {
      icon: Award,
      title: "Industry Partnerships",
      description: "Strong collaborations with leading industries for internships, placements, and research opportunities."
    },
    {
      icon: Users,
      title: "Global Network",
      description: "Alumni network spanning across prestigious institutions and multinational corporations worldwide."
    }
  ];

  return (
    <section id="about" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            About Our Department
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The Department of Chemical Engineering at IIT Indore is committed to excellence in education, 
            research, and service to society through innovative chemical engineering solutions.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Legacy</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Since its establishment, our department has been at the forefront of chemical engineering 
                education and research in India. We have consistently maintained high academic standards 
                while fostering innovation and creativity among our students and faculty.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our comprehensive programs prepare students to tackle complex global challenges in areas 
                such as sustainable energy, environmental protection, and advanced materials development.
              </p>
            </div>

            {/* Vision & Mission removed as requested */}
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Chemical Engineering Laboratory"
                className="w-full h-96 object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white p-4 rounded-lg shadow-lg">
              <p className="text-sm font-medium">Established</p>
              <p className="text-2xl font-bold">2009</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <feature.icon className="h-6 w-6 text-blue-800" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;