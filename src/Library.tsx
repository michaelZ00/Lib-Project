import React, { useState } from 'react';
import BookCard from './components/BookCard';
import type { Book } from './types';

const apiKEY = import.meta.env.VITE_GOOGLE_BOOKS_KEY;
// type FetchBooksParams = {
//   searchQuery: string;
//   page: number;
// };
const RESULTS_PER_PAGE = 12;



function Library() {
  
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [guide, setGuide] = useState('');
  const [loading, setLoading] = useState(false);
  
  // State עבור דפדוף
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // פונקציית ה-Fetch המרכזית
  const fetchBooks = async (searchQuery: string, page: number) => {
    setLoading(true);
    setGuide('');
    const startIndex = (page - 1) * RESULTS_PER_PAGE;

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&startIndex=${startIndex}&maxResults=${RESULTS_PER_PAGE}&key=${apiKEY}`
      );
      const data = await response.json();
      
      if (data.items) {
        setBooks(data.items);
        setTotalItems(data.totalItems || 0);
      } else {
        setBooks([]);
        setTotalItems(0);
        if (page === 1) setGuide('No books found for this search.');
      }
    } catch (error) {
      console.error('Error fetching books:', error);
      setGuide('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // לחיצה על חיפוש (זכוכית מגדלת או Enter)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() === '') {
      setGuide('Please input a book title or author name');
      return;
    }
    setCurrentPage(1); // חוזרים לעמוד ראשון בחיפוש חדש
    fetchBooks(query, 1);
  };

  // החלפת עמוד
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    fetchBooks(query, pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // גלילה למעלה במעבר עמוד
  };

  // חישוב כמות הדפים להצגה (מוגבל ל-10 לצורך נוחות ה-UI)
  const totalPages = Math.min(Math.ceil(totalItems / RESULTS_PER_PAGE), 25);
  return (
    <div className="flex flex-col justify-start items-center w-full min-h-screen pt-4 px-4">
      <form onSubmit={handleSearch} className="max-w-md w-full mb-8">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Search for books..."
            className="w-full border border-gray-300 rounded-lg pl-4 pr-10 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
<button 
      type="submit" 
      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-transparent border-none outline-none focus:outline-none transition-colors group"
    >
      <img 
        src="./src/assets/loupe.png" 
        alt="search"
        className="w-5 h-5 object-contain opacity-50 group-hover:opacity-100 transition-opacity"
      />
    </button>
        </div>
      </form>
              <div className="text-center mt  -8">
          <p>{guide}</p>
        </div> 
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto justify-items-center">
  {/* כאן נכנס התוכן שלך */}
        {books.map((book) => (
          <BookCard key={book.id} {...book} icon={false} />
        ))}
      </div>
{/* כפתורי דפדוף (Pagination) */}
      {!loading && books.length > 0 && (
        <div className="flex flex-wrap justify-center items-center gap-2 mt-16 mb-16">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white border rounded-md hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            Prev
          </button>

          {/* לוגיקת הצגת מספרים (מציג עד 7 דפים קרובים) */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(num => Math.abs(num - currentPage) <= 3 || num === 1 || num === totalPages)
            .map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`w-10 h-10 flex items-center justify-center border rounded-md transition-all font-medium ${
                  currentPage === pageNum 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                    : 'bg-white hover:bg-gray-100 text-gray-700'
                }`}
              >
                {pageNum}
              </button>
          ))}

          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || books.length < RESULTS_PER_PAGE}
            className="px-4 py-2 bg-white border rounded-md hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Library;