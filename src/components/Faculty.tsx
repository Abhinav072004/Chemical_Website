import { useState, useEffect } from 'react';
import { Mail, Award, BookOpen, Phone, MapPin, Home } from 'lucide-react';
import { useParams, NavLink } from 'react-router-dom';
import { getFaculty } from '../api';

const Faculty = () => {
  type FacultyCategory =
    | 'core'
    | 'visiting'
    | 'associate'
    | 'advisory'
    | 'working'
    | 'convenor'
    | 'hod'
    | 'admin'
    | 'technical';

  const [facultyMembers, setFacultyMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFaculty()
      .then((data) => {
        // REMOVED THE >= 5 RESTRICTION. It will now ALWAYS show your admin data!
        setFacultyMembers(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Failed to fetch faculty:", err))
      .finally(() => setLoading(false));
  }, []);

  const params = useParams<{ category?: FacultyCategory }>();
  const category = (params.category as FacultyCategory | undefined) || 'core';

  const categoryTitleMap: Record<string, string> = {
    core: 'Core Faculty',
    visiting: 'Visiting/Distinguished Faculty',
    associate: 'Associate Faculty',
    advisory: 'Advisory Committee',
    hod: 'Head of Department',
    admin: 'Administrative Staff',
    technical: 'Technical Staff',
    working: 'Working Committee',
    convenor: 'Convenor'
  };

  const visibleMembers = facultyMembers.filter((m) => m.category === category);

  const categories = [
    { id: 'core', label: 'Core Faculty', path: '/faculty' },
    { id: 'visiting', label: 'Visiting Faculty', path: '/faculty/visiting' },
    { id: 'associate', label: 'Associate Faculty', path: '/faculty/associate' },
    { id: 'advisory', label: 'Advisory Committee', path: '/faculty/advisory' },
    { id: 'hod', label: 'Head of Department', path: '/faculty/hod' },
    { id: 'admin', label: 'Administrative Staff', path: '/faculty/admin' },
    { id: 'technical', label: 'Technical Staff', path: '/faculty/technical' },
    { id: 'working', label: 'Working Committee', path: '/faculty/working' },
    { id: 'convenor', label: 'Convenor', path: '/faculty/convenor' },
  ];

  // This ensures your images look at port 3001 where they were just saved
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return '/placeholder.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:3001${imagePath}`;
  };

  return (
    <section id="faculty" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {categoryTitleMap[category] || 'Our Faculty'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet our distinguished faculty members who are leaders in their respective fields, 
            committed to excellence in teaching and groundbreaking research.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12 border-b border-gray-200 pb-6">
          {categories.map((cat) => (
            <NavLink
              key={cat.id}
              to={cat.path}
              end
              className={({ isActive }) =>
                `px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                }`
              }
            >
              {cat.label}
            </NavLink>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-xl text-gray-500">Loading live database...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleMembers.length === 0 && (
              <div className="col-span-full text-center py-10 text-gray-600 text-lg">
                No faculty found in this category. Add them via the Admin Panel!
              </div>
            )}
            
            {visibleMembers.map((faculty, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-col"
              >
                <div className="relative h-64 bg-gradient-to-br from-blue-400 to-blue-600">
                  <img
                    src={getImageUrl(faculty.image)}
                    alt={faculty.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/placeholder.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-blue-900/10"></div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{faculty.name}</h3>
                    <p className="text-orange-600 font-medium mb-2">{faculty.position}</p>
                    <p className="text-gray-600 text-sm mb-3">{faculty.education}</p>
                    
                    <div className="space-y-2 mb-3 mt-4 border-t pt-4">
                      {faculty.email && (
                        <div className="flex items-center text-gray-600 text-sm">
                          <Mail className="h-3.5 w-3.5 mr-2 text-blue-600 flex-shrink-0" />
                          <a href={`mailto:${faculty.email}`} className="hover:text-blue-600 truncate">
                            {faculty.email}
                          </a>
                        </div>
                      )}
                      {faculty.phone && (
                        <div className="flex items-center text-gray-600 text-sm">
                          <Phone className="h-3.5 w-3.5 mr-2 text-blue-600 flex-shrink-0" />
                          <span>{faculty.phone}</span>
                        </div>
                      )}
                      {faculty.office && (
                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPin className="h-3.5 w-3.5 mr-2 text-blue-600 flex-shrink-0" />
                          <span>{faculty.office}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {(faculty.publications || faculty.experience) && (
                    <div className="grid grid-cols-2 gap-3 mb-4 mt-auto">
                      {faculty.publications && (
                        <div className="bg-gray-50 rounded-lg p-2.5 text-center border border-gray-100">
                          <div className="flex items-center justify-center mb-1">
                            <BookOpen className="h-3.5 w-3.5 text-blue-600" />
                          </div>
                          <p className="text-base font-bold text-gray-900">{faculty.publications}</p>
                          <p className="text-xs text-gray-600">Publications</p>
                        </div>
                      )}
                      {faculty.experience && (
                        <div className="bg-gray-50 rounded-lg p-2.5 text-center border border-gray-100">
                          <div className="flex items-center justify-center mb-1">
                            <Award className="h-3.5 w-3.5 text-orange-600" />
                          </div>
                          <p className="text-base font-bold text-gray-900">{faculty.experience}</p>
                          <p className="text-xs text-gray-600">Experience</p>
                        </div>
                      )}
                    </div>
                  )}

                  {faculty.research && faculty.research.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-900 mb-2">Research Interests:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {faculty.research.map((area: string, idx: number) => (
                          <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {faculty.homePage && (
                    <div className="pt-3 border-t border-gray-100 mt-2">
                      <a
                        href={faculty.homePage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm"
                      >
                        <Home className="h-4 w-4 mr-2" />
                        Home Page
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Faculty;