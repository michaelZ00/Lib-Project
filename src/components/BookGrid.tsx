/**
 * Component to display a grid of BookCards.
 * Handles loading state and rendering the list of books.
 */
import BookCard from './BookCard';
import type { Book } from '../types';

interface BookGridProps {
  books: Book[];
  loading: boolean;
  icon?: boolean;
}

function BookGrid({ books, loading, icon = false }: BookGridProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center w-full min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto justify-items-center">
      {books.map((book) => (
        <BookCard key={book.id} {...book} icon={icon} />
      ))}
    </div>
  );
}

export default BookGrid;