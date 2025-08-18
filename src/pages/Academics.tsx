import React from 'react';
import Programs from '../components/Programs';

const AcademicsPage = () => {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Academics</h1>
          <p className="text-xl text-gray-600">Explore our academic programs and curriculum</p>
        </div>
      </div>
      <Programs />
    </div>
  );
};

export default AcademicsPage;
