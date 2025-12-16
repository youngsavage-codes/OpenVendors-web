
'use client';
import React, { useState, useEffect } from 'react';
import { Menu, ArrowRight, X, Globe } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 5);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <nav className={`p-2 fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center h-14 sm:h-16">

            <a href="#" className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
              Logo
            </a>

            <div className="flex items-center gap-2 sm:gap-4">
              <a
                href="#login"
                className="hidden sm:block text-sm sm:text-base font-medium px-3 py-2 hover:bg-gray-200 rounded-2xl transition"
              >
                Log in
              </a>

              <a
                href="#list-business"
                className="hidden sm:block text-sm sm:text-base px-4 py-2 border rounded-3xl hover:bg-gray-200 transition"
              >
                List Your Business
              </a>

              <button 
                onClick={toggleMenu}  
                aria-expanded={isOpen ? "true" : "false"}
                aria-haspopup="true" 
                className="flex items-center gap-2 px-3 sm:px-4 py-2 border rounded-3xl text-sm sm:text-base"
              >
                <span className="hidden sm:inline">Menu</span>
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Desktop Menu - Dropdown */}
      {isOpen && (
        <div className='hidden sm:block bg-white shadow-2xl py-4 fixed gap-2 top-20 z-50 right-7 flex-col rounded-xl w-72 animate-in fade-in slide-in-from-top-2 duration-200'>
          <p className='font-bold text-lg px-4 py-2'>For customers</p>
          
          <a href="" className='flex items-center justify-between text-blue-600 text-base hover:bg-gray-100 rounded-lg px-4 py-3 mx-2 transition-all duration-200'>
            Log in or sign up
            <ArrowRight className="w-4 h-4" />
          </a>
          
          <a href="" className='flex items-center justify-between text-gray-900 text-base hover:bg-gray-100 rounded-lg px-4 py-3 mx-2 transition-all duration-200'>
            Download the app
            <ArrowRight className="w-4 h-4" />
          </a>
          
          <a href="" className='flex items-center justify-between text-gray-900 text-base hover:bg-gray-100 rounded-lg px-4 py-3 mx-2 transition-all duration-200'>
            Help and support
            <ArrowRight className="w-4 h-4" />
          </a>
          
          <a href="" className='flex items-center justify-between text-gray-900 text-base hover:bg-gray-100 rounded-lg px-4 py-3 mx-2 transition-all duration-200'>
            <span className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              English
            </span>
            <ArrowRight className="w-4 h-4" />
          </a>
          
          <div className='my-2 mx-2'>
            <a href="http://" className='flex items-center justify-between font-semibold text-gray-900 text-base rounded-lg hover:bg-gray-100 px-4 py-3 transition-all duration-200 border border-gray-200'>
              For businesses
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      )}

      {/* Mobile Menu - Full Screen Overlay */}
      {isOpen && (
        <div className='sm:hidden fixed inset-0 bg-gray-50 z-50 animate-in slide-in-from-right duration-300'>
          <div className='flex flex-col h-full'>
            {/* Mobile Header */}
            <div className='flex justify-between items-center p-4 border-b '>
              <button 
                onClick={toggleMenu}
                className='p-2 hover:bg-gray-100 rounded-full transition-colors ml-auto'
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className='flex-1 overflow-y-auto p-4'>
              <div className='bg-white rounded-2xl p-4 mb-4'>
                <p className='font-bold text-lg mb-4'>For customers</p>
                
                <a href="" className='flex items-center justify-between text-blue-600 text-base py-4 border-b border-gray-100'>
                  Log in or sign up
                  <ArrowRight className="w-5 h-5" />
                </a>
                
                <a href="" className='flex items-center justify-between text-gray-900 text-base py-4 border-b border-gray-100'>
                  Download the app
                  <ArrowRight className="w-5 h-5" />
                </a>
                
                <a href="" className='flex items-center justify-between text-gray-900 text-base py-4 border-b border-gray-100'>
                  Help and support
                  <ArrowRight className="w-5 h-5" />
                </a>
                
                <a href="" className='flex items-center justify-between text-gray-900 text-base py-4'>
                  <span className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    English
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>

              <div className='bg-white rounded-2xl p-4'>
                <a href="http://" className='flex items-center justify-between font-semibold text-gray-900 text-base py-3'>
                  For businesses
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}