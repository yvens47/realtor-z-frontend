import React, { Fragment, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import GoogleMapReact from "google-map-react";

import "./home.css";
import "fontawesome/index";
import { Link } from "react-router-dom";
import ListingCard from "../commons/card";
import Footer from "../commons/footer";
import homebuy from "../../images/buy_house.svg";
import list from "../../images/list.svg";
import contact from "../../images/contact.svg";

const HomePage = () => {
  useEffect(() => {
    document.title = "Find A new Home - Realtor-z";
  });
  return (
    <Fragment>
      <div className="homepage-wrapper">
        <div className="banner pt-5 pb-5">
          <div className="overlay">
            <div className="banner-title">
              <h1>
                <span>F</span>ind A Home
              </h1>
              <div className="search-listing mt-4">
                <form>
                  <div class="form-row">
                    <div class="col">
                      <input
                        type="text"
                        class="form-control rounded-0 "
                        placeholder="Manheim,PA"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row display-row pt-5 pb-5">
            <div className="col-md-4 pb-5 pt-3 ">
              <img
                src={homebuy}
                alt=""
                width="70%"
                style={{
                  display: "block",
                  margin: "0 auto 30px"
                }}
              />
              <p className=" title text-center">See a Home you like</p>
              <p className="text-center border-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
                onsectetur adipisicing
              </p>
            </div>

            <div className="col-md-4 pb-5 pt-3 ">
              <img
                src={list}
                alt=""
                width="37%"
                style={{
                  display: "block",
                  margin: "0 auto 30px"
                }}
              />
              <p className=" title text-center">View Home</p>
              <p className="text-center border-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
                onsectetur adipisicing
              </p>
            </div>

            <div className="col-md-4 pb-5 pt-3 ">
              <img
                src={contact}
                alt=""
                width="62%"
                style={{
                  display: "block",
                  margin: "0 auto 30px"
                }}
              />
              <p className="text-center title">Contact Agent</p>
              <p className="text-center border-1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit
                onsectetur adipisicing
              </p>
            </div>
          </div>

          <div className="row display-row-3 pb-3 justify-content-md-center">
            <div className="col-md-8 m-auto  pt-5 pb-5">
              <h5 className="text-center">
                <i
                  style={{ color: "#2678c5", fontSize: "30px" }}
                  className="fas fa-swatchbook pr-1"
                ></i>
                consectetur
              </h5>
              <h1 className="text-center">Lorem ipsum, dolor</h1>
              <p className="text-center pt-3 pb-2">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Asperiores, magnam eius quia perferendis consectetur quidem.
              </p>
              <hr />
              <div className="listing-cards">
                <ListingCard
                  listing={{ address: "400 S Main st, Manheim, PA 17545" }}
                  image="https://images.pexels.com/photos/3214064/pexels-photo-3214064.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                />
                <ListingCard
                  listing={{ address: "676 W Walnut st, Manheim, PA 17545" }}
                  image="https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                />
              </div>

              <div className="row mt-3"></div>
            </div>
          </div>

          <div className="row display-row-2">
            <div style={{ background: "#2fbba4" }} className="col-md-6 p-5">
              <div className="p-5">
                <h1>
                  <span>Lorem </span>ipsum
                </h1>

                <h5 className="text-justify mt-3">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Culpa aliquid porro Lorem ipsum dolor sit amet consectetur
                  adipisicing elit.
                </h5>
              </div>
            </div>
            <div className="col-md-6 p-0">
              <div className="img-wrapper">
                <img
                  src="https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt=" profile"
                />
              </div>
            </div>
          </div>
          <div className="row pt-5 pb-5">
            <div className="col-md-6 m-auto pt-5 pb-5">
              <h1 className="row-title">
                "Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis error veritatis aperiam at perferendis"
              </h1>

              <p className="text-center">
                <footer class="blockquote-footer">
                  lorem Y. Isum
                  <cite title="Source Title">Source Title</cite>
                </footer>
              </p>
              <p className="text-center">
                <Link
                  className="btn btn-lg btn-info mt-3 btn-color"
                  to="/register"
                >
                  Join
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
};

export default HomePage;
