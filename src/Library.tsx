/**
 * Main library page component that handles book searching and displaying results.
 * Integrates with the Google Books API.
 */
import React, { useState } from 'react';
import type { Book } from './types';
import SearchForm from './components/SearchForm';
import BookGrid from './components/BookGrid';

const apiKEY = import.meta.env.VITE_GOOGLE_BOOKS_KEY;
const RESULTS_PER_PAGE = 12;



function Library() {
  
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [guide, setGuide] = useState('');
  const [loading, setLoading] = useState(false);
  

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  /**
   * Fetches books from the Google Books API based on the search query and page number.
   * @param searchQuery The search term entered by the user.
   * @param page The current page number for pagination.
   */
  const fetchBooks = async (searchQuery: string, page: number) => {
    setLoading(true);
    setGuide('');
    const startIndex = (page - 1) * RESULTS_PER_PAGE;
  // Combine title and author search for better results
    const combinedQuery = `intitle:${searchQuery} OR inauthor:${searchQuery}`;
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${combinedQuery}&startIndex=${startIndex}&maxResults=${RESULTS_PER_PAGE}&key=${apiKEY}`
      );
      const data = await response.json();
      
      if (data.items) {
        if (page === 1) {
          setBooks(data.items);
        } else {
          setBooks((prev) => [...prev, ...data.items]);
        }

        setTotalItems( data.totalItems|| 0);
      } else {
        // setBooks([]);
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

  /**
   * Handles the form submission for searching books.
   * Resets to the first page and triggers a new fetch.
   * @param e The form event.
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() === '') {
      setGuide('Please input a book title or author name');
      return;
    }
    setCurrentPage(1);
    fetchBooks(query, 1);
  };

  /**
   * Handles loading more books.
   */
  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchBooks(query, nextPage);
  };

  return (
    <div className="flex flex-col justify-start items-center w-full min-h-[calc(100vh-4rem)] pt-4 px-4">
      <SearchForm query={query} setQuery={setQuery} handleSearch={handleSearch} />
      
      <div className="text-center mt  -8">
          <p>{guide}</p>
      </div>
      
      <BookGrid books={books} loading={loading && currentPage === 1} />

      {loading && currentPage > 1 && (
        <div className="flex justify-center items-center w-full p-4 mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      )}

      {!loading && books.length > 0 && (
        books.length < totalItems ? (
          <div className="flex justify-center mt-8 mb-16">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              Load More
            </button>
          </div>
        ) : (
          <div className="text-center mt-8 mb-16 text-gray-500 font-medium">
            <p>No more books to load.</p>
          </div>
        )
      )}
    </div>
  );
}

export default Library;