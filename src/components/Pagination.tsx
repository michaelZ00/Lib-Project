/**
 * Pagination component for navigating through pages of book results.
 */

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  disableNext: boolean;
}

function Pagination({ currentPage, totalPages, handlePageChange, disableNext }: PaginationProps) {
  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-16 mb-16">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-white border rounded-md hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter((num) => Math.abs(num - currentPage) <= 3 || num === 1 || num === totalPages)
        .map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`w-10 h-10 flex items-center justify-center border rounded-md transition-all font-medium ${
              currentPage === pageNum
                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                : 'bg-white hover:bg-gray-100 text-gray-700'
            }`}
          >
            {pageNum}
          </button>
        ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={disableNext}
        className="px-4 py-2 bg-white border rounded-md hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;