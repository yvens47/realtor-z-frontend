import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
// import $ from "jquery";

import Modal from "react-bootstrap/Modal";

import { connect } from "react-redux";
import "fontawesome/index";
import axios from "axios";
// import { getUserListingsCreator } from "../../store/actions/userActionsCreator";
import { getUserActionCreator } from "../../store/actions/userActionsCreator";
import DashboardSidebar from "./dashboardSidebar";

// services
import UserApi from "../../services/user";
import FileInput from "../commons/file-input";

class UserSettings extends Component {
  state = {
    isOpen: false,
    listings: [],
    userImage: "",
    saveProfile: { name: "", phone: "", company: "" },
    updatePassword: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  };

  componentDidMount = () => {
    //const user = JSON.parse(localStorage.getItem("jwt"));
    //this.props.dispatch(getUserActionCreator(user));
  };

  hideModal = () => {
    this.setState({ isOpen: false, userImage: "" });
  };
  openModal = () => {
    this.setState({ isOpen: true, userImage: "" });
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
        this.setState({ isOpen: false, userImage: "" });
        toast(result.data.message);
        const user = JSON.parse(localStorage.getItem("jwt"));
        user.user.picture = result.data.path;
        //update the key
        localStorage.setItem("jwt", JSON.stringify(user));
        this.props.dispatch(getUserActionCreator(user));
      })
      .catch(e => console.log(e));
  };

  // save profile
  save = e => {
    e.preventDefault();
    // update user document in db
    const data = {
      ...this.state.saveProfile,
      userId: this.props.user.account.user.id
    };

    UserApi.update("/users/update/id", data)
      .then(response => {
        const { success } = response.data;
        if (success) toast("Profile has been updated");
      })
      .catch(error => console.log(error));
  };

  // save user updated password
  saveUpdatePassword = e => {
    e.preventDefault();
    alert("This Feature has not implemented Yet");
  };

  handleOnchange = ({ target }) => {
    const { name, value } = target;

    if (!target.files) {
      if (name === "currentPassword" || name === "newPassword") {
        const updatePassword = { ...this.state.updatePassword };
        updatePassword[name] = value;

        this.setState({ updatePassword });
      } else {
        const saveProfile = { ...this.state.saveProfile };
        saveProfile[name] = target.value;

        this.setState({ saveProfile });
      }
    } else {
      this.setState({ userImage: target.files[0] });
    }
  };

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
                <h4 className="border-bottom p-1">Account settings</h4>
              </div>
              <div className="row">
                <div className="col-md-8">
                  <form onSubmit={this.save}>
                    <div className="form-group">
                      <label for="fullname">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="fullname"
                        placeholder="name"
                        onChange={this.handleOnchange}
                        value={this.state.saveProfile.fullname}
                      />
                    </div>
                    <div className="form-group">
                      <label for="company">Company</label>
                      <input
                        type="text"
                        className="form-control"
                        id="company"
                        name="company"
                        placeholder="Company"
                        onChange={this.handleOnchange}
                        value={this.state.saveProfile.company}
                      />
                    </div>

                    <div class="form-row">
                      <div class="col">
                        <label for="telephone">Telephone</label>
                        <input
                          id="telephone"
                          type="tel"
                          name="phone"
                          class="form-control"
                          placeholder="xxx-xxx-xxxx"
                          onChange={this.handleOnchange}
                          value={this.state.saveProfile.telephone}
                        />
                      </div>
                    </div>
                    <div className="form-row mt-2">
                      <div className="col">
                        <button type="submit" className="btn btn-secondary">
                          Save Profile
                        </button>
                      </div>
                    </div>
                  </form>

                  <h4 className="mt-5 mb-3">Password</h4>

                  <form onSubmit={this.saveUpdatePassword}>
                    <div class="form-group">
                      <label for="cpassword">Current Password</label>
                      <input
                        name="currentPassword"
                        type="text"
                        class="form-control"
                        id="cpassword"
                        placeholder=""
                        onChange={this.handleOnchange}
                        value={this.state.updatePassword.currentPassword}
                      />
                    </div>
                    <div class="form-group">
                      <label for="npassword">New Password</label>
                      <input
                        name="newPassword"
                        type="text"
                        class="form-control"
                        id="npassword"
                        placeholder=""
                        value={this.state.updatePassword.newPassword}
                        onChange={this.handleOnchange}
                      />
                    </div>
                    {/* <div class="form-group">
                      <label for="cfpassword">Confirm New Password</label>
                      <input
                        name="confirmPassword"
                        type="text"
                        class="form-control"
                        id="cfpassword"
                        placeholder=""
                        value={this.state.updatePassword.confirmPassword}
                        onChange={this.handleOnchange}
                      />
                    </div> */}
                    <div class="form-group">
                      <button type="submit" class="btn btn-secondary">
                        Save Password
                      </button>
                    </div>
                  </form>
                </div>{" "}
              </div>
            </div>
          </div>
        </div>
        <Modal show={this.state.isOpen} onHide={this.state.hideModal}>
          <Modal.Header>
            <Modal.Title>Profile Photo</Modal.Title>
          </Modal.Header>
          <form onSubmit={this.uploadAvatar} enctype="multipart/form-data">
            <Modal.Body>
              <FileInput name="images" change={this.handleOnchange} />
            </Modal.Body>
            <Modal.Footer>
              <button
                type="reset"
                className="btn btn-warning"
                onClick={this.hideModal}
              >
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
export default connect(mapStateToProps)(UserSettings);
