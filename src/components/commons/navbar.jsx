import React from "react";
import NavbarItem from "./navbar-item";
import "fontawesome/index";

import { Link } from "react-router-dom";
const Navbar = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <Link className="navbar-brand" to="/">
        Realtor-Z
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              <i className="fas fa-house-user"></i> Home{" "}
              <span className="sr-only">(current)</span>
            </Link>
          </li>
          <NavbarItem linkText="Properties" path="/properties">
            <span className="sr-only">
              <i className="fas fa-hotel"></i>
            </span>
          </NavbarItem>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-success my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
        <ul className="navbar-nav mr-0">
          {!props.user.account && (
            <React.Fragment>
              <NavbarItem linkText="Login" path="/login" />
              <NavbarItem linkText="Register" path="/register" />
            </React.Fragment>
          )}
          {props.user.account && (
            <React.Fragment>
              {/* <li className="nav-item active">
                <Link className="nav-link" to="/">
                  <img src="" className="profile-icon" alt="profile" />
                </Link>
              </li> */}

              {
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="fas fa-users-cog"></i> My account
                  </Link>
                  <div
                    className="dropdown-menu mr-1"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link className="dropdown-item" to="/dashboard">
                      <i class="fas fa-bars"></i> Dashboard
                    </Link>
                    <Link className="dropdown-item" to="/user/settings">
                      <i class="fas fa-cogs"></i> Settings
                    </Link>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/user/listings">
                      <i class="fas fa-cogs"></i> Listings
                    </Link>

                    {/* <a className="dropdown-item" href="#">
                      Something else here
                    </a> */}
                  </div>
                </li>
              }
              <NavbarItem
                logout={props.logout}
                linkText="Logout"
                path="/logout"
              />
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
