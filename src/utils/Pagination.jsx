function Pagination({ totalItems, itemsPerPage, currentPage, setCurrentPage }) {

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pagesPerGroup = 10;

  const currentGroup = Math.ceil(currentPage / pagesPerGroup);

  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const handlePrevGroup = () => {
    const newPage = startPage - pagesPerGroup;
    setCurrentPage(newPage > 0 ? newPage : 1);
  };

  const handleNextGroup = () => {
    const newPage = endPage + 1;
    setCurrentPage(newPage <= totalPages ? newPage : totalPages);
  };

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${startPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={handlePrevGroup}
            disabled={startPage === 1}
          >
            &laquo;
          </button>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={`page-item ${currentPage === page ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          </li>
        ))}
        <li className={`page-item ${endPage >= totalPages ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={handleNextGroup}
            disabled={endPage >= totalPages}
          >
            &raquo;
          </button>
        </li>

      </ul>
    </nav>
  );
}

export default Pagination;
