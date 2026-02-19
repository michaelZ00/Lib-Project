/**
 * Component representing a single book card.
 * Displays book details and handles the save/remove functionality.
 */
import React, { useState, useEffect } from 'react';
import placeholder from '../assets/PlaceHolder.jpg';
import type { Book } from '../types';
import { isBookSaved, toggleBookInStorage } from '../storage';
import BookModal from './BookModal';

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
        {icon === insavedBooks && (

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
              className={`w-6 h-6 transition-colors duration-300 ${insavedBooks ? 'text-blue-500 fill-blue-500' : 'text-gray-400 fill-none'
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
        <BookModal volumeInfo={volumeInfo} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}

export default BookCard;