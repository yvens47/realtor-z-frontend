import React, { Component } from "react";

import axios from "axios";
import { render } from "timeago.js";
class PropertyMarker extends Component {
  componentDidMount = () => {
    // this.getLongLat("");
  };
  getLongLat = async position => {
    console.log(position);
    // const n = {};
    //`http: //www.mapquestapi.com/geocoding/v1/address?key=Ei4t5B5xBrXqlX9vXfRIfMGNONMC1kEQ&location=${position.address}, ${position.city},${position.state} ${position.zip}`;
    const n = await axios.get(
      "http://www.mapquestapi.com/geocoding/v1/address?key=Ei4t5B5xBrXqlX9vXfRIfMGNONMC1kEQ&location=401 eden rd, lancaster,pa 17601"
    );

    return n.data.results[0].locations[0].latLng;
  };

  render() {
    const position = [51.505, -0.09];
    const lists = this.props.properpties ? this.props.properpties : [];

    return <React.Fragment>{console.log(lists)}</React.Fragment>;
  }
}

export default PropertyMarker;
