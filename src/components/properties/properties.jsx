import React, { Component } from "react";
// import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
// import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import PropertiesList from "./propertiesList";
import "fontawesome";
import { connect } from "react-redux";

import getListingsActionCreator from "../../store/actions/listingActionsCreator";

import Map from "../commons/map";
import { Link } from "react-router-dom";
import Footer from "../commons/footer";

import { paginate } from "../../utils/paginate";

import { log } from "util";
import Pagination from "../commons/pagination";
import DropDownButton from "../commons/drop-down-button";
import DropDownMenuButton from "../commons/drop-down-menu";

class Properties extends Component {
  state = {
    lat: 40.037876,
    lng: -76.305511,
    zoom: 13,
    properties: [],
    currentPage: 1,
    pageSize: 4,
    price: {
      minPrice: 250000,
      maxPrice: 900000
    }
  };

  componentDidMount = () => {
    // get location of current user
    navigator.geolocation.getCurrentPosition(position => {
      let longitude = position.coords.longitude;
      let latitude = position.coords.latitude;
      this.setState({
        lat: latitude,
        lng: longitude
      });
    });

    // get propeties
    axios.get("http://localhost:5000/api/listings/").then(response => {
      this.setState({ properties: response.data });
      this.props.dispatch(getListingsActionCreator(response.data));
    });
  };

  previous = () => {
    const { currentPage } = this.state;
    var prev = currentPage > 1 ? currentPage - 1 : currentPage;
    this.setState({ currentPage: prev });
  };
  next = pageCount => {
    const { currentPage } = this.state;
    var nextPage = currentPage < pageCount ? currentPage + 1 : pageCount;
    this.setState({ currentPage: nextPage });
  };
  handlePageChange = page => {
    this.setState({ currentPage: page });
  };
  handleMinMaxChange = ({ currentTarget }) => {
    const price = { ...this.state.price };
    price[currentTarget.name] = currentTarget.value;
    this.setState({ price });
  };

  render() {
    const paginateListings = paginate(
      this.props.listing,
      this.state.currentPage,
      this.state.pageSize
    );

    return (
      <div className="propertypage-wrapper ">
        <div className="map">
          <Map
            properties={this.state.properties}
            lng={this.state.lng}
            lat={this.state.lat}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>

        <div className=" left">
          <div className="property-search">
            <DropDownButton
              items={[
                { name: "Today", value: "1" },
                { name: "Last 3 Days", value: "3" },
                { name: "Last 7 Days", value: "7" }
              ]}
              dropDownText="Date Posted"
            />

            <DropDownButton
              form={true}
              items={[
                { name: "High", value: "1" },
                { name: "Low", value: "3" }
              ]}
              dropDownText="Price"
            >
              <div className="filtering-price">
                <form>
                  <div className="form-row">
                    <div className="col">
                      <input
                        onChange={this.handleMinMaxChange}
                        type="number"
                        className="form-control"
                        placeholder="min price"
                        name="minPrice"
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        onChange={this.handleMinMaxChange}
                        className="form-control"
                        placeholder="max price"
                        name="maxPrice"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col">
                      <button
                        className="btn btn-block  btn-secondary mt-1"
                        type="submit"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </DropDownButton>
          </div>
          <PropertiesList listings={paginateListings} />

          <div className="container-fluid">
            <div className="row ">
              <div className="col-md-12 pt-3 pl-0">
                <Pagination
                  onPageChange={this.handlePageChange}
                  previous={this.previous}
                  next={this.next}
                  itemsCount={this.props.listing.length}
                  pageSize={this.state.pageSize}
                  currentPage={this.state.currentPage}
                />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  //return state.listing;
  return { listing: state.listing.data };
}

export default connect(mapStateToProps)(Properties);
