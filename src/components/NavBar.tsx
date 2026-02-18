import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 mb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center"></div>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="hover:text-blue-400 font-medium transition-colors"
            >
              Library
            </Link>
            <Link
              to="/SavedBooks"
              className="hover:text-blue-400 font-medium transition-colors"
            >
              SavedBooks
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
