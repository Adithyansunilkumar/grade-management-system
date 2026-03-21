import React from 'react';
import { BookOpen, GraduationCap, FileText, CheckCircle2, UserCheck } from 'lucide-react';

const GradeList = ({ students, grades }) => {
  const getStudentName = (id) => {
    // Check if students already contains this user data (from prop) 
    // or if grade data was already populated by backend
    const s = students.find(s => s._id === id);
    return s ? s.name : 'Unknown Student';
  };

  const getStudentEmail = (id) => {
    const s = students.find(s => s._id === id);
    return s ? s.email : 'No email';
  };

  if (!grades || grades.length === 0) {
    return (
      <div className="card p-24 text-center animate-pulse flex flex-col items-center justify-center bg-white border-2 border-dashed border-gray-100 rounded-3xl group hover:border-indigo-200 transition-colors">
        <div className="p-6 bg-gray-50 text-gray-300 rounded-full mb-6 group-hover:bg-indigo-50 group-hover:text-indigo-200 transition-colors">
          <FileText className="h-16 w-16" />
        </div>
        <h3 className="text-2xl font-black text-gray-400">No records found.</h3>
        <p className="text-gray-400 mt-2 max-w-sm text-balance font-medium">Any assigned semester marks will appear here instantly for review.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden card shadow-2xl border border-gray-100 rounded-3xl bg-white shadow-indigo-100/50">
      <div className="bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 px-8 py-6 flex justify-between items-center">
        <h3 className="text-xl font-black text-gray-900 tracking-tight">Academic Performance Records</h3>
        <div className="flex items-center space-x-2 text-xs font-black text-indigo-500 uppercase tracking-widest leading-none bg-indigo-50 px-3 py-1.5 rounded-full shadow-sm">
          <CheckCircle2 className="h-4 w-4" />
          <span>S4 CSE Portal • Verified</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/10 text-gray-400 font-extrabold text-[10px] uppercase tracking-[0.2em] border-b border-gray-50 leading-none">
              <th className="px-8 py-6">#</th>
              <th className="px-8 py-6">Identity</th>
              <th className="px-8 py-6">Curriculum Subject</th>
              <th className="px-8 py-6">Performance Marks</th>
              <th className="px-8 py-6">Signed By</th>
              <th className="px-8 py-6 text-right">Verification</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {grades.map((grade, index) => (
              <tr key={grade._id} className="group hover:bg-gray-50/50 transition-all duration-300">
                <td className="px-8 py-6 text-gray-300 font-black text-xs">{index + 1}</td>
                <td className="px-8 py-6">
                  <div className="space-y-0.5">
                    <span className="block font-black text-gray-900 group-hover:text-indigo-600 transition-colors text-lg">{getStudentName(grade.studentId)}</span>
                    <span className="flex items-center space-x-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                       <GraduationCap className="h-3.5 w-3.5" />
                       <span>{getStudentEmail(grade.studentId)}</span>
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6">
                   <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-sm shadow-indigo-200" />
                      <span className="text-sm font-bold text-gray-600 truncate max-w-[200px] leading-tight capitalize">{grade.subject}</span>
                   </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center space-x-4">
                    <span className={`text-2xl font-black tabular-nums tracking-tighter ${grade.marks >= 75 ? 'text-green-600' : grade.marks >= 40 ? 'text-indigo-600' : 'text-red-500'}`}>
                      {grade.marks}%
                    </span>
                    <div className="w-20 bg-gray-100 rounded-full h-2 overflow-hidden hidden sm:block shadow-inner">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out shadow-sm ${grade.marks >= 75 ? 'bg-green-500' : grade.marks >= 40 ? 'bg-indigo-500' : 'bg-red-500'}`} 
                        style={{ width: `${grade.marks}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                    <div className="flex items-center space-x-2 text-gray-500 font-bold text-xs uppercase tracking-tight">
                        <UserCheck className="h-4 w-4 text-indigo-400" />
                        <span>{grade.assignedBy?.name || 'Authorized Faculty'}</span>
                    </div>
                </td>
                <td className="px-8 py-6 text-right">
                  {grade.marks >= 75 ? (
                    <span className="inline-flex items-center px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest leading-none bg-green-50 text-green-700 shadow-sm border border-green-100">
                      Excellent
                    </span>
                  ) : grade.marks >= 40 ? (
                    <span className="inline-flex items-center px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest leading-none bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100">
                      Validated
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest leading-none bg-red-50 text-red-700 shadow-sm border border-red-100">
                      Failed
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GradeList;
