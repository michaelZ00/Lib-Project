import React, { useState, useEffect } from 'react';
import placeholder from '../assets/placeholder.jpg';

// הגדרת הטיפוסים (Interface)
interface BookCardProps {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail: string;
    };
  };
}

function BookCard({ id, volumeInfo }: BookCardProps) {
  const [inWishlist, setInWishlist] = useState<boolean>(false);

  // בדיקה אם הספר כבר קיים ב-Wishlist בטעינה הראשונה
  useEffect(() => {
    try {
      const items = window.localStorage.getItem('wishlist');
      const wishlist: string[] = items ? JSON.parse(items) : [];
      if (wishlist.includes(id)) {
        setInWishlist(true);
      }
    } catch (error) {
      console.error('Error reading wishlist from localStorage', error);
    }
  }, [id]);

  // פונקציה להוספה/הסרה מהרשימה
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // מונע מהלחיצה להשפיע על אלמנטים שעוטפים את הכרטיס
    try {
      const items = window.localStorage.getItem('wishlist');
      let wishlist: string[] = items ? JSON.parse(items) : [];
      const bookIndex = wishlist.indexOf(id);

      if (bookIndex > -1) {
        wishlist.splice(bookIndex, 1);
        setInWishlist(false);
      } else {
        wishlist.push(id);
        setInWishlist(true);
      }
      window.localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } catch (error) {
      console.error('Error updating wishlist in localStorage', error);
    }
  };

  return (
    <div className="relative border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center bg-white">
      
      {/* כפתור ה-Wishlist (Bookmark) */}
      <div
        role="button"
        tabIndex={0}
        onClick={handleWishlistToggle}
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
        aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <svg 
          viewBox="0 0 24 24"
          className={`w-6 h-6 transition-colors duration-300 ${
            inWishlist ? 'text-blue-500 fill-blue-500' : 'text-gray-400 fill-none'
          }`}
          stroke="currentColor" 
          strokeWidth="2"
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
      </div>

      {/* תמונת הכריכה */}
      <img
        src={volumeInfo.imageLinks?.thumbnail || placeholder}
        alt={volumeInfo.title}
        className="mb-4 w-32 h-48 object-cover rounded shadow-sm"
      />

      {/* פרטי הספר */}
      <h3 className="font-bold text-lg text-center line-clamp-2 min-h-[3.5rem]">
        {volumeInfo.title}
      </h3>
      <p className="text-gray-600 text-sm text-center mt-2 line-clamp-1">
        {volumeInfo.authors?.join(", ") || "Unknown Author"}
      </p>
    </div>
  );
}

export default BookCard;