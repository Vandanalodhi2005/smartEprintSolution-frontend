import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SetupHeader = ({ showLogo = true, showHeader = true }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  if (!showHeader) return null;
  return (
    <header className="w-full h-20 bg-white py-4 flex items-center md:px-[18%] px-4 border-b border-gray-100 shadow-sm relative z-50">
      <nav className="w-full max-w-5xl flex items-center justify-between md:justify-start">
        <div className="flex items-center">
          {showLogo && (
            <img 
              src="/hp-logo.svg" 
              alt="HP Logo" 
              className="h-10 w-auto mr-8 inline-block align-middle hover:opacity-80 transition cursor-pointer" 
              width="40" 
              height="40" 
            />
          )}
          {/* Desktop Menu */}
          <ul className="hidden md:flex flex-row gap-10 items-center">
            <li className="text-gray-500 text-lg font-normal hover:text-blue-600 cursor-pointer transition">OfficeJet</li>
            <li className="text-gray-500 text-lg font-normal hover:text-blue-600 cursor-pointer transition">DeskJet</li>
            <li className="text-gray-500 text-lg font-normal hover:text-blue-600 cursor-pointer transition">ENVY</li>
            <li className="text-gray-500 text-lg font-normal hover:text-blue-600 cursor-pointer transition">LaserJet</li>
          </ul>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            aria-label="Open menu"
            className="focus:outline-none p-2 rounded-md hover:bg-gray-100 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-7 h-7 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              ) }
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <ul className="absolute top-20 left-0 w-full bg-white shadow-xl flex flex-col items-center gap-6 py-8 z-50 md:hidden animate-in slide-in-from-top duration-200">
            <li className="text-gray-600 text-xl font-medium hover:text-blue-600 transition" onClick={() => setMenuOpen(false)}>OfficeJet</li>
            <li className="text-gray-600 text-xl font-medium hover:text-blue-600 transition" onClick={() => setMenuOpen(false)}>DeskJet</li>
            <li className="text-gray-600 text-xl font-medium hover:text-blue-600 transition" onClick={() => setMenuOpen(false)}>ENVY</li>
            <li className="text-gray-600 text-xl font-medium hover:text-blue-600 transition" onClick={() => setMenuOpen(false)}>LaserJet</li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default SetupHeader;
