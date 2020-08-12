import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
// import $ from "jquery";

import Modal from "react-bootstrap/Modal";

import { connect } from "react-redux";
import "fontawesome/index";
import axios from "axios";
import { getUserListingsCreator } from "../../store/actions/userActionsCreator";
import { getUserActionCreator } from "../../store/actions/userActionsCreator";

import DashboardSidebar from "./dashboardSidebar";
import UserListings from "./userlistings";
import { withRouter } from "react-router-dom";

import UserApi from "../../services/user";

class UserListingsPage extends Component {
  state = {
    isOpen: false,
    listings: [],
    userImage: ""
  };

  componentDidMount = () => {
    const user = JSON.parse(localStorage.getItem("jwt"));
    if (user) {
      this.dashBoardUserListings(user);
    } else {
      this.props.history.push("/login");
    }
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
        toast(result.data.message);
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

  async dashBoardUserListings(user) {
    this.props.dispatch(getUserActionCreator(user));
    const { data } = await UserApi.userDashboard(
      "/users/dashboard/",
      user.user.id
    );
    this.setState({ listings: data });
    this.props.dispatch(getUserListingsCreator(data));
  }

  render() {
    return (
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
                <h4 className="border-bottom p-1">Your Listings</h4>
              </div>
              <div className="row">
                <div className="col-md-8">
                  <UserListings userListings={this.props.user.listings} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal show={this.state.isOpen} onHide={this.state.hideModal}>
          <Modal.Header>
            <Modal.Title>Hi</Modal.Title>
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;

  return {
    user: user
  };
}
export default connect(mapStateToProps)(withRouter(UserListingsPage));
