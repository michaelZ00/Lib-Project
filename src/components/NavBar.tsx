import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-white shadow-md border-b border-gray-200 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <div className="font-bold text-xl text-blue-600">
            <img
              src="/src/assets/logo.webp"
              alt="My Library Logo"
              className="h-15 w-15"
            />
          </div>
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-500 font-medium transition-colors"
            >
              Library
              <img
                src="./src/assets/loupe.png"
                alt="Library Icon"
                className="w-5 h-5 text-blue-500 fill-blue-500 inline-block ml-1"
              />
            </Link>
            <Link
              to="/savedbooks"
              className="text-gray-700 hover:text-blue-500 font-medium transition-colors flex items-center gap-1"
            >
              Saved Books
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-blue-500 fill-blue-500"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
