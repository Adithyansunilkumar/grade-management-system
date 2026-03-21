import React from 'react';
import { Trash2, User, Hash, GraduationCap, ChevronRight } from 'lucide-react';

const StudentList = ({ students, onDelete, isAdmin }) => {
  if (students.length === 0) {
    return (
      <div className="card p-12 text-center animate-pulse flex flex-col items-center justify-center bg-gray-50 border-dashed">
        <div className="p-4 bg-gray-200 text-gray-400 rounded-full mb-4">
          <User className="h-12 w-12" />
        </div>
        <h3 className="text-xl font-bold text-gray-500">No students registered yet.</h3>
        <p className="text-gray-400 mt-1">Start by adding your first student using the form above.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden card shadow-sm">
      <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">Enrolled Students ({students.length})</h3>
        <div className="flex items-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
          <span>Sort by newest</span>
        </div>
      </div>
      <div className="divide-y divide-gray-100">
        {students.map((student) => (
          <div key={student._id} className="group p-6 flex flex-col md:flex-row items-center justify-between hover:bg-primary-50 transition-colors duration-200">
            <div className="flex items-center space-x-6 w-full md:w-auto">
              <div className="flex-shrink-0 w-14 h-14 bg-primary-100 flex items-center justify-center rounded-2xl text-primary-600 shadow-sm border border-primary-200">
                <User className="h-7 w-7" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 group-hover:text-primary-700 transition-colors">{student.name}</h4>
                <div className="flex items-center space-x-4 mt-1 text-gray-500 text-sm font-medium">
                  <div className="flex items-center space-x-1">
                    <Hash className="h-3.5 w-3.5" />
                    <span>{student.rollNumber}</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full" />
                  <div className="flex items-center space-x-1">
                    <GraduationCap className="h-3.5 w-3.5" />
                    <span>{student.class}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mt-6 md:mt-0 w-full md:w-auto justify-end">
              {isAdmin && (
                <button
                  onClick={() => onDelete(student._id)}
                  className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100"
                  title="Delete Student"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
              <div className="p-2 text-gray-300 group-hover:text-primary-400 transition-colors hidden md:block">
                <ChevronRight className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
