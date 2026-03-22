import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children, user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FB] relative">
      {/* Dynamic Top Navigation - Global only */}
      <Navbar 
        user={user} 
        onLogout={onLogout} 
        onToggleMobileMenu={toggleMobileMenu}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      <div className="flex-1 flex max-w-7xl mx-auto w-full h-auto lg:h-[calc(100vh-80px)] overflow-visible lg:overflow-hidden bg-white">
        {/* Responsive Side Navigation */}
        <div className={`
          absolute lg:relative z-50 lg:z-auto h-full w-80 bg-white border-r border-gray-100 transition-transform duration-300 transform
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <Sidebar user={user} onItemClick={() => setIsMobileMenuOpen(false)} />
        </div>

        {/* Mobile Backdrop Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-gray-950/20 backdrop-blur-sm z-40 lg:hidden top-20" 
            onClick={() => setIsMobileMenuOpen(false)} 
          />
        )}

        {/* Main Application Area */}
        <main className="flex-1 h-auto lg:h-full overflow-y-visible lg:overflow-y-auto px-4 sm:px-12 py-10 bg-[#F8F9FB] custom-scrollbar animate-fade-in relative z-10 scroll-smooth w-full border-l border-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
