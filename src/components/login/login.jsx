import React, { Component } from "react";
import "./login.css";
import UserForm from "./UserLogin";
import axios from "axios";
import { withRouter } from "react-router-dom";

import { connect } from "react-redux";
import { getUserActionCreator } from "../../store/actions/userActionsCreator";
// import Footer from "../commons/footer";
import LoginTemplate from "./login-template";

class Login extends Component {
  state = {
    account: { email: "", password: "" },
    error: null,
    loading: false
  };

  login = e => {
    e.preventDefault();
    const endPoint = process.env.REACT_APP_API;
    // ("http://localhost:5000/api/users/login");
    // ajax request
    console.log(endPoint);
    axios({
      method: "post",
      url: endPoint,
      data: this.state.account
    })
      .then(result => {
        // save user details to localstorage;
        this.setState({ loading: true });
        if (typeof window !== "undefined") {
          if (!localStorage.getItem("jwt")) {
            localStorage.setItem("jwt", JSON.stringify(result.data));
            const user = JSON.parse(localStorage.getItem("jwt"));
            this.props.dispatch(getUserActionCreator(user));
            this.props.history.push("/dashboard");
          }
        }
      })
      .catch(e => this.setState({ error: e.response.data }));
  };
  handleChange = ({ target }) => {
    const account = { ...this.state.account };
    account[target.name] = target.value;
    this.setState({ account });
  };
  render() {
    return (
      <React.Fragment>
        <LoginTemplate>
          <div className="col-md-4 m-auto pt-5">
            <h1 className="h3 mb-2 font-weight-normal text-center mb-3">
              Sign in
            </h1>
            {this.state.error && (
              <p className="alert alert-warning">{this.state.error.error}</p>
            )}

            <UserForm
              loading={this.state.loading}
              onLogin={this.login}
              Change={this.handleChange}
            />
          </div>
        </LoginTemplate>
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

export default connect(mapStateToProps)(withRouter(Login));
