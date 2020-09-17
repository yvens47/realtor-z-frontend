import React from "react";
import UserProfilePic from "./userProfilepic";

import { Link } from "react-router-dom";

const DashboardSidebar = props => {
  return (
    <div className="user-profile-box border rounded p-3">
      <UserProfilePic user={props.user} openModal={props.openModal} />

      <p className="font-weight-bolder">Welcome back!</p>
      <hr />
      <Link to="/dashboard" className="btn btn-secondary btn-block">
        <i className="fas fa-house-user"></i> Dashboard
      </Link>
      <Link to="/user/settings" className="btn btn-info btn-block">
        <i className="fas fa-user-cog"></i> Settings
      </Link>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/user/listings" className="nav-link active" href="#">
            <i className="fas fa-list-ul"></i> Listings
          </Link>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link" to="#">
            Link
          </Link>
        </li> */}
        {/* <li className="nav-item">
          <Link className="nav-link" to="#">
            Link
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default DashboardSidebar;
