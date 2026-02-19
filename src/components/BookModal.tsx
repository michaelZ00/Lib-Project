/**
 * Modal component to display detailed book information.
 */
import placeholder from '../assets/PlaceHolder.jpg';
import type { Book } from '../types';

interface BookModalProps {
  volumeInfo: Book['volumeInfo'];
  onClose: () => void;
}

function BookModal({ volumeInfo, onClose }: BookModalProps) {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <img
              src={volumeInfo.imageLinks?.thumbnail || placeholder}
              alt={volumeInfo.title}
              className="w-32 h-48 object-cover rounded shadow-md"
            />
          </div>
          <div className="flex-grow">
            <h2 className="text-2xl font-bold mb-2">Title: {volumeInfo.title}</h2>
            <p className="text-gray-600 mb-4 italic">Author: {volumeInfo.authors?.join(", ") || "Unknown Author"}</p>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {volumeInfo.description || "No description available for this book."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookModal;