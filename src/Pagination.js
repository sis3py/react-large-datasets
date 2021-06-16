import React from "react";

const Pagination = ({ setPreviousPage, setNextPage, isPreviousEnabled, isNextEnabled, page, nbPages }) => (
      <nav>
          <a href="#" onClick={setPreviousPage} disabled={!isPreviousEnabled}>⮜</a>
          <span>Page {page} of {nbPages}</span>
          <a href="#" onClick={setNextPage}  disabled={!isNextEnabled}>⮞</a>
      </nav>
);

export default Pagination;