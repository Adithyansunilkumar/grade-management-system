import React, { useState } from 'react';
import { BookOpen, User, Hash, Plus, CheckCircle2, ShieldAlert } from 'lucide-react';

export const CSE_S4_SUBJECTS = [
  "Design and Analysis of Algorithms",
  "Operating Systems",
  "Database Management Systems",
  "Computer Organization and Architecture",
  "Software Engineering",
  "Microprocessors and Microcontrollers"
];

const GradeForm = ({ students, onAddGrade }) => {
  const [formData, setFormData] = useState({ studentId: '', subject: '', marks: '' });
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.studentId || !formData.subject || !formData.marks) {
        setError('All fields are required.');
        return;
    }
    
    try {
        await onAddGrade({
          ...formData,
          marks: parseInt(formData.marks)
        });
        
        setFormData({ studentId: '', subject: '', marks: '' });
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
    } catch (err) {
        setError(err.message || 'Failed to assign grade');
    }
  };

  return (
    <div className="card p-8 bg-white shadow-xl relative overflow-hidden border border-indigo-50">
      <div className="absolute top-0 right-0 p-8 text-primary-50">
        <BookOpen className="h-24 w-24 opacity-30" />
      </div>

      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-indigo-600 text-white rounded-xl shadow-lg">
          <BookOpen className="h-7 w-7" />
        </div>
        <div>
           <h2 className="text-2xl font-black text-gray-900 tracking-tight">Assign S4 CSE Grades</h2>
           <p className="text-gray-500 text-sm font-medium">Record academic performance for registered students.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {isSuccess && (
          <div className="md:col-span-3 p-4 bg-green-50 border border-green-100 text-green-700 rounded-xl flex items-center space-x-2 animate-bounce">
            <CheckCircle2 className="h-5 w-5" />
            <span className="font-bold">Grade assigned successfully!</span>
          </div>
        )}

        {error && (
          <div className="md:col-span-3 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl flex items-center space-x-2">
            <ShieldAlert className="h-5 w-5" />
            <span className="font-bold">{error}</span>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">1. Choose Student</label>
          <div className="relative group">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
            <select
              className="input-field pl-10 h-12 appearance-none"
              value={formData.studentId}
              onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
            >
              <option value="">Select Student</option>
              {students.map(s => (
                <option key={s._id} value={s._id}>{s.name} ({s.email})</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">2. Choose Subject</label>
          <div className="relative group">
            <BookOpen className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
            <select
              className="input-field pl-10 h-12 appearance-none"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            >
              <option value="">Select Subject</option>
              {CSE_S4_SUBJECTS.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">3. Enter Marks (%)</label>
          <div className="relative group">
            <Hash className="absolute left-3 top-3 h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
            <input
              type="number"
              min="0"
              max="100"
              placeholder="Enter marks"
              className="input-field pl-10 h-12"
              value={formData.marks}
              onChange={(e) => setFormData({ ...formData, marks: e.target.value })}
            />
          </div>
        </div>

        <div className="md:col-span-3 border-t border-gray-50 pt-6 flex justify-end">
          <button type="submit" className="btn btn-primary w-full md:w-auto flex items-center justify-center space-x-2 px-10 py-4 rounded-xl shadow-indigo-200 shadow-lg hover:shadow-indigo-300 transform hover:-translate-y-0.5 transition-all">
            <Plus className="h-5 w-5" />
            <span className="font-bold text-lg">Assign Grade</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default GradeForm;
