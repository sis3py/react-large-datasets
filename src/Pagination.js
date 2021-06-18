import React from "react";

const Pagination = ({ setPreviousPage, setNextPage, isPreviousEnabled, isNextEnabled, page, nbPages }) => (
      <nav>
          <button onClick={setPreviousPage} disabled={!isPreviousEnabled}>⮜</button>
          <span>Page {page} of {nbPages}</span>
          <button onClick={setNextPage}  disabled={!isNextEnabled}>⮞</button>
      </nav>
);

export default Pagination;