import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Info, Mail } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `inline-flex items-center px-4 py-2 text-sm font-medium ${
                  isActive
                    ? 'text-[#5a67d8] border-b-2 border-[#5a67d8]'
                    : 'text-[#4a5568] hover:text-[#5a67d8] hover:border-b-2 hover:border-[#5a67d8]'
                } transition-all duration-200`
              }
            >
              <Home className="h-5 w-5 mr-1" />
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `inline-flex items-center px-4 py-2 text-sm font-medium ${
                  isActive
                    ? 'text-[#5a67d8] border-b-2 border-[#5a67d8]'
                    : 'text-[#4a5568] hover:text-[#5a67d8] hover:border-b-2 hover:border-[#5a67d8]'
                } transition-all duration-200`
              }
            >
              <Info className="h-5 w-5 mr-1" />
              About Us
            </NavLink>
            {/* Added Contact link */}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `inline-flex items-center px-4 py-2 text-sm font-medium ${
                  isActive
                    ? 'text-[#5a67d8] border-b-2 border-[#5a67d8]'
                    : 'text-[#4a5568] hover:text-[#5a67d8] hover:border-b-2 hover:border-[#5a67d8]'
                } transition-all duration-200`
              }
            >
              <Mail className="h-5 w-5 mr-1" />
              Contact
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
