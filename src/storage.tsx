import type { Book } from './types';

export const getSavedBooks = (): Book[] => {
  try {
    const items = localStorage.getItem('savedBooks');
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error('Error reading saved books from localStorage', error);
    return [];
  }
};

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

export const isBookSaved = (id: string): boolean => {
  const books = getSavedBooks();
  return books.some((book) => book.id === id);
};

export const clearSavedBooks = (): void => {
  localStorage.removeItem('savedBooks');
  window.dispatchEvent(new Event("SavedbooksUpdate"));
};