/**
 * Page component that displays the list of books saved by the user.
 * Includes pagination and functionality to clear all saved books.
 */
import { useState, useEffect } from 'react';
import BookGrid from './components/BookGrid';
import Pagination from './components/Pagination';
import type { Book } from './types';
import { getSavedBooks, clearSavedBooks } from './storage';

const RESULTS_PER_PAGE = 12;

function SavedBooks() {
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

useEffect(() => {
  /**
   * Fetches saved books from storage and updates the state.
   */
  const fetchAndSetBooks = () => {
    const data = getSavedBooks();
    setSavedBooks(data);
    setLoading(false);
  };


  fetchAndSetBooks();
// Listen for custom events that indicate changes to saved books and update the list accordingly
// and help us keee the saved books counter in the navbar updated as well
  window.addEventListener("SavedbooksUpdate", fetchAndSetBooks);
  window.addEventListener("storage", fetchAndSetBooks);

  return () => {
    window.removeEventListener("SavedbooksUpdate", fetchAndSetBooks);
    window.removeEventListener("storage", fetchAndSetBooks);
  };
}, []);

  // Adjust current page if items are removed and the current page becomes empty
  useEffect(() => {
    const totalPages = Math.ceil(savedBooks.length / RESULTS_PER_PAGE);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [savedBooks.length, currentPage]);

  /**
   * Clears all saved books from storage after user confirmation.
   */
  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to remove all saved books?")) {
      clearSavedBooks();
      setCurrentPage(1);
    }
  };

  /**
   * Handles page changes for pagination.
   * @param pageNumber The new page number to navigate to.
   */
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalItems = savedBooks.length;
  const totalPages = Math.ceil(totalItems / RESULTS_PER_PAGE);
  const startIndex = (currentPage - 1) * RESULTS_PER_PAGE;
  const currentBooks = savedBooks.slice(startIndex, startIndex + RESULTS_PER_PAGE);

  return (
    <div className="app flex flex-col justify-start items-center w-full min-h-[calc(100vh-4rem)] pt-4 px-4 pb-16">
      {loading ? (
        <BookGrid books={[]} loading={true} />
      ) : savedBooks.length > 0 ? (
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-6">
          <div className="flex justify-end w-full px-4">
            <button 
              onClick={handleClearAll}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors shadow-sm"
            >
              Clear All
            </button>
          </div>
          <BookGrid books={currentBooks} loading={false} icon={true} />
          
 {totalItems > RESULTS_PER_PAGE ? (
  <Pagination 
    currentPage={currentPage} 
    totalPages={totalPages} 
    handlePageChange={handlePageChange}
    disableNext={currentPage === totalPages}
  />
) : (
  <div style={{ height: '10px' }} aria-hidden="true" />
)}
        </div>
      ) : (
        <div className="text-center mt  -8">
          <p>No saved books found. </p>
        </div>         
      )}
    </div>
  );
}

export default SavedBooks;