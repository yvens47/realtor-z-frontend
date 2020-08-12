import React, { Component } from "react";
import SlideShow from "../commons/slideshow";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


import ScrollableTabsButtonForce from "../commons/Tab";
import Footer from "../commons/footer";
import axios from "axios";
import Map from "../commons/map";
import { render } from "timeago.js";
import NumberFormat from "react-number-format";
import { Link, Redirect } from "react-router-dom";
class ViewProperty extends Component {
  state = {
    property: {},
    similar: [],
    notfound: false
  };
  componentDidMount = () => {
    const { id } = this.props.match.params;
    axios
      .get(`http://localhost:5000/api/listings/${id}`)
      .then(response => {
        if (response.data.error) {
          this.setState({
            notfound: response.data.error
          });
        } else {
          console.log(response.data);
          this.setState({
            property: response.data.data,
            similar: response.data.similar
          });
        }
      })
      .catch(e => console.log(e));
  };

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 3,
      arrows:true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 575.98,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    if (this.state.notfound) {
      return <Redirect to="/properties" />;
    }
    const { property } = this.state.property ? this.state : {};
  
    return (
      <div className="homepage-wrapper mb-3" style={{background:"#f0f1f0"}}>
        <div className="container">
          <div className="row pt-5">
            <div className="col-md-8 pt-3">
              <div className="property-image-wrapper border p-1">
                <SlideShow photos={this.state.property.photos} />
                {/* {property && property.photos[0]} */}
              </div>
              <div className="details">
                <div className="row mt-3 mb-3">
                  <div className="col-md-6 ">
                    <h1>
                      <NumberFormat
                        value={property.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                        renderText={value => <div>{value}</div>}
                      />
                    </h1>
                    <div className="bed-bath">
                      <span className="p-1">
                        <i className="fas fa-bed pr-1" aria-hidden="true"></i>
                        {property.bedrooms}
                      </span>
                      <span className="p-1">
                        {" "}
                        <i className="fas fa-bath pr-1" aria-hidden="true"></i>
                        {property.bathrooms}ba
                      </span>
                      {/* <p>Listing Agent : Jean Pierre</p> */}
                    </div>

                    <h1 className="address">
                      {this.state.property.address &&
                        this.state.property.address.street}

                      <span className="street">
                        {this.state.property.address &&
                          this.state.property.address.city}
                        ,
                        {this.state.property.address &&
                          this.state.property.address.state}
                        {this.state.property.address &&
                          " " + this.state.property.address.zip}
                      </span>
                    </h1>
                  </div>
                  <div className="col-md-6"></div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <h2>Description</h2>
                    <hr />
                    <p>{property.about}</p>
                  </div>
                </div>
                <h2>Other Property you might like</h2>
                <div className="similar-property">
                   <Slider {...settings}>
                   
                  {this.state.similar.map(property => (
                   <>
                  

                   <div class="listing-card">
                       <div class="listing-card-image">
                        <img
                          src={`http://localhost:5000/uploads/${property.photos &&
                            property.photos[0]}`}
                          class="card-img-top"
                          alt="..."
                        />
                      </div>
                      <div class="listing-card-details">
                        <p class="card-text">{`${property.address.street},  ${property.address.city} ${property.address.state}`}</p>
                        <h5 class="card-title">
                        <NumberFormat
                        value={property.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                        renderText={value => <div>{value}</div>}
                      />
                        
                       </h5>
                        <a
                          href={`/properties/${property._id}`}
                          class="btn btn-secondary"
                        >
                          View
                        </a>
                      </div>
                    </div>
                    </>
                  
                   
                  ))}
                   </Slider>
                </div>
              </div>
            </div>
            <div className="col-md-4 pt-3">
              {/* tabed componet  */}

              <ScrollableTabsButtonForce />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default ViewProperty;
