import React from 'react';
import Faculty from '../components/Faculty';

const FacultyPage = () => {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Faculty</h1>
          <p className="text-xl text-gray-600">Meet our distinguished faculty members</p>
        </div>
      </div>
      <Faculty />
    </div>
  );
};

export default FacultyPage;
