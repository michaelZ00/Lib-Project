import React, { useState } from 'react';
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

// ... (Interface נשאר אותו דבר)

function Library() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}+intitle&key=${apiKEY}`);
      const data = await response.json();
      setBooks(data.items || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

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
          <img 
            src="./src/assets/loupe.png" 
            alt="search"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 object-contain pointer-events-none opacity-50"
          />
        </div>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {books.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </div>
    </div>
  );
}

export default Library;