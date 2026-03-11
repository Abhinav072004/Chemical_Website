import React from 'react';
import Contact from '../components/Contact';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white pb-20 pt-8">
      {/* We removed the extra headers here because the new 
        Contact component handles the titles perfectly! 
      */}
      <Contact />
    </div>
  );
};

export default ContactPage;