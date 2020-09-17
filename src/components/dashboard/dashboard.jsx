import React, { Component } from "react";
import { ToastContainer } from "react-toastify";

import UserListings from "./userlistings";
import Modal from "react-bootstrap/Modal";
import MailIcon from "@material-ui/icons/Mail";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";

import { connect } from "react-redux";
import "fontawesome/index";
import axios from "axios";
import { getUserListingsCreator } from "../../store/actions/userActionsCreator";
import { getUserListingsPieDataCreator } from "../../store/actions/userActionsCreator";

import { getUserActionCreator } from "../../store/actions/userActionsCreator";

// import UserProfilePic from "./userProfilepic";
import DashboardSidebar from "./dashboardSidebar";

import Footer from "../commons/footer";

import { Link } from "react-router-dom";
import { Doughnut, Bar, Line, Pie } from "react-chartjs-2";
import mailbox from "../../images/inbox.svg";
import subscription from "../../images/subscriptions.svg";
import ListingCard from "../commons/card";
const data2019 = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August"
  ],
  datasets: [
    {
      label: "Property Views",
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(10,192,192,0.4)",
      borderColor: "rgba(70,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(79,142,132,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(0,192,192,1)",
      pointHoverBorderColor: "rgba(20,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 5,
      pointBorderColor: "rgba(75,192,192,1)",
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40, 30]
    }
  ]
};
const data2020 = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August"
  ],
  datasets: [
    {
      label: "Property Views",
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(10,192,192,0.4)",
      borderColor: "rgba(70,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(79,142,132,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(0,192,192,1)",
      pointHoverBorderColor: "rgba(20,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 5,
      pointBorderColor: "rgba(75,192,192,1)",
      pointHitRadius: 10,
      data: [35, 29, 190, 181, 206, 155, 140, 230]
    }
  ]
};

class DashBoard extends Component {
  state = {
    isOpen: false,
    listings: [],
    userImage: "",
    lineData: [],
    lineYear: 2019
  };

  constructor(props) {
    super(props);
    this.chartReference = React.createRef();
  }

  componentDidMount = () => {
    const user = JSON.parse(localStorage.getItem("jwt"));
    this.props.dispatch(getUserActionCreator(user));

    axios(`${process.env.REACT_APP_API}` + `/users/dashboard/${user.user.id}`)
      .then(response => {
        this.setState({ listings: response.data });
        this.props.dispatch(getUserListingsCreator(response.data));
        this.props.dispatch(
          getUserListingsPieDataCreator({
            type: "GET_USER_LISTINGS_PIE_DATA"
          })
        );
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  hideModal = () => {
    this.setState({ isOpen: false });
  };
  openModal = () => {
    this.setState({ isOpen: true });
  };
  uploadAvatar = e => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("jwt"));
    const endPoint =
      `${process.env.REACT_APP_API}` + `/users/${user.user.id}/upload`;

    const formData = new FormData();
    formData.append("avatar", this.state.userImage);
    // ajax request
    axios({
      method: "post",
      url: endPoint,
      data: formData
    })
      .then(result => {
        this.setState({ isOpen: false });
        const user = JSON.parse(localStorage.getItem("jwt"));
        user.user.picture = result.data.path;
        //update the key
        localStorage.setItem("jwt", JSON.stringify(user));
        this.props.dispatch(getUserActionCreator(user));
      })
      .catch(e => console.log(e));
  };

  handleOnchange = ({ target }) => {
    this.setState({ userImage: target.files[0] });
  };
  handleOnchangeLineData = ({ target }) => {
    const yearSelected = target.value;

    if (yearSelected === "2019") {
      // make a trip to server and get property views  year 2019
      this.setState({
        lineData: data2019,
        lineYear: yearSelected
      });
    } else {
      this.setState({
        lineData: data2020,
        lineYear: yearSelected
      });
    }
  };

  render() {
    const pieData = this.props.user.pieData && this.props.user.pieData;
    return (
      <React.Fragment>
        <div className="homepage-wrapper">
          <div className="container-fluid">
            <div className="row mt-5 pt-5">
              <div className="col-md-2">
                <DashboardSidebar
                  user={this.props.user.account}
                  openModal={this.openModal}
                />
              </div>
              <div className="col-md-10">
                <ToastContainer></ToastContainer>

                <div>
                  <h4 className="border-top border-bottom p-1">Dashboard</h4>
                </div>
                <div className="row">
                  <div className="col-md-5">
                    <div className="listing" style={{ marginTop: "37px" }}>
                      <div
                        className="card mb-3"
                        style={{ maxWidth: "100%", height: "100%" }}
                      >
                        <div className="row no-gutters">
                          <div className="col-md-12">
                            <div className="card-body">
                              <Pie
                                options={{
                                  maintainAspectRatio: false,
                                  title: {
                                    display: true,

                                    text:
                                      this.props.user.listings &&
                                      this.props.user.listings.length +
                                        ` Listings`
                                  }
                                }}
                                height={null}
                                width={null}
                                data={{
                                  datasets: [
                                    {
                                      data: [
                                        this.props.user.pieData &&
                                          this.props.user.pieData.Published,
                                        this.props.user.pieData &&
                                          this.props.user.pieData.Unpublished,
                                        this.props.user.pieData &&
                                          this.props.user.pieData.Draft
                                      ],
                                      backgroundColor: [
                                        "#dc3545",
                                        "#6c757c",
                                        "#1fbba5"
                                      ]
                                    }
                                  ],

                                  labels: ["Published", "Unpublished", "Draft"]
                                }}
                                legend={{ position: "right", display: true }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-7">
                    <div className="form-row row justify-content-end mb-2">
                      <div className="col-2 float-right ">
                        <select
                          style={{ height: "30px" }}
                          onChange={this.handleOnchangeLineData}
                          className="form-control rounded-0"
                          id="exampleFormControlSelect1"
                        >
                          <option>2018</option>
                          <option selected>2019</option>
                          <option>2020</option>
                        </select>
                      </div>
                    </div>
                    <div className="listing chart">
                      <div
                        className="messages mb-3"
                        style={{
                          position: "relative",
                          width: "100%",
                          border: "solid 1px #eee",
                          height: "auto"
                        }}
                      >
                        {/* display message reuest here */}
                        <Line
                          height={200}
                          width={null}
                          style={{ width: "100%" }}
                          ref={this.chartReference}
                          data={this.state.lineData}
                          options={{
                            showLines: true,
                            maintainAspectRatio: false,
                            title: {
                              display: false,
                              text: "Monthly Property views "
                            },
                            gridLines: {
                              Display: false,
                              color: "rgba(0, 0, 0, 0.1)"
                            },
                            layout: {
                              padding: { top: 0, left: 0, right: 0, bottom: 0 }
                            }
                          }}
                          legend={{ position: "top" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-3 mb-3">
                  <div className="col-md-5">
                    <div className="latest-listing-top border p-1">
                      Latest Listing
                      <span>
                        <i class="fas fa-caret-left fa-2x p-1"></i>
                        <i class="fas fa-caret-right fa-2x p-1"></i>
                      </span>
                    </div>
                    {/* <UserListings userListings={this.props.user.listings} /> */}
                    {this.props.user.listings &&
                      this.props.user.listings
                        .slice(this.props.user.listings.length - 1)
                        .map(listing => (
                          <div className="latest-listing p-1">
                            <div className="latest-listing-img">
                              <img src={listing.photos[0]} />
                            </div>
                          </div>
                        ))}
                  </div>

                  <div className="col-md-3">
                    <div
                      style={{ height: "167px" }}
                      className="card  rounded-0 p-2"
                    >
                      {/* <img
                        style={{
                          width: "60%",
                          height: "60%",
                          margin: "0 auto"
                        }}
                        src={subscription}
                      /> */}

                      <SubscriptionsIcon
                        style={{
                          color: "#6c757d",
                          fontSize: 70,
                          margin: "0  auto 5px"
                        }}
                      />

                      <h4 className="text-center mt-2">Expire in: 20 Days </h4>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div
                      style={{ height: "167px" }}
                      className="card  rounded-0 p-2"
                    >
                      {/* <img
                        style={{
                          width: "60%",
                          height: "60%",
                          margin: "0 auto"
                        }}
                        src={mailbox}
                      /> */}

                      <MailIcon
                        style={{
                          color: "#6c757d",
                          fontSize: 70,
                          margin: "0  auto 5px"
                        }}
                      />

                      <h4 className="text-center">You've Got mail </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal show={this.state.isOpen} onHide={this.state.hideModal}>
            <Modal.Header>
              <Modal.Title>Upload Profile Picture</Modal.Title>
            </Modal.Header>
            <form onSubmit={this.uploadAvatar} enctype="multipart/form-data">
              <Modal.Body>
                <div className="form-group">
                  <label hmlFor="exampleInputEmail1">Upload File</label>
                  <input
                    name="avatar"
                    onChange={this.handleOnchange}
                    type="file"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    Upload a pic
                  </small>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button className="btn btn-warning" onClick={this.hideModal}>
                  Cancel
                </button>
                <button
                  onSubmit={this.uploadAvatar}
                  className="btn btn-primary"
                  type="submit"
                >
                  Save
                </button>
              </Modal.Footer>
            </form>
          </Modal>
          <div className="addBtn">
            <a href="/add" className="btn btn-danger">
              <i class="fas fa-plus"></i>
            </a>
          </div>
        </div>

        <Footer />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;

  return {
    user: user
  };
}
export default connect(mapStateToProps)(DashBoard);
