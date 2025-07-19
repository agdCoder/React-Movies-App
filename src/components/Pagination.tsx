type Props = {
  isSearching: boolean;
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const Pagination = ({
  isSearching,
  totalPages,
  currentPage,
  setCurrentPage,
}: Props) => {
  return (
    <div>
      <button
        disabled={currentPage <= 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        prev
      </button>
      <span>
        {currentPage} / {isSearching ? totalPages : "..."}
      </span>
      <button
        disabled={currentPage >= totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
