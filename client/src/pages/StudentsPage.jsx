import React from 'react';
import StudentForm from '../components/StudentForm';
import StudentList from '../components/StudentList';
import { Users } from 'lucide-react';

const StudentsPage = ({ user, students, onAdd, onDelete }) => {
  const isAuthorized = user?.role === 'teacher';

  return (
    <div className="space-y-10 py-10 px-4 animate-fade-in">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center space-x-3">
            <Users className="h-10 w-10 text-primary-600" />
            <span>Student Management</span>
          </h1>
          <p className="text-gray-500 mt-2 text-lg">Manage your academy's student list with ease.</p>
        </div>
      </header>
      
      <section className="space-y-12">
        {isAuthorized ? (
          <StudentForm onAdd={onAdd} />
        ) : (
          <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl text-amber-800 text-sm font-medium flex items-center space-x-3">
            <div className="p-2 bg-amber-100 rounded-lg">
               <Users className="h-5 w-5" />
            </div>
            <span>You are viewing this list as a Student. Only Teachers can add or modify students.</span>
          </div>
        )}
        <StudentList students={students} onDelete={onDelete} isAdmin={user?.role === 'teacher'} />
      </section>
    </div>
  );
};

export default StudentsPage;
