import React from 'react';
import Contact from '../components/Contact';

const ContactPage = () => {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">Get in touch with our department</p>
        </div>
      </div>
      <Contact />
    </div>
  );
};

export default ContactPage;
