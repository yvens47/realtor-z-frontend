import React, { Component, Fragment } from "react";
const UserSettingsForm = () => {
  return (
    <Fragment>
      <form onSubmit={saveProfile}>
        <div className="form-group">
          <label for="fullname">Full Name</label>{" "}
          <input
            type="text"
            className="form-control"
            id="fullname"
            placeholder="name"
            value={""}
          />
        </div>
        <div className="form-group">
          <label for="company">Company</label>
          <input
            type="text"
            className="form-control"
            id="company"
            placeholder="Company"
          />
        </div>

        <div class="form-row">
          <div class="col">
            <label for="company">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Email"
            />
          </div>
          <div class="col">
            <label for="telephone">Telephone</label>
            <input
              id="telephone"
              type="tel"
              class="form-control"
              placeholder="xxx-xxx-xxxx"
            />
          </div>
        </div>
        <div className="form-row mt-2">
          <div className="col">
            <button type="submit" className="btn btn-primary">
              Save Profile
            </button>
          </div>
        </div>
      </form>

      <h4 className="mt-5 mb-3">Password</h4>

      <form onSubmit={saveUpdatedPassword}>
        <div class="form-group">
          <label for="cpassword">Current Password</label>
          <input
            type="text"
            class="form-control"
            id="cpassword"
            placeholder=""
          />
        </div>
        <div class="form-group">
          <label for="npassword">New Password</label>
          <input
            type="text"
            class="form-control"
            id="npassword"
            placeholder=""
          />
        </div>
        <div class="form-group">
          <label for="cfpassword">Confirm New Password</label>
          <input
            type="text"
            class="form-control"
            id="cfpassword"
            placeholder=""
          />
        </div>
        <div class="form-group">
          <button type="button" class="btn btn-secondary">
            Save Password
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default UserSettingsForm;
