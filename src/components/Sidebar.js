import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white md:w-64 w-0 md:flex flex-col p-4 transition-all duration-300">
      <nav className="flex flex-col space-y-4">
        <Link to="/" className="p-2 bg-gray-700 rounded hover:bg-gray-600">
          Customer Management
        </Link>
        <Link to="/stats" className="p-2 bg-gray-700 rounded hover:bg-gray-600">
          Customer Stats
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
