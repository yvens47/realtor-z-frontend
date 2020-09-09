import React from "react";

import {
  GoogleMap,
  withGoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
const Map = props => {
  const onMarkerClick = () => {
    alert("maerk click");
  };
  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: props.lat, lng: props.lng }}
    >
      {props.properties.map(p => Markers(onMarkerClick, p))}
    </GoogleMap>
  );
};

export default withGoogleMap(Map);
function Markers(onMarkerClick, p) {
  return (
    <Marker
      onClick={onMarkerClick}
      position={{
        lat: parseFloat(p.coords.lat),
        lng: parseFloat(p.coords.lng)
      }}
    >
      <InfoWindow>
        <div
          style={{
            background: "#eee",
            width: "230px",
            height: "200px",
            border: "solid 1px #eee",
            padding: "10px",
            marginBottom: "40px"
          }}
        >
          <img
            style={{ marginBottom: "20px;" }}
            width="100%"
            src={p.photos[1]}
          />
          <p>{p.price}</p>
        </div>
      </InfoWindow>
    </Marker>
  );
}
