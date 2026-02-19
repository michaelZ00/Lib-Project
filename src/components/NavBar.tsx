/**
 * Navigation bar component that displays the logo, links, and saved books count.
 */
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getSavedBooks } from "../storage";
import loupe from '../assets/loupe.png';

function Navbar() {
  /**
   * Retrieves the current count of saved books from local storage.
   * @returns The number of saved books.
   */
  const getCount = () => {
    return getSavedBooks().length;
  };
  const [savedBooksCount, setSavedBooksCount] = useState(getCount());
  useEffect(() => {
    const handleUpdate = () => {
      setSavedBooksCount(getCount());
    };
    window.addEventListener("SavedbooksUpdate", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("SavedbooksUpdate", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-white shadow-md border-b border-gray-200 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <div className="font-bold text-xl text-blue-600">
            <img
              src="/src/assets/logo.webp"
              alt="My Library Logo"
              className="h-12 w-12 object-contain" 
            />
          </div>
          <div className="flex items-center space-x-6">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `hover:text-blue-500 font-medium transition-colors flex items-center ${
                  isActive ? "text-blue-600" : "text-gray-700"
                }`
              }
            >
              Library
              <img
                src={loupe}
                alt="Library Icon"
                className="w-5 h-5 ml-1 opacity-70"
              />
            </NavLink>
            <NavLink
              to="/savedbooks"
              className={({ isActive }) =>
                `hover:text-blue-500 font-medium transition-colors flex items-center gap-1 relative group ${
                  isActive ? "text-blue-600" : "text-gray-700"
                }`
              }
            >
              <span>Saved Books</span>
              <div className="relative">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 text-blue-500 fill-blue-500"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                {savedBooksCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm">
                    {savedBooksCount}
                  </span>
                )}
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;