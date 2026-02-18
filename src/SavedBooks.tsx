import { useState, useEffect } from 'react';
import BookCard from './components/BookCard';
import type { Book } from './types';
import { getSavedBooks, clearSavedBooks } from './storage';

function SavedBooks() {
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  // פונקציה שגם שולפת וגם מעדכנת את המסך
  const fetchAndSetBooks = () => {
    const data = getSavedBooks();
    setSavedBooks(data);
    setLoading(false);
  };


  fetchAndSetBooks();

  window.addEventListener("SavedbooksUpdate", fetchAndSetBooks);
  window.addEventListener("storage", fetchAndSetBooks);

  return () => {
    window.removeEventListener("SavedbooksUpdate", fetchAndSetBooks);
    window.removeEventListener("storage", fetchAndSetBooks);
  };
}, []);

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to remove all saved books?")) {
      clearSavedBooks();
    }
  };

  return (
    <div className="app flex flex-col justify-start items-center w-full min-h-screen pt-4 px-4">
      {loading ? (
        <p>Loading saved books...</p>
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
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full justify-items-center">
            {savedBooks.map((book) => (
              <BookCard key={book.id} {...book} icon={true} />
            ))}
          </div>
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