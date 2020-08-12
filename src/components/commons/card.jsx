import React from "react";

export default function ListingCard(props) {
  return (
    <div className="listing-card">
      <div className="listing-card-image">
        <img src={props.image} alt="listing" />
      </div>

      <div className="listing-card-details">
        <p>Manheim PA</p>
        <p>$345,000</p>
        <a href="/properties/5ed32b0841128909a5ec93f3">
          <i class="fas fa-external-link-alt"></i>
        </a>
      </div>
    </div>
  );
}
