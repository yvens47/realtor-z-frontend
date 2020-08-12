import React, { Component } from "react";
import "./login.css";
import RegisterForm from "./registerForm";
import axios from "axios";
import { validateForm } from "../../utils/validation";
import { ToastContainer, toast } from "react-toastify";
import * as EmailValidator from "email-validator";
// import Footer from "../commons/footer";

import LoginTemplate from "./login-template";
import { withRouter } from "react-router-dom";
class Register extends Component {
  state = {
    account: { username: "", email: "", password: "", name: "", phone: "" },
    errors: { email: "", password: "", name: "", phone: "" }
  };

  register = e => {
    e.preventDefault();
    // endpoint
    const endPoint = process.env.REACT_APP_API + "/signup";
    //make sure there is no eeroor;
    if (validateForm(this.state.errors)) {
      axios({
        method: "post",
        url: endPoint,
        data: this.state.account
      })
        .then(response => {
          if (response.data.success) {
            this.setState({
              account: { email: "", password: "", phone: "", name: "" }
            });
            // redirect to login page
            toast("registered succesfully");
            this.props.history.push("/login");
          }
        })
        .catch(error => {
          toast.error("registration failed");

          const errors = { ...this.state.errors };
          errors.email = error.response.data.email;
          errors.name = error.response.data.name;
          errors.password = error.response.data.password;

          this.setState({ errors });
        });
    } else {
      alert("form is invalid");
    }
  };
  handleChange = ({ target }) => {
    const { name, value } = target;
    const _account = { ...this.state.account };
    const _errors = { ...this.state.errors };
    switch (name) {
      case "email":
        _errors.email = EmailValidator.validate(value)
          ? ""
          : "email is not valid";
        break;
      case "password":
        _errors.password = value.length < 8 ? "Password is too short" : "";
        break;
      case "name":
        _errors.name = value === "" ? "Enter full Name" : "";
        break;
      case "phone":
        _errors.phone = value === "" ? "Enter your phone number" : "";
        break;

      default:
        break;
    }
    this.setState({ errors: _errors });

    _account[name] = value;
    _account.username = _account.email.substr(0, _account.email.indexOf("@"));

    this.setState(() => ({
      account: _account
    }));
  };

  render() {
    //const { email, password } = this.state.errors;
    return (
      <LoginTemplate>
        <ToastContainer />
        <div className="col-md-4 m-auto pt-2">
          <h1 className="h3 mb-5 text-center font-weight-normal">Sign up</h1>

          <RegisterForm
            error={this.state.errors}
            onSend={this.register}
            change={this.handleChange}
          />
        </div>
      </LoginTemplate>
    );
  }
}

export default withRouter(Register);
