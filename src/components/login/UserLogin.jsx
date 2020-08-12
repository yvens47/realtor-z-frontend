import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
const UserForm = props => {
  return (
    <form className="form-signin" onSubmit={props.onLogin}>
      <label htmlFor="inputEmail" className="sr-only">
        Email address
      </label>
      <input
        onChange={props.Change}
        name="email"
        type="email"
        id="inputEmail"
        className="form-control mb-2 rounded-0"
        placeholder="Email address"
        required=""
        autoFocus=""
        value={props.email}
      />
      <label htmlFor="inputPassword" className="sr-only">
        Password
      </label>
      <input
        onChange={props.Change}
        type="password"
        id="inputPassword"
        className="form-control  mb-2 rounded-0"
        placeholder="Password"
        required=""
        name="password"
        value={props.password}
      />
      <div className="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
        <span className="float-right">
          <a href="/forgot-password" className="btn-link">
            Forgot Password
          </a>
        </span>
      </div>
      <button
        className="btn btn-lg btn-secondary rounded-0 btn-block"
        type="submit"
      >
        {props.loading && <CircularProgress color="secondary" />} Sign in
      </button>
    </form>
  );
};

export default UserForm;
