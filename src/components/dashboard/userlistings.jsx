import React from "react";
import { format } from "timeago.js";

import { Link } from "react-router-dom";
import { deleteUserListingCreator } from "../../store/actions/userActionsCreator";
import axios from "axios";
import { connect } from "react-redux";
import userReducer from "../../store/reducers/userReducer";
const UserListings = props => {
  const deleteListing = (e, listing) => {
    e.preventDefault();
    props.dispatch(deleteUserListingCreator(listing));
    // send request to server
    //users/dashboard/listings/delete/5eb82f23c2cb3a0875d471b9
    http: axios
      .delete(
        `http://localhost:5000/api/users/dashboard/listings/delete/${listing._id}`
      )
      .then(response => {
        console.log(response);
        //this.props.dispatch(getUserListingsCreator(response.data));
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  const { userListings } = props;

  if (userListings && userListings.length === 0) {
    return (
      <div>
        <h3>currently no listing yet</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt,
          aliquid cupiditate! Fuga minus voluptates modi !
        </p>
      </div>
    );
  } else {
    return (
      <div class="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Address</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
              <th scope="col">Date</th>

              <th scope="col">Images</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userListings &&
              userListings.map((listing, index) => (
                <tr key={listing._id}>
                  <td>{listing.address.street}</td>
                  <td>
                    {"$" +
                      new Intl.NumberFormat({
                        style: "currency",
                        currency: "USD"
                      }).format(listing.price)}
                  </td>
                  <td>{listing.status}</td>
                  <td>{format(listing.createdAt)}</td>
                  <td>
                    {" "}
                    {listing.photos.length === 0 ? (
                      <Link
                        to={`/add-property-pics/${listing._id}`}
                        className="btn btn-primary"
                      >
                        <i class="fas fa-upload"></i>
                      </Link>
                    ) : (
                      listing.photos.length
                    )}
                  </td>
                  <td>
                    <Link
                      onClick={e => {
                        deleteListing(e, listing);
                      }}
                      to={`/user/listings/delete/${listing._id}`}
                      className="btn btn-danger mr-1"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </Link>
                    <Link
                      to={`/user/listings/edit/${listing._id}`}
                      className="btn btn-info"
                    >
                      <i class="fas fa-edit"></i>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
};
function mapStateToProps(state) {
  const { user } = state;

  return {
    listings: user.listings
  };
}
export default connect(mapStateToProps)(UserListings);
