import React from 'react';
import { MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-16 lg:py-24 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have questions about our programs, research, or admissions? 
            We're here to help you every step of the way.
          </p>
        </div>

        {/* Map Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Find Us on Campus</h3>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <div className="w-full h-96 bg-gray-700 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Interactive campus map would be embedded here</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Department of Chemical Engineering, IIT Indore
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-300 mb-4">
                Located in the heart of IIT Indore campus, our department is easily accessible 
                from all major campus facilities.
              </p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;