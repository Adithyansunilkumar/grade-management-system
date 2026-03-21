import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, LayoutDashboard, Users, BookOpen, LogOut, Menu, X } from 'lucide-react';

const Navbar = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Students', path: '/students', icon: Users },
    { name: 'Grades', path: '/grades', icon: BookOpen },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2 text-primary-600">
              <GraduationCap className="h-8 w-8" />
              <span className="text-xl font-bold tracking-tight text-gray-900">Grade<span className="text-primary-600">Sync</span></span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(item.path)
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <div className="flex items-center space-x-2 px-4 py-2 border-l border-gray-100 ml-4">
              <div className="flex flex-col items-end">
                <span className="text-sm font-semibold text-gray-900 leading-none">{user?.name}</span>
                <span className="text-[10px] font-bold text-primary-500 uppercase tracking-wider mt-1">{user?.role}</span>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all border border-transparent hover:border-red-100"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:bg-gray-100 p-2 rounded-lg"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 p-3 rounded-lg text-base font-medium transition-all ${
                  isActive(item.path)
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
          <div className="flex items-center space-x-3 p-3 border-t border-gray-100 mt-2">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-900 leading-none">{user?.name}</span>
              <span className="text-[10px] font-bold text-primary-500 uppercase tracking-wider mt-1">{user?.role}</span>
            </div>
          </div>
          <button
            onClick={() => {
              setIsOpen(false);
              onLogout();
            }}
            className="flex items-center space-x-3 p-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50 w-full text-left"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
