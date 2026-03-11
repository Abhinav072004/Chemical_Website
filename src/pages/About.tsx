import React from 'react';
import About from '../components/About';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white pb-20 pt-8">
      {/* We removed the extra headers here because the new 
        About component handles the titles perfectly! 
      */}
      <About />
    </div>
  );
};

export default AboutPage;
