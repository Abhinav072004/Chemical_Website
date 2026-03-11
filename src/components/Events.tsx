import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, ExternalLink, ArrowRight } from 'lucide-react';
import { getEvents } from '../api';

// Fallback data is only used if your database is completely empty
const FALLBACK_UPCOMING = [
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
  }
];

const FALLBACK_PAST = [
  {
    title: "ChemCon 2024",
    date: "November 20-22, 2024",
    participants: 500,
    description: "Successfully hosted our annual chemical engineering conference with international participation.",
    image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=500"
  }
];

const Events = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [pastEvents, setPastEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents()
      .then((data) => {
        const nextUpcoming = Array.isArray(data.upcoming) ? data.upcoming : [];
        const nextPast = Array.isArray(data.past) ? data.past : [];
        
        // If database has data, use it! Otherwise, use fallback so page isn't empty
        if (nextUpcoming.length > 0 || nextPast.length > 0) {
          setUpcomingEvents(nextUpcoming);
          setPastEvents(nextPast);
        } else {
          setUpcomingEvents(FALLBACK_UPCOMING);
          setPastEvents(FALLBACK_PAST);
        }
      })
      .catch((err) => console.error("Failed to load events:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="events" className="py-12 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header (Now it's the only header on the page!) */}
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
          <h3 className="text-2xl font-bold text-gray-900 mb-8 border-b-2 border-orange-500 pb-2 inline-block">Upcoming Events</h3>
          {upcomingEvents.length === 0 && !loading ? (
            <p className="text-gray-500">No upcoming events scheduled at this time.</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => (
                <div
                  key={event.id || index}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-col"
                >
                  {/* Event Header */}
                  <div className={`${event.color || 'bg-blue-600'} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                        {event.type || 'Event'}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        event.status === 'Few Seats Left' 
                          ? 'bg-red-500/20 text-red-100' 
                          : 'bg-green-500/20 text-green-100'
                      }`}>
                        {event.status || 'Open'}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold mb-2">{event.title}</h4>
                  </div>

                  {/* Event Details */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-3 text-blue-500" />
                        <span className="text-sm">{event.date}</span>
                      </div>
                      {event.time && (
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-3 text-green-500" />
                          <span className="text-sm">{event.time}</span>
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-3 text-orange-500" />
                          <span className="text-sm">{event.location}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                      {event.description}
                    </p>

                    {/* Registration Progress */}
                    {event.maxCapacity && event.maxCapacity > 0 && (
                      <div className="mb-6 mt-auto">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Registrations</span>
                          <span className="text-sm text-gray-500">
                            {event.registrations || 0}/{event.maxCapacity}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`${event.color || 'bg-blue-600'} h-2 rounded-full transition-all duration-300`}
                            style={{ width: `${Math.min(((event.registrations || 0) / event.maxCapacity) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center mt-auto">
                      Register Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Past Events */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 border-b-2 border-orange-500 pb-2 inline-block">Past Events</h3>
          {pastEvents.length === 0 && !loading ? (
            <p className="text-gray-500">No past events found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pastEvents.map((event, index) => (
                <div
                  key={event.id || index}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col"
                >
                  <div className="h-48 overflow-hidden bg-gray-200 relative">
                    {/* Handles both uploaded images from backend and HTTP links */}
                    <img
                      src={event.image ? (event.image.startsWith('http') ? event.image : `http://localhost:3001${event.image}`) : '/default-event.jpg'}
                      alt={event.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                      {event.title}
                    </h4>
                    <div className="flex items-center text-gray-600 mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    {event.participants && (
                      <div className="flex items-center text-gray-600 mb-3">
                        <Users className="h-4 w-4 mr-2" />
                        <span className="text-sm">{event.participants} Participants</span>
                      </div>
                    )}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                      {event.description}
                    </p>
                    <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm mt-auto">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default Events;