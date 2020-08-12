import React from "react";

import { GoogleMap, withGoogleMap, Marker } from "react-google-maps";
const Map = props => {
  const onMarkerClick = () => {
    alert("maerk click");
  };
  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: props.lat, lng: props.lng }}
    >
      {props.properties.map(p => (
        <Marker
          onClick={onMarkerClick}
          position={{
            lat: parseFloat(p.coords.lat),
            lng: parseFloat(p.coords.lng)
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default withGoogleMap(Map);
