import React from 'react';
import Events from '../components/Events';

const EventsPage = () => {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Events</h1>
          <p className="text-xl text-gray-600">Stay updated with our latest events and activities</p>
        </div>
      </div>
      <Events />
    </div>
  );
};

export default EventsPage;
