import React from "react";
const SlideShowItem = ({ imageSrc, active }) => {
  if (active) {
    return (
      <div className="carousel-item active">
        <img
          src={"http://localhost:5000/uploads/" + imageSrc}
          className="d-block w-100"
          alt="..."
        />
      </div>
    );
  } else {
    return (
      <div className="carousel-item">
        <img
          src={"http://localhost:5000/uploads/" + imageSrc}
          className="d-block w-100"
          alt="..."
        />
      </div>
    );
  }
};

export default SlideShowItem;
