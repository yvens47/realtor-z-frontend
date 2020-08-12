import React from "react";
import _ from "lodash";

import { Link } from "react-router-dom";
const Pagination = props => {
  const { pageSize, itemsCount } = props;
  var pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;

  const pages = _.range(1, pageCount + 1);
  return (
    <nav aria-label="Page navigation example">
      <ul className=" pagination mt-2 justify-content-center">
        <li className="page-item">
          <Link to="#" onClick={props.previous} className="page-link">
            &laquo;
          </Link>
        </li>
        {pages.map(page => (
          <li
            className={
              props.currentPage === page ? "page-item active" : "page-item"
            }
            key={page}
          >
            <Link
              onClick={() => props.onPageChange(page)}
              className="page-link"
              to="#"
            >
              {page}
            </Link>
          </li>
        ))}

        <li
          className={
            pageCount === props.currentPage ? "page-item disable" : "page-item"
          }
        >
          <Link
            onClick={() => props.next(pageCount)}
            className="page-link"
            to="#"
          >
            &raquo;
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
