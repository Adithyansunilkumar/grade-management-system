import React from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, ChevronRight, GraduationCap } from 'lucide-react';

const Dashboard = ({ user, studentsCount, subjectsCount }) => {
  const isTeacher = user?.role === 'teacher';

  const stats = [
    { title: 'Total Enrolled', value: studentsCount, icon: Users, color: 'text-primary-600', bg: 'bg-primary-50' },
    { title: 'S4 Subjects', value: subjectsCount, icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  ];

  return (
    <div className="space-y-8 md:space-y-12 animate-fade-in-slow pb-20">
      <header className="border-b pb-8 border-gray-100">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
          Welcome, {user?.name?.split(' ')[0]}
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Institutional management platform for academic excellence.
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="card p-8 flex flex-col justify-between bg-white border border-gray-100 shadow-sm">
              <div className="flex items-center space-x-6">
                <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                  <Icon className="h-7 w-7" />
                </div>
                <div>
                   <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.title}</p>
                   <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link 
          to="/students" 
          className="card p-10 bg-primary-600 text-white hover:bg-primary-700 transition-all shadow-lg flex flex-col justify-between min-h-[250px]"
        >
          <div className="space-y-4">
            <Users className="h-10 w-10" />
            <h2 className="text-2xl font-bold">Manage Students</h2>
            <p className="text-primary-100 text-lg">View and manage the complete academic roster.</p>
          </div>
          <div className="flex items-center space-x-2 font-bold text-sm uppercase tracking-widest mt-6">
            <span>Open Roster</span>
            <ChevronRight className="h-4 w-4" />
          </div>
        </Link>

        {isTeacher ? (
          <Link 
            to="/grades" 
            className="card p-10 bg-white border border-gray-100 text-gray-900 hover:border-primary-100 hover:shadow-xl transition-all flex flex-col justify-between min-h-[250px]"
          >
            <div className="space-y-4">
              <BookOpen className="h-10 w-10 text-primary-600" />
              <h2 className="text-2xl font-bold">Assign Grades</h2>
              <p className="text-gray-500 text-lg">Record academic performance and metrics.</p>
            </div>
            <div className="flex items-center space-x-2 font-bold text-sm uppercase tracking-widest text-primary-600 mt-6">
              <span>Go to Grades</span>
              <ChevronRight className="h-4 w-4" />
            </div>
          </Link>
        ) : (
          <div className="card p-10 bg-gray-50 border border-transparent flex flex-col justify-center items-center text-center space-y-6">
             <div className="p-6 bg-white shadow-md rounded-3xl text-primary-600">
                <GraduationCap className="h-12 w-12" />
             </div>
             <h3 className="text-xl font-bold text-gray-900">Academic Progress</h3>
             <p className="text-gray-500 max-w-xs">Use the sidebar to view your detailed curriculum performance.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
