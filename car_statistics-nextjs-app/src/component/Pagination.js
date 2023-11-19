const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
  const pagesCount = Math.ceil(items / pageSize);

  if (pagesCount === 1) return null;
  let pages = []
  if(pagesCount < 5){
    pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
  } else if (currentPage < 5){
    pages = [1,2,3,4,5];
  } else if (currentPage > pagesCount - 3){
    pages = [pagesCount - 4, pagesCount - 3, pagesCount - 2, pagesCount - 1, pagesCount];
  }else{
    pages = [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2];
  }

  return  (
    <div>
      <ul className="pagination">
      {currentPage > 4 ?
            <a className="pageItem" onClick={() => onPageChange(1)}>1</a>
      :
      ""}
      {currentPage > 4 ? ". . ." : ""}
      {/* pagination midle */}
        {pages.map((page) => (
          <li
            key={page}
            className={
              page === currentPage ? "pageItemActive" : "pageItem"
            }
          >
            <a className="pageLink" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
        {/* pagination end */}
        {currentPage < pagesCount - 3 ? ". . ." : ""}
        {currentPage < pagesCount - 3 ?
            <a className="pageItem" onClick={() => onPageChange(pagesCount)}>{pagesCount}</a>
      :
      ""}
      </ul>
    </div>
  );
}
export default Pagination

export const paginate = (items, pageNumber, pageSize) => {
 const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};