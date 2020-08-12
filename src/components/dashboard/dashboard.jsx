import React, { Component } from "react";
import { ToastContainer } from "react-toastify";

import UserListings from "./userlistings";
import Modal from "react-bootstrap/Modal";

import { connect } from "react-redux";
import "fontawesome/index";
import axios from "axios";
import { getUserListingsCreator } from "../../store/actions/userActionsCreator";
import { getUserActionCreator } from "../../store/actions/userActionsCreator";

// import UserProfilePic from "./userProfilepic";
import DashboardSidebar from "./dashboardSidebar";

import Footer from "../commons/footer";

class DashBoard extends Component {
  state = {
    isOpen: false,
    listings: [],
    userImage: ""
  };

  componentDidMount = () => {
    const user = JSON.parse(localStorage.getItem("jwt"));
    this.props.dispatch(getUserActionCreator(user));

    axios(`${process.env.REACT_APP_API}` + `/users/dashboard/${user.user.id}`)
      .then(response => {
        this.setState({ listings: response.data });
        this.props.dispatch(getUserListingsCreator(response.data));
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

  render() {
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
                  <h4 className="border-bottom p-1">Dashboard</h4>
                </div>
                <div className="row">
                  <div className="col-md-8">
                    <div className="listing">
                      <div
                        className="card mb-3"
                        style={{ maxWidth: "100%", height: "100%" }}
                      >
                        <div className="row no-gutters">
                          <div className="col-md-4">
                            <div className="paper">
                              <i className="fas fa-sticky-note fa-2x"></i>
                            </div>
                          </div>
                          <div className="col-md-5">
                            <div className="card-body">
                              <h5 className="card-title">Your Listings</h5>
                              <p className="card-text">
                                <span className="badge badge-secondary border rounded-circle">
                                  (
                                  {this.props.user.listings &&
                                    this.props.user.listings.length}
                                  )
                                </span>
                                Listings Posted
                              </p>
                              <p className="card-text">
                                <small className="text-muted">
                                  Last updated 3 mins ago
                                </small>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="listing chart">
                      <img
                        alt="beatutiful"
                        style={{ width: "100%", height: "100%" }}
                        src="https://www.sageintelligence.com/wp-content/uploads/2019/04/Highlight-Data-Bar-Chart-5.png"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mt-5">
                  <div className="col-md-8">
                    <UserListings userListings={this.props.user.listings} />
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
