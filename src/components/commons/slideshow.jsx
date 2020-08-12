import React from "react";
import SlideShowItem from "./slide-item";
//import { Map } from "react-leaflet";
const SlideShow = props => {
  return (
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-ride="carousel"
    >
      <ol className="carousel-indicators">
        {props.photos &&
          props.photos.map((photo, index) => (
            <React.Fragment>
              {index === 1 && (
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="0"
                  className="active"
                ></li>
              )}
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to={index}
              ></li>
            </React.Fragment>
          ))}
      </ol>
      <div className="carousel-inner">
        {props.photos &&
          props.photos.map((photo, index) =>
            index === 0 ? (
              <SlideShowItem imageSrc={photo} active={true} />
            ) : (
              <SlideShowItem imageSrc={photo} />
            )
          )}
      </div>
      <a
        className="carousel-control-prev"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </a>
    </div>
  );
};

export default SlideShow;
