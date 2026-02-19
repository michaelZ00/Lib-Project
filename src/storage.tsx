/**
 * Utility functions for managing saved books in local storage.
 */
import type { Book } from './types';

/**
 * Retrieves the list of saved books from local storage.
 * @returns An array of Book objects.
 */
export const getSavedBooks = (): Book[] => {
  try {
    const items = localStorage.getItem('savedBooks');
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error('Error reading saved books from localStorage', error);
    return [];
  }
};

/**
 * Toggles a book's saved status in local storage.
 * @param book The book object to toggle.
 * @returns True if the book is now saved, false otherwise.
 */
export const toggleBookInStorage = (book: Book): boolean => {
  try {
    const books = getSavedBooks();
    const index = books.findIndex((b) => b.id === book.id);
    let isSaved = false;

    if (index > -1) {
      books.splice(index, 1);
      isSaved = false;
    } else {
      books.push(book);
      isSaved = true;
    }

    localStorage.setItem('savedBooks', JSON.stringify(books));
    window.dispatchEvent(new Event("SavedbooksUpdate"));
    return isSaved;
  } catch (error) {
    console.error('Error updating saved books in localStorage', error);
    return false;
  }
};

/**
 * Checks if a specific book is currently saved in local storage.
 * @param id The ID of the book to check.
 * @returns True if the book is saved, false otherwise.
 */
export const isBookSaved = (id: string): boolean => {
  const books = getSavedBooks();
  return books.some((book) => book.id === id);
};

/**
 * Removes all saved books from local storage.
 */
export const clearSavedBooks = (): void => {
  localStorage.removeItem('savedBooks');
  window.dispatchEvent(new Event("SavedbooksUpdate"));
};