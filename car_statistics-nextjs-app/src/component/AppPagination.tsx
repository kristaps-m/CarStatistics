import { CarStatistic } from "@/app/models/CarStatistic";
import React from "react";

interface PaginationProps {
  items: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const AppPagination = ({
  items,
  pageSize,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const pagesCount = Math.ceil(items / pageSize);

  if (pagesCount === 1) return null;
  let pages = [];
  if (pagesCount < 5) {
    pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
  } else if (currentPage < 5) {
    pages = [1, 2, 3, 4, 5];
  } else if (currentPage > pagesCount - 3) {
    pages = [
      pagesCount - 4,
      pagesCount - 3,
      pagesCount - 2,
      pagesCount - 1,
      pagesCount,
    ];
  } else {
    pages = [
      currentPage - 2,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ];
  }

  return (
    <ul className="pagination">
      {currentPage > 4 ? (
        <a className="pageItem" onClick={() => onPageChange(1)}>
          1
        </a>
      ) : (
        ""
      )}
      {currentPage > 4 ? ". . ." : ""}
      {/* pagination midle */}
      {pages.map((page) => (
        <li
          key={page}
          className={page === currentPage ? "pageItemActive" : "pageItem"}
        >
          <button className="pageLink" onClick={() => onPageChange(page)}>
            {page}
          </button>
        </li>
      ))}
      {/* pagination end */}
      {currentPage < pagesCount - 3 ? ". . ." : ""}
      {currentPage < pagesCount - 3 ? (
        <a className="pageItem" onClick={() => onPageChange(pagesCount)}>
          {pagesCount}
        </a>
      ) : (
        ""
      )}
    </ul>
  );
};
export default AppPagination;

export const paginate = (
  items: CarStatistic[],
  pageNumber: number,
  pageSize: number
) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};
