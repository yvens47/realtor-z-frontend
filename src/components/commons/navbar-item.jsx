import React from "react";

import { Link } from "react-router-dom";
const NavbarItem = ({ logout, linkText, path, children }) => {
  // const logout = e => {
  //   e.preventDefault();
  // };
  return (
    <li className="nav-item">
      <Link className="nav-link" to={path} onClick={logout}>
        {linkText}
        {children}
      </Link>
    </li>
  );
};

export default NavbarItem;
