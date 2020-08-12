import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";

const Property = props => {
  const { listing } = props;

  return (
    <div className="property-list-list ">
      <div className="property-list-image-wrapper">
        <Link
          to={{
            pathname: `/properties/${listing._id}`
          }}
        >
          {listing.photos ? (
            <img
              src={`http://localhost:5000/uploads/${listing.photos &&
                listing.photos[0]}`}
              className="card-img"
              alt="..."
            />
          ) : (
            <Skeleton variant="rect" width={"90%"} height={"95%"} />
          )}
        </Link>
      </div>
      <div className="property-list-detail">
        <div className="price">
          <p>
            {"$" +
              new Intl.NumberFormat({
                style: "currency",
                currency: "USD"
              }).format(listing.price)}
          </p>
        </div>
        <div className="bed-bath">
          <span className="p-1">
            <i className="fas fa-bed pr-1"></i>
            {listing.bedrooms}bd
          </span>
          <span className="p-1">
            {" "}
            <i className="fas fa-bath pr-1"></i>
            {listing.bathrooms}ba
          </span>
        </div>
        <div className="address-block">
          <p>
            {listing.address && listing.address.street},{" "}
            {listing.address && listing.address.city + " "},
            {listing.address && listing.address.state + " ,"}
            {listing.address && listing.address.zip}
            
          </p>
        </div>
        <div className="contact-block">
          <p>
            <button className="btn btn-info mr-1">
              <i class="fas fa-envelope"></i>
            </button>

            {listing.agent && listing.agent.phone && (
              <button className="btn btn-primary">
                <i className="fas fa-phone pr-1"></i>
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Property;
