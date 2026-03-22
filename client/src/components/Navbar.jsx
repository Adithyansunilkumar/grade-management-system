import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';

const Navbar = ({ user, onLogout, onToggleMobileMenu, isMobileMenuOpen }) => {
  return (
    <header className="bg-white sticky top-0 z-[60] border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-12 h-16 flex items-center justify-between gap-4">
        {/* Mobile Menu Button */}
        <button 
           onClick={onToggleMobileMenu}
           className="lg:hidden p-2 bg-gray-50 text-gray-500 hover:text-primary-600 rounded-lg transition-all"
        >
           {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Brand */}
        <div className="flex-1 lg:flex-none">
          <Link to="/dashboard" className="flex items-center space-x-2 text-primary-600 group">
            <span className="text-xl font-bold tracking-tight text-primary-600 uppercase">
              Grade Management System
            </span>
          </Link>
        </div>

        {/* User Area */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4 pl-4 border-l border-gray-100">
             <div className="hidden sm:block text-right">
                <p className="text-sm font-bold text-gray-900 leading-none">{user?.name}</p>
                <p className="text-[0.6rem] font-bold text-gray-400 uppercase tracking-widest mt-1">{user?.role}</p>
             </div>
             
             <div className="w-9 h-9 bg-primary-50 rounded-lg border border-primary-100 flex items-center justify-center text-primary-600 font-bold overflow-hidden shadow-sm">
                {user?.image ? (
                   <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                   <span>{user?.name?.charAt(0)}</span>
                )}
             </div>

             <button 
                 onClick={onLogout}
                 className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                 title="Logout"
             >
                 <LogOut className="h-5 w-5" />
             </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
