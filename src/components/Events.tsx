import React from 'react';
import { Calendar, MapPin, Clock, Users, ExternalLink, ArrowRight } from 'lucide-react';

const Events = () => {
  const upcomingEvents = [
    {
      title: "International Conference on Chemical Engineering",
      date: "March 15-17, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "IIT Indore Campus",
      type: "Conference",
      description: "Join leading researchers and industry experts for three days of cutting-edge presentations and networking.",
      registrations: 450,
      maxCapacity: 500,
      status: "Registration Open",
      color: "bg-blue-500"
    },
    {
      title: "Workshop on Process Simulation",
      date: "February 28, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "Computer Lab, Block A",
      type: "Workshop",
      description: "Hands-on training on ASPEN Plus and other process simulation software for students and professionals.",
      registrations: 35,
      maxCapacity: 40,
      status: "Few Seats Left",
      color: "bg-orange-500"
    },
    {
      title: "Industry-Academia Interface Seminar",
      date: "April 5, 2025",
      time: "2:00 PM - 6:00 PM",
      location: "Auditorium",
      type: "Seminar",
      description: "Bridging the gap between academic research and industrial applications with expert panel discussions.",
      registrations: 120,
      maxCapacity: 200,
      status: "Registration Open",
      color: "bg-green-500"
    }
  ];

  const pastEvents = [
    {
      title: "ChemCon 2024",
      date: "November 20-22, 2024",
      participants: 500,
      description: "Successfully hosted our annual chemical engineering conference with international participation.",
      image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=500"
    },
    {
      title: "Research Symposium 2024",
      date: "September 15, 2024",
      participants: 300,
      description: "Showcasing cutting-edge research from our faculty and students.",
      image: "https://images.pexels.com/photos/1181676/pexels-photo-1181676.jpeg?auto=compress&cs=tinysrgb&w=500"
    },
    {
      title: "Alumni Meet 2024",
      date: "August 10, 2024",
      participants: 150,
      description: "Reconnecting with our alumni network and celebrating their achievements.",
      image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=500"
    }
  ];

  return (
    <section id="events" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Events & Activities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with our latest conferences, workshops, seminars, and academic activities 
            that foster learning and collaboration in the chemical engineering community.
          </p>
        </div>

        {/* Upcoming Events */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Upcoming Events</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                {/* Event Header */}
                <div className={`${event.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                      {event.type}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      event.status === 'Few Seats Left' 
                        ? 'bg-red-500/20 text-red-100' 
                        : 'bg-green-500/20 text-green-100'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold mb-2">{event.title}</h4>
                </div>

                {/* Event Details */}
                <div className="p-6">
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-3 text-blue-500" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-3 text-green-500" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-3 text-orange-500" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {event.description}
                  </p>

                  {/* Registration Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Registrations</span>
                      <span className="text-sm text-gray-500">
                        {event.registrations}/{event.maxCapacity}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${event.color} h-2 rounded-full transition-all duration-300`}
                        style={{ width: `${(event.registrations / event.maxCapacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center">
                    Register Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Past Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pastEvents.map((event, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    {event.title}
                  </h4>
                  <div className="flex items-center text-gray-600 mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-3">
                    <Users className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.participants} Participants</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {event.description}
                  </p>
                  <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Gallery
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Newsletter Signup */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-700 rounded-2xl p-8 lg:p-12 text-center text-white">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">
            Stay Updated
          </h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive updates about upcoming events, 
            conferences, and academic activities in the department.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;