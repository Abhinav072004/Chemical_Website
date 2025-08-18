import React from 'react';
import { Facebook, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Youtube, href: "#", label: "YouTube" }
  ];

  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Programs", href: "#academics" },
    { name: "Faculty", href: "#faculty" },
    { name: "Research", href: "#research" },
    { name: "Events", href: "#events" },
    { name: "Contact", href: "#contact" }
  ];

  const resourceLinks = [
    { name: "Academic Calendar", href: "#" },
    { name: "Course Catalog", href: "#" },
    { name: "Library", href: "#" },
    { name: "Student Portal", href: "#" },
    { name: "Alumni Network", href: "#" },
    { name: "Career Services", href: "#" }
  ];

  const researchLinks = [
    { name: "Research Areas", href: "#" },
    { name: "Publications", href: "#" },
    { name: "Laboratories", href: "#" },
    { name: "Collaborations", href: "#" },
    { name: "Funding Opportunities", href: "#" },
    { name: "Industry Partnerships", href: "#" }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Department Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-base">IIT</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">IIT Indore</h3>
                <p className="text-base text-gray-400">Chemical Engineering</p>
              </div>
            </div>
            <p className="text-gray-400 text-base leading-relaxed mb-4">
              Leading the future of chemical engineering through innovative education, 
              cutting-edge research, and industry collaboration.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center text-gray-400 text-base">
                <Phone className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>+91-732-2438-750</span>
              </div>
              <div className="flex items-center text-gray-400 text-base">
                <Mail className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>chemical@iiti.ac.in</span>
              </div>
              <div className="flex items-start text-gray-400 text-base">
                <MapPin className="h-5 w-5 mr-2 flex-shrink-0 mt-1" />
                <span>Khandwa Road, Simrol, Indore - 453552, MP, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-base transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-base transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Research */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Research</h4>
            <ul className="space-y-2">
              {researchLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white text-base transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Newsletter */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-col items-center space-y-6">
            {/* Social Links */}
            <div className="flex flex-col items-center space-y-3">
              <span className="text-gray-300 text-base font-medium">Follow us:</span>
              <div className="flex items-center space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="bg-gray-800 hover:bg-blue-600 p-3 rounded-full transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            {/* <div className="flex flex-col items-center space-y-3">
              <span className="text-gray-300 text-base font-medium">Stay updated:</span>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-gray-800 border border-gray-700 rounded-l-lg px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-r-lg text-base font-medium transition-colors duration-200">
                  Subscribe
                </button>
              </div>
            </div> */}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-gray-400 text-base">
            © 2025 Department of Chemical Engineering, IIT Indore. All rights reserved. Developed by Abhinav Singh.
          </div>
          <div className="flex items-center space-x-6 text-gray-400 text-base">
            <a href="#" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors duration-200">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;