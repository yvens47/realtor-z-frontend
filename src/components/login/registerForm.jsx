import React from "react";
const RegisterForm = props => {
  return (
    <form className="form-signin" onSubmit={props.onSend}>
      <label htmlFor="name" className="sr-only">
        Full Name
      </label>
      <input
        onChange={props.change}
        type="text"
        id="name"
        className="form-control  mb-2 rounded-0"
        placeholder="Full name"
        name="name"
      />
      {props.error.name.length > 0 && (
        <div className="alert alert-danger">{props.error.name}</div>
      )}
      {/* <label htmlFor="Phone" className="sr-only">
        Phone
      </label>
      <input
        onChange={props.change}
        type="text"
        id="Phone"
        className="form-control  mb-2 rounded-0"
        placeholder="Phone number"
        name="phone"
      /> */}
      <label htmlFor="inputEmail" className="sr-only">
        Email address
      </label>
      <input
        onChange={props.change}
        type="email"
        id="inputPassword"
        className="form-control  mb-2 rounded-0"
        placeholder="email"
        required=""
        name="email"
      />
      {props.error.email.length > 0 && (
        <div className="alert alert-danger">{props.error.email}</div>
      )}
      <label htmlFor="inputPassword" className="sr-only">
        Password
      </label>
      <input
        onChange={props.change}
        type="password"
        id="inputPassword"
        className="form-control  mb-2 rounded-0"
        placeholder="Password"
        required=""
        name="password"
      />
      {props.error.password.length > 0 && (
        <div className="alert alert-danger">{props.error.password}</div>
      )}

     
      <button
        className="btn btn-lg btn-secondary btn-block rounded-0"
        type="submit"
      >
        Sign up
      </button>
    </form>
  );
};

export default RegisterForm;
