import { useState, useEffect } from 'react';
import BookCard from './components/BookCard';


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

function SavedBooks() {
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const getSavedBooks = (): Book[] => {
  try {
    const items = window.localStorage.getItem('savedBooks');
    
    // אם אין כלום ב-LocalStorage, נחזיר מערך ריק
    if (!items) return [];

    // הופכים את הטקסט חזרה למערך של אובייקטים
    return JSON.parse(items);
  } catch (error) {
    // במקרה שיש שגיאה ב-Parsing (למשל טקסט לא תקין)
    console.error('Could not parse saved books from localStorage', error);
    return [];
  }
};
useEffect(() => {
  // פונקציה שגם שולפת וגם מעדכנת את המסך
  const fetchAndSetBooks = () => {
    const data = getSavedBooks();
    setSavedBooks(data);
    setLoading(false);
  };

  // הפעלה ראשונית בטעינת הדף
  fetchAndSetBooks();

  // האזנה לאירועים - עכשיו הם מפעילים את הפונקציה שמעדכנת את ה-State
  window.addEventListener("SavedbooksUpdate", fetchAndSetBooks);
  window.addEventListener("storage", fetchAndSetBooks);

  return () => {
    window.removeEventListener("SavedbooksUpdate", fetchAndSetBooks);
    window.removeEventListener("storage", fetchAndSetBooks);
  };
}, []);

  return (
    <div className="app flex flex-col justify-start items-center w-full min-h-screen pt-4 px-4">
      {/* <h1 className="mt-0 mb-6">Saved Books</h1> */}

      {loading ? (
        <p>Loading saved books...</p>
      ) : savedBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {savedBooks.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      ) : (
        <div className="text-center mt  -8">
          <p>No saved books found. Add some to your wishlist!</p>
        </div>         
      )}
    </div>
  );
}

export default SavedBooks;