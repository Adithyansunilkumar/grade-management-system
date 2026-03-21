import React, { useState } from 'react';
import { UserPlus, Hash, GraduationCap, Plus, Mail } from 'lucide-react';

const StudentForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({ name: '', rollNumber: '', class: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.rollNumber || !formData.class || !formData.email) return;
    onAdd(formData);
    setFormData({ name: '', rollNumber: '', class: '', email: '' });
  };

  return (
    <div className="card p-8 bg-white/40 backdrop-blur-xl border-dashed border-2 border-gray-200 shadow-xl">
      <div className="flex items-center space-x-3 mb-6">
        <UserPlus className="h-6 w-6 text-primary-600" />
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Add New Student</h2>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
          <div className="relative">
            <UserPlus className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="John Doe"
              className="input pl-10 h-11"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 ml-1">Roll Number</label>
          <div className="relative">
            <Hash className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="S101"
              className="input pl-10 h-11"
              value={formData.rollNumber}
              onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 ml-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              placeholder="john@example.com"
              className="input pl-10 h-11"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700 ml-1">Class</label>
          <div className="relative">
            <GraduationCap className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <select
              className="input pl-10 h-11 appearance-none"
              value={formData.class}
              onChange={(e) => setFormData({ ...formData, class: e.target.value })}
            >
              <option value="">Select Class</option>
              <option value="Class 10">Class 10</option>
              <option value="Class 11">Class 11</option>
              <option value="Class 12">Class 12</option>
            </select>
          </div>
        </div>
        <div className="md:col-span-4 flex justify-end">
          <button type="submit" className="btn btn-primary flex items-center space-x-2 px-8 py-3">
            <Plus className="h-4 w-4" />
            <span>Register Student</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
