import React, { useState, useEffect } from 'react';
import { ArrowRight, Award, Users, BookOpen, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getNews } from '../api'; // <-- IMPORT THE API

const Hero = () => {
  // --- ADDED STATE FOR DYNAMIC NEWS ---
  const [news, setNews] = useState<{id: number, text: string}[]>([]);

  useEffect(() => {
    getNews()
      .then(setNews)
      .catch(err => console.error("Failed to load news ticker", err));
  }, []);

  return (
    <div className="w-full flex flex-col">
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }
        .ticker-container {
          display: flex;
          white-space: nowrap;
          animation: scroll-left 35s linear infinite;
        }
        .ticker-wrapper:hover .ticker-container {
          animation-play-state: paused;
        }
      `}</style>

      {/* --- RUNNING NEWS BANNER --- */}
      <div className="bg-white border-b border-gray-200 py-2.5 relative overflow-hidden flex items-center ticker-wrapper shadow-sm">
        <div className="absolute left-0 top-0 bottom-0 bg-orange-500 text-white px-4 md:px-6 font-bold z-20 flex items-center shadow-[4px_0_12px_rgba(0,0,0,0.15)]">
          <Bell className="w-4 h-4 mr-2 animate-pulse" /> 
          <span className="hidden sm:inline tracking-wide uppercase text-sm">Latest News</span>
          <span className="sm:hidden tracking-wide uppercase text-sm">News</span>
        </div>
        
        <div className="w-full overflow-hidden flex-1">
          <div className="ticker-container text-sm sm:text-base font-semibold text-gray-800 cursor-pointer pl-4">
            
            {/* --- MAP DYNAMIC NEWS HERE --- */}
            {news.length === 0 ? (
              <span className="text-gray-500 mx-6">Welcome to the Department of Chemical Engineering...</span>
            ) : (
              news.map((item) => (
                <span key={item.id} className="inline-flex items-center">
                  <span className="text-blue-600 mx-6">●</span> 
                  {item.text}
                </span>
              ))
            )}

          </div>
        </div>
      </div>

      <section id="home" className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 xl:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
            <div className="space-y-6 lg:space-y-8">
              <div className="space-y-3 lg:space-y-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-snug">
                  Department of
                  <span className="inline-block pb-3 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-300">
                    Chemical Engineering
                  </span>
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl text-blue-100">
                  Indian Institute of Technology Indore
                </p>
              </div>

              <p className="text-base sm:text-lg lg:text-xl text-blue-100 leading-relaxed max-w-2xl">
                Leading innovation in chemical engineering education and research. 
                Join us in shaping the future of sustainable technology and process engineering.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link to="/academics" className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center group text-sm sm:text-base">
                  Explore Programs
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                
                <Link to="/research" className="border-2 border-white hover:bg-white hover:text-blue-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base text-center flex items-center justify-center">
                  Research Areas
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 bg-orange-500 rounded-lg">
                    <Award className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold">Top 12</p>
                    <p className="text-sm sm:text-base text-blue-100">Engineering Institute</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 bg-orange-500 rounded-lg">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold">50+</p>
                    <p className="text-sm sm:text-base text-blue-100">Faculty Members</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 bg-orange-500 rounded-lg">
                    <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold">500+</p>
                    <p className="text-sm sm:text-base text-blue-100">Students</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="p-2 sm:p-3 bg-orange-500 rounded-lg">
                    <Award className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xl sm:text-2xl font-bold">15+</p>
                    <p className="text-sm sm:text-base text-blue-100">Research Labs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-400"></div>
      </section>
    </div>
  );
};

export default Hero;