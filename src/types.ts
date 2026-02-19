export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    previewLink?: string;
    description?: string;
    imageLinks?: {
      thumbnail: string;
    };
  };
}