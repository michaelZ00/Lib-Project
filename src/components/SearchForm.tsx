/**
 * Search form component for inputting book queries.
 */
import React from 'react';
import loupe from '../assets/loupe.png';

interface SearchFormProps {
  query: string;
  setQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

function SearchForm({ query, setQuery, handleSearch }: SearchFormProps) {
  return (
    <form onSubmit={handleSearch} className="max-w-md w-full mb-8">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search for books..."
          className="w-full border border-gray-300 rounded-lg pl-4 pr-10 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-transparent border-none outline-none focus:outline-none transition-colors group"
        >
          <img
            src={loupe}
            alt="search"
            className="w-5 h-5 object-contain opacity-50 group-hover:opacity-100 transition-opacity"
          />
        </button>
      </div>
    </form>
  );
}

export default SearchForm;