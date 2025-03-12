'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { TypewriterEffectSmooth } from '../ui/typewriter-effect';
import Menu from './Menu';

const Header = () => {
  const words = [
    { text: 'Experience ' },
    { text: 'Effortless ' },
    { text: 'Shopping ' },
    { text: 'With ' },
    { text: 'CodeCart', className: 'text-green-600' },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header>
      <nav className="sticky top-0 z-50 shadow-lg transition-all duration-300 bg-white text-gray-800">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4 py-3">
         
          <Link
            href="/"
            className="text-2xl font-bold flex items-center gap-2 hover:text-blue-500"
          >
            <span>🛒</span> CodeCart
          </Link>

           
          <div className="hidden md:flex items-center gap-6">
            <Menu />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

       
        {isMobileMenuOpen && (
          <div className="absolute top-14 left-0 w-full bg-gray-900 text-white shadow-lg md:hidden">
            <ul className="flex flex-col items-start gap-4 px-4 py-6">
              <Menu />  
            </ul>
          </div>
        )}
      </nav>

      
      <div className="flex items-center justify-center h-32">
        <TypewriterEffectSmooth
          words={words}
          className="text-center text-2xl sm:text-4xl font-semibold text-blue-600"
        />
      </div>
    </header>
  );
};

export default Header;
