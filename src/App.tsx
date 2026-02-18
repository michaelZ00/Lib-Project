import { useState, useEffect } from 'react'
import './App.css'
import BookCard from './components/BookCard';
const apiKEY = import.meta.env.VITE_GOOGLE_BOOKS_KEY
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

function App() {
  const [query, setQuery] = useState('')
  const [books, setBooks] = useState<Book[]>([])
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}+intitle&key=${apiKEY}`)
      const data = await response.json()
      console.log('Fetched books:', data)
      setBooks(data.items || [])
    } catch (error) {
      console.error('Error fetching books:', error)
    }
  }

  return (
    <div className="app">
      <h1 className="mt-0 mb-6">Book Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for books..."
          className="border border-gray-300 rounded px-4 py-2 mr-2 outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {books.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </div>
    </div>
  )
}

export default App
