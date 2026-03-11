import React from 'react';
import { Map, Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- TOP SECTION: IIT Guwahati Clean Grid Style --- */}
        <div className="mb-16 max-w-6xl mx-auto">
          <h2 className="text-2xl font-normal text-[#0a2342]">Contact Address</h2>
          {/* IIT Style Teal Underline */}
          <div className="w-12 h-1 bg-teal-500 mt-2 mb-8"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Address Card */}
            <div className="bg-[#f5f5f5] p-8 flex flex-col items-start transition-colors hover:bg-gray-200 min-h-[220px]">
              <Map className="w-10 h-10 text-gray-700 mb-6" strokeWidth={1.5} />
              <h3 className="text-lg font-normal text-gray-900 mb-3">Address</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Department of Chemical Engineering,<br />
                POD-1D, 5th Floor,<br />
                Indian Institute of Technology Indore,<br />
                Khandwa Road, Simrol,<br />
                Indore, Madhya Pradesh - 453552, India
              </p>
            </div>

            {/* Email Card */}
            <div className="bg-[#f5f5f5] p-8 flex flex-col items-start transition-colors hover:bg-gray-200 min-h-[220px]">
              <Mail className="w-10 h-10 text-gray-700 mb-6" strokeWidth={1.5} />
              <h3 className="text-lg font-normal text-gray-900 mb-3">Email</h3>
              <a href="mailto:chemenggoffice@iiti.ac.in" className="text-blue-500 text-sm hover:underline">
                chemenggoffice@iiti.ac.in
              </a>
            </div>

            {/* Phone Card */}
            <div className="bg-[#f5f5f5] p-8 flex flex-col items-start transition-colors hover:bg-gray-200 min-h-[220px]">
              <Phone className="w-10 h-10 text-gray-700 mb-6" strokeWidth={1.5} />
              <h3 className="text-lg font-normal text-gray-900 mb-3">Contact No</h3>
              <p className="text-gray-600 text-sm">
                +91 731 660333 5594
              </p>
            </div>

          </div>
        </div>

        {/* --- BOTTOM SECTION: Your Beautiful Dark Map Container --- */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-gray-900 rounded-xl p-6 md:p-8 shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-center text-white">Find Us on Campus</h3>
            
            {/* The actual map embedded inside the dark container */}
            <div className="w-full h-[400px] md:h-[450px] bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
              <iframe
                title="IIT Indore Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.7588075765664!2d75.91853451535798!3d22.51934334081829!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962efcccbce7145%3A0x784e8cb69818596b!2sIndian%20Institute%20Of%20Technology%E2%80%93Indore%20(IIT%E2%80%93Indore)!5e0!3m2!1sen!2sin!4v1678123456789!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
                Located in the heart of the IIT Indore campus, our department is easily accessible 
                from all major campus facilities.
              </p>
              <a 
                href="https://goo.gl/maps/bH3gQwHqKxU7D4B66" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Get Directions
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;