import React, { useState } from "react";

import { InfoWindow } from "react-google-maps";
const MapInfoWindow = ({ p, isOpen }) => {
  console.log("line 5 MapInfo", isOpen);

  return (
    isOpen && (
      <InfoWindow>
        <div
          style={{
            width: "230px",
            height: "auto",
            border: "solid 1px #eee",
            padding: "10px",
            marginBottom: "40px",
            position: "realtive"
          }}
        >
          <div className="info windowImage">
            <img
              style={{ marginBottom: "20px;" }}
              width="100%"
              src={p.photos[0]}
            />
            <p>
              {"$" +
                new Intl.NumberFormat({
                  style: "currency",
                  currency: "USD"
                }).format(p.price)}
            </p>
          </div>
          <div className="info window-details p-1">
            <div className="window-address">
              {p.address.street},
              <br />
              <span>
                {p.address.city}, {p.address.state} {p.address.zip}
              </span>
            </div>
          </div>
        </div>
      </InfoWindow>
    )
  );
};

export default MapInfoWindow;
