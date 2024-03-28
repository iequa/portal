import React, { useEffect, useState } from "react";

const minPagesCount = 6;

const Pagination = ({ currentPage, countOfPages, onClick }) => {
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  let oldPage = currentPage;
  let pagesCounter = [0, 1, 2, 3, 4, 5];
  useEffect(() => {
    setPage(currentPage);
    setCount(countOfPages);
  }, [countOfPages]);

  function ChangePage(pg) {
    if (page !== pg) {
      pagesCounter = pagesCounter.slice(0, count);
      oldPage = page;
      setPage(pg);
      onClick(pg);
    }
  }

  function GetFirstPages(endPage) {
    let res = [];
    for (let i = 0; i < endPage; i++) {
      res.push(
        <a
          key={pagesCounter[i]}
          className={GetClass(pagesCounter[i])}
          onClick={() => ChangePage(pagesCounter[i])}
        >
          {pagesCounter[i] + 1}
        </a>
      );
    }
    return res;
  }

  function GetClass(pg) {
    if (currentPage === pg) {
      return "pag pag-active";
    }
    return "pag";
  }

  return (
    <div className="pagination">
      {count <= minPagesCount ? (
        GetFirstPages(count)
      ) : page > 3 ? (
        <div className="pagination">
          <a key={0} className={GetClass(0)} onClick={() => ChangePage(0)}>
            {1}
          </a>
          <a key={-1} className={GetClass(-1)}>
            .....
          </a>
          <a
            key={page - 1}
            className={GetClass(page - 1)}
            onClick={() => ChangePage(page - 1)}
          >
            {page}
          </a>
          <a
            key={page + 1}
            className={GetClass(page)}
            onClick={() => ChangePage(page)}
          >
            {page + 1}
          </a>
          {page + 2 > countOfPages ? (
            ""
          ) : (
            <a
              key={page + 2}
              className={GetClass(page + 1)}
              onClick={() => ChangePage(page + 1)}
            >
              {page + 2}
            </a>
          )}
        </div>
      ) : (
        GetFirstPages(minPagesCount)
      )}
    </div>
  );
};

export default Pagination;
