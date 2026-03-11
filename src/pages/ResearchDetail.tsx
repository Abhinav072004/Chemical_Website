import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getFaculty, type FacultyMember } from '../api';

// Static definitions for the page headers and descriptions
const AREA_DETAILS: Record<string, { title: string; color: string; description: string }> = {
  'process-systems': { 
    title: "Process Systems Engineering", 
    color: "bg-[#2E2854]", 
    description: "Advanced modeling, simulation, and optimization of chemical processes using cutting-edge computational tools. Our research focuses on improving efficiency, reducing environmental impact, and ensuring safety across large-scale industrial systems." 
  },
  'biosystems': { 
    title: "Biosystems and Biochemical Engineering", 
    color: "bg-[#2D736A]", 
    description: "Integrating engineering principles with biological systems to develop new healthcare technologies, biopharmaceuticals, and sustainable bioprocesses. We bridge the gap between biology and engineering to solve pressing medical and environmental challenges." 
  },
  'catalysis': { 
    title: "Catalysis and Reaction Engineering", 
    color: "bg-[#8F7E4F]", 
    description: "Developing novel catalysts and reaction pathways for sustainable chemical synthesis, clean energy generation, and environmental remediation. Our state-of-the-art facilities allow for deep molecular-level understanding of catalytic mechanisms." 
  },
  'soft-matter': { 
    title: "Soft Matter, Rheology and Complex Fluids", 
    color: "bg-[#8D4426]", 
    description: "Investigating the flow behavior and structural properties of polymers, colloids, and nanomaterials. This fundamental research drives innovations in advanced manufacturing, targeted drug delivery, and smart material design." 
  },
  'ai-ml': { 
    title: "AI and ML applications in Chemical Engineering", 
    color: "bg-[#1E6B7A]", 
    description: "Applying artificial intelligence and machine learning to predict material properties, optimize complex chemical reactions, and automate process control. We are pushing the boundaries of traditional engineering through data-driven discovery." 
  },
  'sustainability': { 
    title: "Sustainability and Energy", 
    color: "bg-[#45773C]", 
    description: "Pioneering research in renewable energy storage, carbon capture technologies, and sustainable chemical manufacturing. Our mission is to engineer practical solutions that combat climate change and transition towards a circular economy." 
  },
};

export default function ResearchDetail() {
  const { slug } = useParams<{ slug: string }>();
  const area = slug ? AREA_DETAILS[slug] : null;

  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [sliderIndex, setSliderIndex] = useState(0);

  useEffect(() => {
    const fetchFaculty = async () => {
      setLoading(true);
      try {
        const allFaculty = await getFaculty();
        // Automatically filter faculty whose research array includes this area's title
        const matchingFaculty = allFaculty.filter(f => 
          f.research && area && f.research.some(r => r.toLowerCase().includes(area.title.toLowerCase()))
        );
        setFaculty(matchingFaculty);
      } catch (error) {
        console.error("Failed to fetch faculty", error);
      } finally {
        setLoading(false);
      }
    };
    if (area) fetchFaculty();
  }, [area]);

  if (!area) return <div className="text-center py-24 text-2xl font-semibold text-gray-700">Research area not found.</div>;

  // Carousel Logic
  const itemsVisible = 4; 
  const nextSlide = () => setSliderIndex(prev => Math.min(prev + 1, Math.max(0, faculty.length - itemsVisible)));
  const prevSlide = () => setSliderIndex(prev => Math.max(prev - 1, 0));

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* 1. IIT Kanpur Style Hero Header */}
      <div className={`${area.color} py-16 text-center shadow-inner relative overflow-hidden`}>
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        
        <div className="relative max-w-4xl mx-auto px-4 z-10">
          <div className="flex justify-center mb-6">
             {/* Simple node dots mimicking the image top */}
            <div className="flex items-center space-x-3">
              <span className="w-3 h-3 rounded-full bg-blue-300 shadow-[0_0_10px_rgba(147,197,253,0.8)]"></span>
              <div className="w-8 h-0.5 bg-white/30"></div>
              <span className="w-4 h-4 rounded-full bg-purple-300 shadow-[0_0_10px_rgba(216,180,254,0.8)]"></span>
              <div className="w-8 h-0.5 bg-white/30"></div>
              <span className="w-3 h-3 rounded-full bg-orange-300 shadow-[0_0_10px_rgba(253,186,116,0.8)]"></span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide">
            {area.title}
          </h1>
        </div>
      </div>

      {/* 2. Description Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <h2 className="text-sm md:text-base font-semibold text-gray-500 uppercase tracking-widest border-b border-gray-200 pb-2 mb-6 inline-block">
          {area.title}
        </h2>
        
        <div className="text-gray-700 text-base md:text-lg leading-relaxed space-y-4 text-justify mb-16 max-w-5xl">
          <p>{area.description}</p>
          <p>
            Ours is one of the leading departments in this research domain, endowed with state-of-the-art research facilities. The mission is to develop highly innovative materials and processes for society via continuous innovation. Currently, several faculty members are involved in multidisciplinary research projects. Several projects have been funded by government agencies (e.g., DST, DBT, DRDO) as well as leading industries.
          </p>
        </div>

        {/* 3. Floating Professors Carousel */}
        <h2 className="text-sm md:text-base font-semibold text-gray-500 uppercase tracking-widest border-b-2 border-red-500 pb-2 mb-8 inline-block">
          List of Faculty Working in this Area
        </h2>

        {loading ? (
          <p className="text-gray-500 italic">Loading faculty members...</p>
        ) : faculty.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center text-gray-500">
            Faculty profiles for this area are currently being updated.
          </div>
        ) : (
          <div className="relative group px-4 md:px-12">
            {/* Carousel Track */}
            <div className="overflow-hidden py-4">
              <div 
                className="flex transition-transform duration-500 ease-in-out gap-6"
                style={{ transform: `translateX(calc(-${sliderIndex * (100 / itemsVisible)}% - ${sliderIndex * 6}px))` }}
              >
                {faculty.map((member) => (
                  <Link 
                    to="/faculty" // Links back to the main faculty directory
                    key={member.id} 
                    className="w-[calc(100%-1.5rem)] sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)] flex-shrink-0 border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white transform hover:-translate-y-1"
                  >
                    <div className="aspect-[4/5] overflow-hidden bg-gray-100 relative">
                      <img 
                        src={member.image ? `http://localhost:3001${member.image}` : '/default-avatar.png'} 
                        alt={member.name} 
                        className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-4 text-center border-t border-gray-100">
                      <h3 className="font-bold text-blue-700 hover:text-blue-900 transition-colors text-lg truncate">
                        {member.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 truncate">{member.position || 'Faculty Member'}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            {sliderIndex > 0 && (
              <button 
                onClick={prevSlide} 
                className="absolute left-0 top-1/2 -translate-y-1/2 md:ml-0 w-10 h-10 bg-blue-600/90 text-white rounded shadow-lg hover:bg-blue-700 hover:scale-110 flex items-center justify-center transition-all z-10"
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            {sliderIndex < faculty.length - itemsVisible && (
              <button 
                onClick={nextSlide} 
                className="absolute right-0 top-1/2 -translate-y-1/2 md:mr-0 w-10 h-10 bg-blue-600/90 text-white rounded shadow-lg hover:bg-blue-700 hover:scale-110 flex items-center justify-center transition-all z-10"
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
            
            {/* Dots */}
            {faculty.length > itemsVisible && (
              <div className="flex justify-center mt-6 gap-2">
                {Array.from({ length: Math.ceil(faculty.length - itemsVisible + 1) }).map((_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setSliderIndex(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === sliderIndex ? 'bg-blue-600 w-6' : 'bg-gray-300 hover:bg-gray-400'}`} 
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}