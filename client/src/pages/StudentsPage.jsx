import React, { useState } from 'react';
import { Search, UserCircle2, Trash2, Award, Eye, ChevronDown, ChevronUp } from 'lucide-react';

const StudentsPage = ({ user, students, onDelete, allGrades = [] }) => {
  const isTeacher = user?.role === 'teacher';
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedStudentId, setExpandedStudentId] = useState(null);

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));

  const toggleExpand = (sid) => {
    setExpandedStudentId(expandedStudentId === sid ? null : sid);
  };

  const getStudentGrades = (sid) => {
     return allGrades.filter(g => {
        const id = g.studentId?._id || g.studentId || g.student?._id || g.student;
        return id === sid;
     });
  };

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b pb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Student Roster</h1>
          <p className="text-gray-500 mt-1">Manage and view all enrolled students.</p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search name or email..." 
            className="input-field pl-12 h-12 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Academic Curator Student Identity</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Institutional Email</th>
                {isTeacher && <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Operational Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredStudents.length > 0 ? filteredStudents.map((student) => {
                const isExpanded = expandedStudentId === student._id;
                const grades = getStudentGrades(student._id);

                return (
                  <React.Fragment key={student._id}>
                    <tr 
                       className={`hover:bg-gray-50/80 transition-all cursor-pointer group ${isExpanded ? 'bg-primary-50/30' : ''}`} 
                       onClick={() => toggleExpand(student._id)}
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isExpanded ? 'bg-primary-600 text-white shadow-lg' : 'bg-primary-100 text-primary-600 group-hover:scale-110'}`}>
                            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <UserCircle2 className="h-6 w-6" />}
                          </div>
                          <div>
                             <span className="block font-bold text-gray-900 leading-none">{student.name}</span>
                             {isExpanded && <span className="text-[0.65rem] font-bold text-primary-600 uppercase tracking-widest mt-1 block">Active Selection</span>}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-gray-500 text-sm font-medium">
                        {student.email}
                      </td>
                      {isTeacher && (
                        <td className="px-6 py-5 text-right">
                          <div className="flex items-center justify-end space-x-4">
                            <button 
                              className={`p-2 rounded-lg transition-all ${isExpanded ? 'bg-primary-100 text-primary-600' : 'text-gray-300 hover:text-primary-600 hover:bg-primary-50'}`}
                              onClick={(e) => { e.stopPropagation(); toggleExpand(student._id); }}
                            >
                              {isExpanded ? <ChevronUp className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); onDelete(student._id); }}
                              className="p-2 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                              title="Delete Account"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                    
                    {/* Expandable Grades Drawer */}
                    {isExpanded && (
                      <tr className="bg-gray-50/50">
                        <td colSpan={isTeacher ? 3 : 2} className="px-10 py-8">
                           <div className="animate-slide-down">
                              <div className="flex items-center space-x-2 text-gray-400 mb-6 px-1">
                                 <Award className="h-4 w-4" />
                                 <span className="text-[0.65rem] font-black uppercase tracking-[0.2em]">Academic Portfolio Disclosure</span>
                              </div>
                              
                              {grades.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                  {grades.map((g, i) => (
                                    <div key={i} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm flex items-center justify-between group hover:border-primary-200 transition-all">
                                       <div className="space-y-1">
                                          <span className="text-[0.6rem] font-black text-primary-400 uppercase tracking-widest">{g.subject}</span>
                                          <p className="font-bold text-gray-900 py-1">Semester Summary</p>
                                       </div>
                                       <div className="text-right">
                                          <span className="text-2xl font-black text-gray-900">{g.marks}</span>
                                          <span className="text-gray-300 text-xs ml-1 font-bold">/ 100</span>
                                       </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="p-12 border-2 border-dashed border-gray-100 rounded-[2rem] text-center bg-white/50">
                                   <p className="text-gray-400 font-bold italic text-sm">No academic data found for this identifier.</p>
                                </div>
                              )}
                           </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              }) : (
                <tr>
                  <td colSpan={isTeacher ? 3 : 2} className="px-6 py-20 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">
                    No matching identities discovered.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentsPage;
