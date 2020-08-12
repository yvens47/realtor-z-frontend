import React, { Component } from "react";
class UserProfilePic extends Component {
  render() {
    const link = this.props.user
      ? this.props.user.user.picture === ""
        ? "https://beautycraftkitchens.com/wp-content/uploads/2017/02/dummy-user.png"
        : `http://localhost:5000/uploads/${this.props.user.user.picture}`
      : "https://beautycraftkitchens.com/wp-content/uploads/2017/02/dummy-user.png";

    return (
      <div
        style={{
          background: `url(` + `${link}` + `) 0% 0% / cover`
        }}
        className="user-image rounded mb-4 img-fluid"
      >
        <i
          className="fas fa-camera-retro fa-2x"
          data-toggle="modal"
          data-target="#exampleModal"
          onClick={this.props.openModal}
        ></i>
      </div>
    );
  }
}

export default UserProfilePic;
