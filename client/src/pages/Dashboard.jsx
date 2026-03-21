import React from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, TrendingUp, Calendar, ChevronRight } from 'lucide-react';

const Dashboard = ({ studentsCount, subjectsCount }) => {
  const stats = [
    { title: 'Total Students', value: studentsCount, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Total Subjects', value: subjectsCount, icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Avg. Attendance', value: '92%', icon: Calendar, color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Top Performance', value: 'A+', icon: TrendingUp, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  ];

  return (
    <div className="space-y-10 animate-fade-in py-10">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between px-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Dashboard Overview</h1>
          <p className="text-gray-500 mt-2 text-lg">Welcome back, Academy Administrator.</p>
        </div>
        <div className="mt-6 md:mt-0 flex space-x-3">
          <Link to="/students" className="btn btn-primary flex items-center space-x-2 px-6 py-3">
            <span>Add New Student</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="card p-8 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} shadow-inner`}>
                  <Icon className="h-8 w-8" />
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest leading-none mb-2">{stat.title}</p>
                  <p className="text-4xl font-black text-gray-900 leading-none">{stat.value}</p>
                </div>
              </div>
              <div className="mt-8 flex items-center text-xs font-bold text-gray-400">
                <span className="text-green-500 mr-1">+4.2%</span> from last month
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons Map */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        <Link 
          to="/students" 
          className="card p-10 group bg-gradient-to-br from-primary-600 to-primary-800 text-white border-none shadow-xl hover:shadow-2xl overflow-hidden relative"
        >
          <div className="relative z-10 flex flex-col items-start gap-4">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
              <Users className="h-10 w-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Manage Students</h2>
              <p className="text-primary-100/80 max-w-xs mt-2 text-lg">Add, edit or remove student records from your institution's database.</p>
            </div>
            <div className="mt-4 flex items-center space-x-2 text-sm font-bold bg-white text-primary-700 px-4 py-2 rounded-full shadow-lg group-hover:bg-primary-50 transition-colors">
              <span>Go to Students</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
          <Users className="absolute -bottom-10 -right-10 h-64 w-64 text-white/10 rotate-12 transition-transform duration-500 group-hover:scale-110" />
        </Link>

        <Link 
          to="/grades" 
          className="card p-10 group bg-gradient-to-br from-indigo-600 to-indigo-800 text-white border-none shadow-xl hover:shadow-2xl overflow-hidden relative"
        >
          <div className="relative z-10 flex flex-col items-start gap-4">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
              <BookOpen className="h-10 w-10 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Manage Grades</h2>
              <p className="text-indigo-100/80 max-w-xs mt-2 text-lg">Assign marks, track academic progress and view student performance analytics.</p>
            </div>
            <div className="mt-4 flex items-center space-x-2 text-sm font-bold bg-white text-indigo-700 px-4 py-2 rounded-full shadow-lg group-hover:bg-indigo-50 transition-colors">
              <span>Go to Grades</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
          <BookOpen className="absolute -bottom-10 -right-10 h-64 w-64 text-white/10 rotate-12 transition-transform duration-500 group-hover:scale-110" />
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
