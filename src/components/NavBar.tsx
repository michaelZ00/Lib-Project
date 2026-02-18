import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    previewLink: string;
    imageLinks?: {
      thumbnail: string;
    };
  };
}
function Navbar() {
  // כאן בעתיד תמשוך את כמות הספרים מה-State הגלובלי שלך
const getCount = () => {
    const items = localStorage.getItem('savedBooks');
    const parsed = items ? JSON.parse(items) : [];
    return parsed.length;
  };
  const [savedBooksCount, setSavedBooksCount] = useState(getCount());
  useEffect(() => {
    const handleUpdate = () => {
      setSavedBooksCount(getCount());
    };

    // האזנה לאירוע מותאם אישית שנשלח מה-BookCard
    window.addEventListener("SavedbooksUpdate", handleUpdate);
    
    // האזנה לשינויים מטאבים אחרים (בונוס)
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
              className="h-12 w-12 object-contain" // תיקון קטן לגובה שיתאים ל-16
            />
          </div>
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-500 font-medium transition-colors flex items-center"
            >
              Library
              <img
                src="./src/assets/loupe.png"
                alt="Library Icon"
                className="w-5 h-5 ml-1 opacity-70"
              />
            </Link>

            {/* Saved Books עם Badge */}
            <Link
              to="/savedbooks"
              className="text-gray-700 hover:text-blue-500 font-medium transition-colors flex items-center gap-1 relative group"
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
                
                {/* המונה (Badge) */}
                {savedBooksCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white shadow-sm">
                    {savedBooksCount}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;