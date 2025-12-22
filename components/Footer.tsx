import React from 'react';
import { Apple, Globe } from 'lucide-react';
import Image from 'next/image';
import { images } from '@/constant/images';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100">
      {/* Main Footer Content */}
      <div className="px-6 md:px-12 lg:px-10 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 justify-center gap-6 lg:gap-12">
          {/* Logo and App Download */}
          <div className="flex flex-col gap-6 items-start">
            <a href="#" className="text-xl sm:text-2xl md:text-3xl font-bold text-black">
              <Image src={images.logoBlack} width={100} height={100} alt='logo' />
            </a>
            
            <button className=" bg-white px-6 py-3 border border-gray-300 rounded-full flex items-center gap-2 text-base font-medium hover:bg-gray-50 transition-colors w-fit">
              Get the app
              <Apple className="w-5 h-5" />
              <Globe className="w-5 h-5" />
            </button>
          </div>

          {/* About Openvendor */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-black mb-2">About VenStack</h3>
            <a href="#" className="text-gray-700 hover:text-black transition-colors">Careers</a>
            <a href="#" className="text-gray-700 hover:text-black transition-colors">Help and support</a>
            <a href="#" className="text-gray-700 hover:text-black transition-colors">Blog</a>
            <a href="#" className="text-gray-700 hover:text-black transition-colors">Sitemap</a>
          </div>

          {/* For business */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-black mb-2">For business</h3>
            <a href="#" className="text-gray-700 hover:text-black transition-colors">For partners</a>
            <a href="#" className="text-gray-700 hover:text-black transition-colors">Pricing</a>
            <a href="#" className="text-gray-700 hover:text-black transition-colors">Support</a>
            <a href="#" className="text-gray-700 hover:text-black transition-colors">Status</a>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-black mb-2">Legal</h3>
            <a href="#" className="text-gray-700 hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-700 hover:text-black transition-colors">Terms of service</a>
            <a href="#" className="text-gray-700 hover:text-black transition-colors">Terms of use</a>
          </div>

          {/* Find us on social */}
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-black mb-2">Find us on social</h3>
            <a href="#" className="text-gray-700 hover:text-black transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 7h10v10H7z" />
                <path d="M17 7l5 5-5 5" />
              </svg>
              Facebook
            </a>
            <a href="#" className="text-gray-700 hover:text-black transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 7h10v10H7z" />
                <path d="M17 7l5 5-5 5" />
              </svg>
              Twitter
            </a>
            <a href="#" className="text-gray-700 hover:text-black transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 7h10v10H7z" />
                <path d="M17 7l5 5-5 5" />
              </svg>
              Linkedin
            </a>
            <a href="#" className="text-gray-700 hover:text-black transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 7h10v10H7z" />
                <path d="M17 7l5 5-5 5" />
              </svg>
              Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 px-6 md:px-12 lg:px-20 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
            <Globe className="w-5 h-5" />
            English
          </button>
          
          <p className="text-gray-600 text-sm">
            © 2025 Openvendor.com Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;