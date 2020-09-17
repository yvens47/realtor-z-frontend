import React, { useState } from "react";

import {
  GoogleMap,
  withGoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import MapInfoWindow from "./MapInfoWindow";
import MapMarker from "./MapMarker";
const Map = props => {
  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: props.lat, lng: props.lng }}
    >
      {props.properties.map(p => (
        <MapMarker p={p}></MapMarker>
        // <Marker
        //   onClick={onMarkerClick}
        //   position={{
        //     lat: parseFloat(p.coords.lat),
        //     lng: parseFloat(p.coords.lng)
        //   }}
        // >
        //   <MapInfoWindow p={p} isOpen={isOpen} />
        // </Marker>
      ))}
    </GoogleMap>
  );
};

export default withGoogleMap(Map);
