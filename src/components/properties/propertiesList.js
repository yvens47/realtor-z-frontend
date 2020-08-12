import React from "react";
import Property from "./property";

const PropertiesList = ({ listings }) => {
  return (
    <div className="property-listdiv">
      {listings &&
        listings.map(listing => (
          <Property key={listing._id} listing={listing} />
        ))}
    </div>
  );
};

export default PropertiesList;
