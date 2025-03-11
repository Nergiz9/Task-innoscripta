import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-white' : 'text-gray-300';
  };

  return (
    <header className="bg-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            NewsHub
          </Link>

          <nav className="flex">
            <Link to="/" className={`px-4 py-2 ${isActive('/')}`}>
              Home
            </Link>
            <Link to="/search" className={`px-4 py-2 ${isActive('/search')}`}>
              Search
            </Link>
            <Link to="/settings" className={`px-4 py-2 pr-0 ${isActive('/settings')}`}>
              Settings
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
