import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // <-- ADDED: Needed for clickable blocks
import { FlaskConical, Network, Droplets, Dna, Leaf, Brain, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const Research = () => {
  // --- NEW: Carousel State and Data ---
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      tagline: "Congratulations!",
      name: "Prof. Dipin S. Pillai",
      description: "ON BEING SELECTED AS INDIAN NATIONAL ACADEMY OF ENGINEERING YOUNG ASSOCIATES FOR THE YEAR 2023",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300",
      bg: "bg-[#1e293b]" // Dark blue
    },
    {
      id: 2,
      tagline: "Student Awardees",
      name: "56th Convocation",
      description: "Celebrating the outstanding achievements and medals awarded to our Chemical Engineering graduates.",
      image: "https://images.pexels.com/photos/7944111/pexels-photo-7944111.jpeg?auto=compress&cs=tinysrgb&w=300",
      bg: "bg-[#0f172a]" // Darker slate
    },
    {
      id: 3,
      tagline: "Distinguished Alumnus",
      name: "Mr. Anup Bagchi",
      description: "Awarded the prestigious Distinguished Alumnus Award 2023 for excellence in corporate leadership.",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300",
      bg: "bg-[#172554]" // Deep blue
    }
  ];

  // Auto-advance slides every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  // --- ADDED SLUGS FOR ROUTING ---
  const researchAreas = [
    { slug: 'process-systems', icon: Network, title: "Process Systems Engineering", color: "bg-[#2E2854]" },
    { slug: 'biosystems', icon: Dna, title: "Biosystems and Biochemical Engineering", color: "bg-[#2D736A]" },
    { slug: 'catalysis', icon: FlaskConical, title: "Catalysis and Reaction Engineering", color: "bg-[#8F7E4F]" },
    { slug: 'soft-matter', icon: Droplets, title: "Soft Matter, Rheology and Complex Fluids", color: "bg-[#8D4426]" },
    { slug: 'ai-ml', icon: Brain, title: "AI and ML applications in Chemical Engineering", color: "bg-[#1E6B7A]" },
    { slug: 'sustainability', icon: Leaf, title: "Sustainability and Energy", color: "bg-[#45773C]" }
  ];

  const facilities = [
    {
      name: "Advanced Process Control Lab",
      description: "State-of-the-art facility for process monitoring and control research",
      image: "https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=500"
    },
    {
      name: "Nanotechnology Research Center",
      description: "Clean room facilities for nanomaterial synthesis and characterization",
      image: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=500"
    },
    {
      name: "Environmental Engineering Lab",
      description: "Comprehensive setup for water and air quality analysis",
      image: "https://images.pexels.com/photos/2280551/pexels-photo-2280551.jpeg?auto=compress&cs=tinysrgb&w=500"
    }
  ];

  return (
    <section id="research" className="bg-white">
      {/* Injecting custom CSS for the continuous ticker animation.
        This allows us to do it without external libraries!
      */}
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-ticker {
          display: inline-block;
          white-space: nowrap;
          animation: ticker 25s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* --- HERO CAROUSEL SECTION --- */}
      <div className="relative w-full h-[400px] md:h-[450px] overflow-hidden group">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out flex items-center justify-center ${slide.bg} ${
              currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Pattern Overlay */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
            
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row items-center justify-between z-20 gap-8">
              
              {/* Text Content */}
              <div className="flex-1 text-center md:text-left text-white">
                <h2 className="text-3xl md:text-5xl font-serif italic text-blue-200 mb-4 tracking-wide">
                  {slide.tagline}
                </h2>
                <div className="inline-block bg-white text-blue-900 px-4 py-1 rounded shadow-sm mb-4">
                  <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wider">
                    {slide.name}
                  </h3>
                </div>
                <p className="text-sm md:text-lg text-gray-300 max-w-2xl uppercase tracking-widest leading-relaxed">
                  {slide.description}
                </p>
              </div>

              {/* Image Container */}
              <div className="flex-shrink-0">
                <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-white/20 shadow-2xl overflow-hidden p-2 bg-white/5">
                  <img src={slide.image} alt={slide.name} className="w-full h-full object-cover rounded-full" />
                </div>
              </div>

            </div>
          </div>
        ))}

        {/* Carousel Controls */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/20 hover:bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 bg-black/20 hover:bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white scale-125 shadow-lg' : 'bg-white/40 hover:bg-white/60'}`}
            />
          ))}
        </div>
      </div>

      {/* --- TICKER TAPE --- */}
      <div className="bg-gray-100 border-b border-gray-200 py-2 overflow-hidden shadow-inner">
        <div className="max-w-full overflow-hidden">
          <div className="animate-ticker text-sm font-semibold text-gray-700 cursor-pointer">
            <span className="text-red-600 mx-3">●</span> 
            ChE Newsletter Dec 2024 - Vol 3, Issue 2 is out now!
            <span className="text-red-600 mx-3">●</span> 
            Department of Chemical Engineering congratulates all graduating students.
            <span className="text-red-600 mx-3">●</span> 
            Upcoming one-day hands-on workshop on Gas Chromatography (GC-MS). Register today!
            <span className="text-red-600 mx-3">●</span> 
            Follow @cheme_iiti on Twitter for latest updates.
          </div>
        </div>
      </div>

      {/* --- EXISTING RESEARCH CONTENT BELOW --- */}
      <div className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Research & Innovation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our cutting-edge research initiatives addressing global challenges 
            and driving technological innovation for a sustainable future.
          </p>
        </div>

        {/* CHANGED TO CLICKABLE LINKS */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto border-4 border-white shadow-2xl overflow-hidden rounded-xl">
            {researchAreas.map((area, index) => (
              <Link
                key={index}
                to={`/research/${area.slug}`} // <-- ROUTES TO THE NEW DETAIL PAGE
                className={`${area.color} group flex flex-col items-center justify-center text-center p-12 min-h-[320px] border border-white/20 hover:brightness-110 transition-all cursor-pointer relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300"></div>
                <area.icon className="w-16 h-16 text-white mb-6 opacity-90 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                <h3 className="text-xl lg:text-2xl font-bold text-white mb-8 leading-tight px-4 z-10">
                  {area.title}
                </h3>
                <div className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center text-white group-hover:bg-white group-hover:text-gray-900 transition-colors duration-300 z-10">
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Research Facilities */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Research Facilities
            </h3>
            <p className="text-lg text-gray-600">
              World-class laboratories and equipment supporting cutting-edge research
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-48 overflow-hidden">
                  <img src={facility.image} alt={facility.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{facility.name}</h4>
                  <p className="text-gray-600 text-sm">{facility.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collaboration CTA */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-700 rounded-2xl p-8 lg:p-12 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">Collaborate With Us</h3>
              <p className="text-blue-100 leading-relaxed mb-6">
                We welcome collaborations with industry, academia, and research institutions. 
                Join us in advancing chemical engineering research and innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                  Partnership Opportunities
                </button>
                <button className="border-2 border-white hover:bg-white hover:text-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200">
                  Research Proposals
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold mb-1">50+</p>
                <p className="text-blue-100 text-sm">Industry Partners</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold mb-1">25+</p>
                <p className="text-blue-100 text-sm">Int. Collaborations</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold mb-1">100+</p>
                <p className="text-blue-100 text-sm">PhD Scholars</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold mb-1">15+</p>
                <p className="text-blue-100 text-sm">Patents Filed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Research;