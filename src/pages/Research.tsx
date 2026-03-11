import React from 'react';
import Research from '../components/Research';

const ResearchPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* We removed the extra headings here because your 
        <Research /> component already has the beautiful 
        carousel and its own headers!
      */}
      <Research />
    </div>
  );
};

export default ResearchPage;