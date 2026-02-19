/**
 * Component representing a single book card.
 * Displays book details and handles the save/remove functionality.
 */
import React, { useState, useEffect } from 'react';
import placeholder from '../assets/PlaceHolder.jpg';
import type { Book } from '../types';
import { isBookSaved, toggleBookInStorage } from '../storage';

interface BookCardProps extends Book {
  icon: boolean;
}

function BookCard({ id, volumeInfo, icon }: BookCardProps) {
  const [insavedBooks, setInsavedBooks] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setInsavedBooks(isBookSaved(id));
  }, [id]);


  /**
   * Toggles the saved state of the book when the bookmark icon is clicked.
   * @param e The mouse event.
   */
  const handleSavedbooksToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    const isSaved = toggleBookInStorage({ id, volumeInfo });
    setInsavedBooks(isSaved);
  };

  return (
    <>
    <div 
      onClick={() => setShowModal(true)}
      className="w-[350px] relative border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center bg-white cursor-pointer"
    >
      
      {/* כפתור ה-Wishlist (Bookmark) */}
      {  icon === insavedBooks && (

        <div
        role="button"
        tabIndex={0}
        onClick={handleSavedbooksToggle}
        className="
        absolute top-2 right-2 
          inline-flex items-center justify-center 
          w-10 h-10 
          rounded-full 
          cursor-pointer 
          transition-all duration-300
          select-none
          border-2 border-transparent 
          hover:border-blue-100 
          hover:bg-blue-50/50
          active:scale-90
          "
          aria-label={insavedBooks ? 'Remove from saved books' : 'Add to saved books'}
          >
        <svg 
          viewBox="0 0 24 24"
          className={`w-6 h-6 transition-colors duration-300 ${
            insavedBooks ? 'text-blue-500 fill-blue-500' : 'text-gray-400 fill-none'
            }`}
            stroke="currentColor" 
            strokeWidth="2"
            strokeLinecap="round" 
            strokeLinejoin="round"
            >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      </div>
            )}

      {/* תמונת הכריכה */}
      <img
      src={volumeInfo.imageLinks?.thumbnail || placeholder}
      alt={volumeInfo.title}
      className="mb-4 w-32 h-48 object-cover rounded shadow-sm"
      />

      {/* פרטי הספר */}
      <h3 className="font-bold text-lg text-center line-clamp-2 min-h-[3.5rem]">
        Title: {volumeInfo.title}
      </h3>
      <p className="text-gray-600 text-sm text-center mt-2 line-clamp-1">
        Author: {volumeInfo.authors?.join(", ") || "Unknown Author"}
      </p>
    </div>

    {showModal && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50 p-4" onClick={() => setShowModal(false)}>
          <div 
            className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative shadow-xl" 
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 mx-auto md:mx-0">
                <img
                  src={volumeInfo.imageLinks?.thumbnail || placeholder}
                  alt={volumeInfo.title}
                  className="w-32 h-48 object-cover rounded shadow-md"
                />
              </div>
              <div className="flex-grow">
                <h2 className="text-2xl font-bold mb-2">Title: {volumeInfo.title}</h2>
                <p className="text-gray-600 mb-4 italic">Author: {volumeInfo.authors?.join(", ") || "Unknown Author"}</p>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {volumeInfo.description || "No description available for this book."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BookCard;