import React, { useEffect, useState } from 'react';
import GradeForm from '../components/GradeForm';
import GradeList from '../components/GradeList';
import { BookOpen, ShieldAlert, Table, LayoutGrid } from 'lucide-react';
import { getMyGrades } from '../services/api';

const GradesPage = ({ user, students, grades, onAddGrade }) => {
  const isTeacher = user?.role === 'teacher';
  const [studentGrades, setStudentGrades] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.role === 'student') {
        const fetchStudentGrades = async () => {
            setLoading(true);
            try {
                const data = await getMyGrades();
                setStudentGrades(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStudentGrades();
    }
  }, [user, grades]); // Refetch if grades prop changes (from teacher assignment)

  return (
    <div className="space-y-12 py-10 px-4 animate-fade-in max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between border-b pb-8 border-gray-100">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-indigo-600 font-black text-xs uppercase tracking-widest leading-none">
             <BookOpen className="h-4 w-4" />
             <span>Academic System</span>
          </div>
          <h1 className="text-5xl font-black text-gray-950 tracking-tight flex items-center space-x-3">
             <span>Grade Management</span>
          </h1>
          <p className="text-gray-500 mt-2 text-xl font-medium max-w-2xl">
            {isTeacher 
              ? "Official portal for assigning and overseeing S4 Computer Science Engineering performance records."
              : "Review your authenticated semester marks and subject-wise performance tracking."}
          </p>
        </div>
        <div className="flex space-x-2 mt-6 md:mt-0 p-1 bg-gray-100 rounded-xl">
           <button className="p-2 bg-white shadow-sm rounded-lg text-indigo-600"><Table className="h-5 w-5"/></button>
           <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors"><LayoutGrid className="h-5 w-5"/></button>
        </div>
      </header>
      
      <section className="space-y-16">
        {isTeacher ? (
          <>
            <GradeForm students={students} onAddGrade={onAddGrade} />
            <div className="space-y-6">
                 <div className="flex items-center space-x-3">
                    <div className="h-8 w-1.5 bg-indigo-600 rounded-full" />
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Recent Performance Overview</h2>
                 </div>
                 <GradeList students={students} grades={grades} />
            </div>
          </>
        ) : (
          <div className="space-y-10">
             <div className="flex items-center space-x-3">
                <div className="h-8 w-1.5 bg-indigo-600 rounded-full" />
                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Your Academic Transcript</h2>
             </div>
             {loading ? (
                 <div className="p-20 text-center animate-pulse text-gray-400 font-bold">Loading your records...</div>
             ) : (
                 <GradeList students={[user]} grades={studentGrades} />
             )}
          </div>
        )}
      </section>
    </div>
  );
};

export default GradesPage;
