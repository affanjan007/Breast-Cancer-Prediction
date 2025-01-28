import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 shadow-inner mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4">
          <nav className="flex space-x-6">
            <Link
              to="/"
              className="text-[#4a5568] hover:text-[#5a67d8] transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-[#4a5568] hover:text-[#5a67d8] transition-colors duration-200"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-[#4a5568] hover:text-[#5a67d8] transition-colors duration-200"
            >
              Contact
            </Link>
          </nav>
          <div className="flex items-center text-[#4a5568]">
            <span>Made with</span>
            <Heart className="h-4 w-4 mx-1 text-red-500" />
            <span>by Cancer Detection Team</span>
          </div>
          <p className="text-sm text-[#718096]">
            © {new Date().getFullYear()} Cancer Detection System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;