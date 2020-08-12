import React, { Component, Fragment } from "react";

import { Route, Redirect, withRouter, Switch } from "react-router-dom";

// import logo from "./logo.svg";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
//components

import HomePage from "./components/Home";
import Navbar from "./components/commons/navbar";
import Footer from "./components/commons/footer";
import Login from "./components/login/login";
import Register from "./components/login/register";
import DashBoard from "./components/dashboard/dashboard";
import ForgotPassword from "./components/login/fogotPassword";
import Properties from "./components/properties/properties";
import UserSettings from "./components/dashboard/settings";

//utils
import { isLogin } from "./utils/auth";
import { connect } from "react-redux";
import { getUserActionCreator } from "./store/actions/userActionsCreator";
// import LogoutUserActionCreator from "./store/actions/userActionsCreator";
import ViewProperty from "./components/properties/viewproperties";

import axios from "axios";
import CreateProperty from "./components/properties/createProperty";
// import CreateContainer from "./components/properties/createContainer";

import UserListingsPage from "./components/dashboard/DashboardUserlistings";
import EditProperty from "./components/properties/editProperty";
import PropertyPicsUpload from "./components/properties/PropertyPicsUpload";

class App extends Component {
  state = {
    // loggedIn: false
  };
  componentDidMount = () => {
    if (isLogin()) {
      this.setState({ loggedIn: true });
      const user = JSON.parse(localStorage.getItem("jwt"));
      this.props.dispatch(getUserActionCreator(user));
    }
  };
  logout = async e => {
    e.preventDefault();
    this.props.dispatch({ type: "LOG_OUT", payload: {} });
    //remove storage
    localStorage.removeItem("jwt");
    // send logout request to server
    //http://localhost:5000/api/users/logout
    await axios
      .get("http://localhost:5000/api/users/logout")
      .then(response => console.log(response.data));
    this.props.history.push("/");
  };
  render() {
    // const { loggedIn } = this.state;
    return (
      <Fragment>
        <Navbar user={this.props.user} logout={this.logout} />

        <Route exact path="/" component={HomePage} />
        <Route exact path="/properties" component={Properties} />

        <Switch>
          <Route exact path="/properties/:id" component={ViewProperty} />
        </Switch>
        <Route exact path="/add">
          <CreateProperty user={this.props.user.account} />
        </Route>
        <Route exact path="/add-property-pics/:id">
          <PropertyPicsUpload user={this.props.user.account} />
        </Route>

        <Route exact path="/dashboard">
          {!this.props.user.account ? <Redirect to="/login" /> : <DashBoard />}
        </Route>
        <Route exact path="/user/settings">
          <UserSettings />
        </Route>
        <Route exact path="/user/listings">
          <UserListingsPage />
        </Route>
        <Route exact path="/user/listings/edit/:id">
          <EditProperty user={this.props.user.account} />
        </Route>
        <Route exact path="/user/listings/delete/:id">
          <div>Delete</div>
        </Route>
        <Route exact path="/login">
          {this.props.user.account ? <Redirect to="/dashboard" /> : <Login />}
        </Route>
        <Route exact path="/register">
          {this.props.user.account ? (
            <Redirect to="/dashboard" />
          ) : (
            <Register />
          )}
        </Route>

        <Route exact path="/forgot-password" component={ForgotPassword} />
      </Fragment>
    );
  }
}
function mapStateToProps(state) {
  const { user } = state;

  return {
    user: user
  };
}
export default connect(mapStateToProps)(withRouter(App));
