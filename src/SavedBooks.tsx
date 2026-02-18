import { useState, useEffect } from 'react';
import BookCard from './components/BookCard';

const apiKEY = import.meta.env.VITE_GOOGLE_BOOKS_KEY;

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

  useEffect(() => {
    const fetchSavedBooks = async () => {
      try {
        const items = window.localStorage.getItem('wishlist');
        const wishlist: string[] = items ? JSON.parse(items) : [];

        if (wishlist.length === 0) {
          setSavedBooks([]);

          
          setLoading(false);
          return;
        }

        // Fetch details for each book ID in the wishlist
        const bookPromises = wishlist.map((id) =>
          fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${apiKEY}`).then((res) =>
            res.json()
          )
        );

        const results = await Promise.all(bookPromises);
        setSavedBooks(results);
      } catch (error) {
        console.error('Error fetching saved books:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedBooks();
  }, []);

  return (
    <div className="app">
      <h1 className="mt-0 mb-6">Saved Books</h1>

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