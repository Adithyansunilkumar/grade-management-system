import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, GraduationCap, FileSpreadsheet } from 'lucide-react';

const Sidebar = ({ user, onItemClick }) => {
  const isTeacher = user?.role === 'teacher';

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: isTeacher ? 'Assign Grade' : 'Academic Transcript', path: '/grades', icon: BookOpen },
    { name: 'Students', path: '/students', icon: Users },
  ];

  if (isTeacher) {
    menuItems.push({ name: 'Gradebook', path: '/gradebook', icon: FileSpreadsheet });
  }

  return (
    <aside className="w-full bg-white flex flex-col pt-6 h-full overflow-y-auto custom-scrollbar">
      {/* Brand Profile */}
      <div className="px-6 mb-8">
        <div className="p-4 bg-primary-50 rounded-xl border border-primary-100 flex items-center space-x-3 shadow-sm">
          <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white shadow-md">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-xs tracking-tight uppercase">
              Grade Management
            </h3>
            <p className="text-[0.6rem] font-bold uppercase tracking-wider text-primary-600 mt-1">
              {isTeacher ? 'Teacher Portal' : 'Student Portal'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onItemClick}
            className={({ isActive }) => 
              `flex items-center space-x-3 px-5 py-3 rounded-xl text-sm font-bold transition-all group ${
                isActive 
                ? 'bg-primary-600 text-white shadow-md' 
                : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="flex-1">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
