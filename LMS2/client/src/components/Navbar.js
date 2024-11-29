import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HomeLogo from '../photos/HomeLogo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-slate-500">
              <img src={HomeLogo} alt="Logo" className="h-[8vh] w-auto rounded" />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/dashboard"
                className="text-gray-500 hover:text-black hover:shadow-md hover:shadow-gray-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/courses"
                className="text-gray-500 hover:text-black hover:shadow-md hover:shadow-gray-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                Courses
              </Link>
              <Link
                to="/calendar"
                className="text-gray-500 hover:text-black hover:shadow-md hover:shadow-gray-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                Calendar
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleNavbar}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-black hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
              aria-expanded="false"
            >
              <svg
                className={isOpen ? 'hidden' : 'block'}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                width="24"
                height="24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              <svg
                className={isOpen ? 'block' : 'hidden'}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                width="24"
                height="24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={isOpen ? 'block' : 'hidden'}> {/* Corrected className */}
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/dashboard"
            className="text-gray-500 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
          >
            Dashboard
          </Link>
          <Link
            to="/courses"
            className="text-gray-500 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
          >
            Courses
          </Link>
          <Link
            to="/calendar"
            className="text-gray-500 hover:text-black block px-3 py-2 rounded-md text-base font-medium"
          >
            Calendar
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
