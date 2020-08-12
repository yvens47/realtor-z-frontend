import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";

import UserListings from "./userlistings";
import Modal from "react-bootstrap/Modal";

import { connect } from "react-redux";
import "fontawesome/index";
import axios from "axios";
import { getUserListingsCreator } from "../../store/actions/userActionsCreator";
import { getUserActionCreator } from "../../store/actions/userActionsCreator";

// import UserProfilePic from "./userProfilepic";
import DashboardSidebar from "./dashboardSidebar";

class DashBoardLayout extends Component {
  state = {
    isOpen: false,
    listings: [],
    userImage: ""
  };

  componentDidMount = () => {
    const user = JSON.parse(localStorage.getItem("jwt"));
    this.props.dispatch(getUserActionCreator(user));

    axios(`http://localhost:5000/api/users/dashboard/${user.user.id}`)
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
    const endPoint = `http://localhost:5000/api/users/${user.user.id}/upload`;

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

  render() {
    return (
      <div className="homepage-wrapper">
        <div className="container-fluid">
          <div className="row mt-5 pt-5">
            <div className="col-md-2">{this.props.sidebar}</div>
            <div className="col-md-10">
              <div>
                <h4 className="border-bottom p-1">{this.props.title}</h4>
              </div>
              <div className="row">
                <div className="col-md-8">{this.props.mainContent}</div>
                <div className="col-md-4">{/* main content-2 */}</div>
              </div>
              <div className="row mt-5">
                <div className="col-md-8">
                  {this.props.children}
                  {/*  main content-3 */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.props.modalProfilePic}
        <div className="addBtn">
          <a href="/add" className="btn btn-danger">
            <i class="fas fa-plus"></i>
          </a>
        </div>
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
export default connect(mapStateToProps)(DashBoardLayout);
