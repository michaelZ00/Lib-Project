export interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    previewLink?: string;
    imageLinks?: {
      thumbnail: string;
    };
  };
}