import React from "react";
import { usePagination, DOTS } from "hooks/usePagination";

const Pagination = (props) => {
  const {
    onPageChange = () => {},
    totalCount = 0,
    siblingCount = 1,
    currentPage = 1,
    pageSize = 10,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange && onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange && onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <>
      <div className="flex flex-wrap">
        <ul className="flex pagination bg-white dark:bg-gray-900 p-2 shadow-sm rounded-md">
          <li key="first-button" className="pagination-item">
            <button
              onClick={onPrevious}
              className="rounded-sm border border-gray-100 dark:border-gray-700 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 no-underline mx-2 text-sm"
              aria-label="Next"
            >
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </button>
          </li>
          {paginationRange.map((pageNumber, i) => {
            if (pageNumber === DOTS)
              return (
                <li key={`${DOTS}-${i}`} className="pagination-item dots">
                  &#8230;
                </li>
              );
            return (
              <li key={pageNumber} className={`pagination-item`}>
                <button
                  className={`rounded-sm border border-gray-100 dark:border-gray-700 px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 ${
                    currentPage === pageNumber &&
                    `bg-gray-200 dark:bg-gray-500 dark:border-gray-500 dark:text-gray-900`
                  }  no-underline mx-2 text-sm`}
                  onClick={() => onPageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            );
          })}
          <li key="next-button" className="pagination-item">
            <button
              disabled={currentPage === lastPage}
              className="rounded-sm border border-gray-100 dark:border-gray-700  px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 no-underline mx-2 text-sm"
              onClick={onNext}
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Pagination;
