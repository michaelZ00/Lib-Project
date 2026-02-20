/**
 * API functions for fetching data.
 */

const apiKEY = import.meta.env.VITE_API_KEY;






const RESULTS_PER_PAGE = 12;

export const fetchBooksFromGoogle = async (searchQuery: string, page: number) => {
  const startIndex = (page - 1) * RESULTS_PER_PAGE;
  // Combine title and author search for better results
  const combinedQuery = `intitle:${searchQuery} OR inauthor:${searchQuery}`;
  
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${combinedQuery}&startIndex=${startIndex}&maxResults=${RESULTS_PER_PAGE}&key=${apiKEY}`
  );
  
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  return response.json();
};