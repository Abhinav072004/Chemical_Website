import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStudents, type Student } from '../api';
import { Users } from 'lucide-react';

// Extending the Student type locally to include our calculated Batch Year
type ProcessedStudent = Student & { batchYear: string };

export default function StudentsPage() {
  const { role } = useParams<{ role: string }>(); // 'ug' or 'phd'
  const [students, setStudents] = useState<ProcessedStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [years, setYears] = useState<string[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const data = await getStudents();
        const targetRole = role?.toUpperCase() === 'PHD' ? 'PHD' : 'UG';
        
        // Filter by role and dynamically calculate the Batch Year from the Roll No / Designation
        const processedStudents: ProcessedStudent[] = data
          .filter((s) => s.role === targetRole)
          .map((s) => {
            let by = 'Unknown';
            if (s.designation) {
              // If they explicitly typed a year like "2024"
              const match4 = s.designation.match(/\b(20\d{2})\b/);
              // If it's a standard IIT Roll Number starting with year (e.g. 230008001 -> 2023)
              const matchRoll = s.designation.match(/^(\d{2})/);
              
              if (match4) by = match4[1];
              else if (matchRoll) by = `20${matchRoll[1]}`;
            }
            return { ...s, batchYear: by };
          });

        setStudents(processedStudents);

        // Extract unique years, ignore 'Unknown' for the main array, sort descending
        const uniqueYears = Array.from(new Set(processedStudents.map(s => s.batchYear)))
          .filter(y => y !== 'Unknown')
          .sort((a, b) => Number(b) - Number(a));

        setYears(uniqueYears);
        
        // Auto-select the most recent year
        if (uniqueYears.length > 0) {
          setSelectedYear(uniqueYears[0]);
        } else if (processedStudents.length > 0) {
          setSelectedYear('Unknown');
        }
      } catch (error) {
        console.error("Failed to fetch students", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [role]);

  // Filter students to only show the currently selected year
  const displayedStudents = students.filter(s => s.batchYear === selectedYear);

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* 1. Header Area matching IIT styling */}
      <div className="bg-[#0a2342] py-12 text-center text-white mb-8 shadow-inner">
        <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
          {role?.toUpperCase() === 'PHD' ? 'PhD Scholars' : 'Undergraduate Students'}
        </h1>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2. Sort By Year Filter */}
        {years.length > 0 && (
          <div className="bg-[#eef5f9] py-3 text-center text-gray-700 text-sm md:text-base border border-blue-100 rounded mb-8 flex flex-wrap justify-center items-center gap-2">
            <span className="mr-2 font-medium">Sort by Year :</span>
            {years.map((year, index) => (
              <span key={year} className="flex items-center">
                <button 
                  onClick={() => setSelectedYear(year)}
                  className={`mx-1 transition-colors ${selectedYear === year ? 'text-blue-700 font-bold' : 'text-blue-500 hover:text-blue-800 hover:underline'}`}
                >
                  {year}
                </button>
                {index < years.length - 1 && <span className="text-blue-300 mx-1">|</span>}
              </span>
            ))}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20 text-gray-500 text-lg">Loading student database...</div>
        ) : students.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-lg border-2 border-dashed border-gray-200 rounded-lg">
            No students have been added to this program yet.
          </div>
        ) : (
          <>
            {/* 3. Batch Header */}
            <div className="mb-6 border-b border-gray-200 pb-3">
              <div className="flex items-center text-[#0a2342]">
                <Users className="w-8 h-8 mr-3" />
                <h2 className="text-xl md:text-2xl font-medium">
                  {role?.toUpperCase() === 'PHD' ? 'Ph.D.' : 'B.Tech'} (Batch: {selectedYear}) <span className="mx-2 text-gray-400 hidden sm:inline">|</span><br className="sm:hidden" /> No Of Students Admitted: {displayedStudents.length}
                </h2>
              </div>
              <div className="h-1 w-16 bg-teal-500 mt-3"></div>
            </div>

            {/* 4. Student Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayedStudents.map((student) => (
                <div key={student.id} className="flex bg-white border border-green-100 shadow-sm p-3 rounded-sm hover:shadow-md transition-shadow">
                  
                  {/* Image Container with inner border */}
                  <div className="w-[100px] h-[120px] md:w-[110px] md:h-[135px] border border-gray-200 p-1 flex-shrink-0 bg-gray-50 mr-4">
                    {student.image ? (
                      <img 
                        src={`http://localhost:3001${student.image}`} 
                        alt={student.name} 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-100">
                        <span className="text-[10px] font-bold text-gray-400 text-center leading-tight px-1">
                          NO IMAGE<br/>ADDED
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Student Details */}
                  <div className="flex flex-col justify-center flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-[#1e3a8a] truncate" title={student.name}>
                      {student.name}
                    </h3>
                    <p className="text-black font-bold text-sm mb-2">{student.designation}</p>
                    
                    <p className="text-sm text-black font-bold truncate">
                      Email : <a href={`mailto:${student.email}`} className="font-normal text-gray-700 hover:text-blue-600">{student.email}</a>
                    </p>
                    <p className="text-sm text-black font-bold truncate">
                      Phone : <span className="font-normal text-gray-700">{student.phone || '+91-731-660 (Ext. Nil)'}</span>
                    </p>
                  </div>

                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}