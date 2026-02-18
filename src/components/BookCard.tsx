interface BookCardProps {
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail: string;
    };
    previewLink: string;
  };
}
import placeholder from '../assets/placeholder.jpg';

function BookCard({ volumeInfo }: BookCardProps) {
  return (
    <div className="border border-gray-200 rounded p-4 shadow flex flex-col items-center">
      <img
        src={
          volumeInfo.imageLinks?.thumbnail || placeholder
        }
        alt={volumeInfo.title}
        className="mb-4 w-32 h-48 object-cover"
      />
      <h3 className="font-bold text-lg text-center">{volumeInfo.title}</h3>
      <p className="text-gray-600 text-center">{volumeInfo.authors?.join(", ")}</p>
    </div>
  );
}

export default BookCard;