import React, { useEffect, useState } from 'react';
import { BookOpen, GraduationCap, Clock, Search } from 'lucide-react';
import { getMyGrades } from '../services/api';

const SUBJECTS = [
  "Design and Analysis of Algorithms",
  "Operating Systems",
  "Database Management Systems",
  "Computer Organization and Architecture",
  "Software Engineering",
  "Microprocessors"
];

const GradesPage = ({ user, students, grades: allGrades, onAddGrade }) => {
  const isTeacher = user?.role === 'teacher';
  const [studentGrades, setStudentGrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [studentSearch, setStudentSearch] = useState('');
  const [formData, setFormData] = useState({ 
    studentId: '', 
    subject: '', 
    marks: '', 
    date: new Date().toISOString().split('T')[0], 
    feedback: '' 
  });

  useEffect(() => {
    if (!isTeacher) {
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
  }, [user, isTeacher]);

  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    if (!formData.studentId || !formData.subject || !formData.marks) return;
    try {
        await onAddGrade(formData);
        setFormData({ 
          ...formData, 
          studentId: '', 
          subject: '', 
          marks: '', 
          feedback: '' 
        });
        setStudentSearch('');
    } catch (err) {
        console.error(err);
    }
  };

  if (!isTeacher) {
    return (
      <div className="space-y-8 animate-fade-in pb-20">
        <header className="border-b pb-8">
          <h1 className="text-3xl font-bold text-gray-900">Academic Records</h1>
          <p className="text-gray-500 mt-1">Review your semester performance and marks.</p>
        </header>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-50 bg-gray-50/50">
            <h3 className="font-bold text-gray-900">Subject Performance</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {(studentGrades.length > 0 ? studentGrades : [
              { subject: 'DAA', fullName: 'Design & Analysis of Algorithms', marks: 92, grade: 'A+' },
              { subject: 'OS', fullName: 'Operating Systems', marks: 88, grade: 'A' },
              { subject: 'DBMS', fullName: 'Database Management Systems', marks: 95, grade: 'O' }
            ]).map((g, i) => (
              <div key={i} className="px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="block font-bold text-gray-900">{g.subject}</span>
                    <span className="block text-xs text-gray-400 font-medium">{g.fullName || g.subject}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-8">
                  <div className="text-right">
                    <span className="text-xl font-bold text-gray-900">{g.marks}</span>
                    <span className="text-gray-300 text-sm ml-1">/ 100</span>
                  </div>
                  <div className="w-10 h-10 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center font-bold text-xs">
                    {g.grade || (g.marks >= 90 ? 'A+' : g.marks >= 80 ? 'A' : 'B')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in pb-20">
       <header className="border-b pb-8">
          <h1 className="text-3xl font-bold text-gray-900">Assign Grade</h1>
          <p className="text-gray-500 mt-1">Select a student and record their academic marks.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleAssignSubmit} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                 <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Student Selection</label>
                 <span className="text-[0.6rem] font-bold text-primary-500 bg-primary-50 px-2 py-0.5 rounded-full uppercase">
                    {students.filter(s => s.name.toLowerCase().includes(studentSearch.toLowerCase()) || s.email.toLowerCase().includes(studentSearch.toLowerCase())).length} Results
                 </span>
              </div>
              
              <div className="relative">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                 <input 
                   type="text" 
                   placeholder="Type student name or email to filter..." 
                   className="input-field w-full pl-11 h-12 text-sm"
                   value={studentSearch}
                   onChange={(e) => setStudentSearch(e.target.value)}
                 />
              </div>

              <select 
                className="input-field w-full h-12"
                value={formData.studentId}
                onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                required
              >
                <option value="">Select a student...</option>
                {students
                  .filter(s => s.name.toLowerCase().includes(studentSearch.toLowerCase()) || s.email.toLowerCase().includes(studentSearch.toLowerCase()))
                  .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }))
                  .map(s => <option key={s._id} value={s._id}>{s.name} ({s.email})</option>)
                }
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Subject</label>
              <select 
                className="input-field w-full h-12"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                required
              >
                <option value="">Select subject...</option>
                {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Marks (out of 100)</label>
                <input 
                  type="number" 
                  min="0"
                  max="100"
                  placeholder="0" 
                  className="input-field w-full h-12"
                  value={formData.marks}
                  onChange={(e) => setFormData({...formData, marks: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Date</label>
                <input 
                  type="date" 
                  className="input-field w-full h-12"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Feedback (Optional)</label>
              <textarea 
                className="input-field w-full min-h-[120px] py-4"
                placeholder="Ex performance notes..."
                value={formData.feedback}
                onChange={(e) => setFormData({...formData, feedback: e.target.value})}
              />
            </div>

            <button type="submit" className="btn btn-primary w-full h-14 rounded-xl flex items-center justify-center space-x-2 font-bold text-lg">
               <span>Confirm Submission</span>
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="bg-primary-50 p-8 rounded-2xl border border-primary-100 flex flex-col items-center text-center">
            <GraduationCap className="h-10 w-10 text-primary-600 mb-4" />
            <h4 className="font-bold text-gray-900">Grading Policy</h4>
            <p className="text-sm text-gray-600 mt-2">Marks are evaluated on a 4.0 scale. Ensure 100% accuracy before final submission.</p>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
             <div className="flex items-center space-x-2 text-gray-400 mb-4">
                <Clock className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Recent Activity</span>
             </div>
             <p className="text-xs text-gray-500 italic">No recent grades assigned in this session.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradesPage;
