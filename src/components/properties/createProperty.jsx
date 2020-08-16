import React, { Component } from "react";

import axios from "axios";
import { withRouter, Link } from "react-router-dom";

// import { getUserActionCreator } from "../../store/actions/userActionsCreator";

class CreateProperty extends Component {
  state = {
    property: {
      street: "",
      address_two: "",
      city: "",
      state: "",
      zip: "",
      price: "",
      bed: "",
      bath: "",
      about: ""
    },
    errors: {
      street: "",
      address_two: "",
      city: "",
      state: "",
      zip: "",
      price: "",
      bed: "",
      bath: "",
      about: ""
    }
  };

  handleCreate = e => {
    e.preventDefault();
    const { name, email, phone, id } = this.props.user.user;
    const {
      street,
      city,
      state,
      zip,
      price,
      bed,
      bath,
      about
    } = this.state.property;
    const data = {
      address: { street, city, state, zip },
      price,
      bedrooms: bed,
      bathrooms: bath,
      about,
      agent: { name: name, email: email, phone },
      userid: id
    };

    // axios request
    axios
      .post(`${process.env.REACT_APP_API}` + "/listings/create", data)
      .then(response => {
        if (response.data.success) {
          this.props.history.push("/dashboard");
        }
      })
      .catch(error => console.log(error));
  };

  handleChange = ({ target }) => {
    const property = { ...this.state.property };
    property[target.name] = target.value;
    this.setState({ property });
  };
  render() {
    return (
      <React.Fragment>
        <div className="login-wrapper">
          <div className="container-fluid pt-5">
            <div className="row pt-5 pt-5">
              {!this.props.user && (
                <div className="col-md-5 m-auto pt-3">
                  <h1 className="danger">oops</h1>
                  <h2>You must log in to add a Property</h2>
                  <p>Let's log you in first</p>
                  <p>
                    <Link className="btn btn-primary" to="/login">
                      Login
                    </Link>
                  </p>
                </div>
              )}
              {this.props.user && (
                <div className="col-md-5 m-auto pt-3">
                  <h1 className="h3 mb-2 font-weight-normal">Add a Listing</h1>
                  <hr />
                  <form onSubmit={this.handleCreate}>
                    <div class="form-row mb-3">
                      <div class="col">
                        <label for="inputEmail4">Address</label>
                        <input
                          onChange={this.handleChange}
                          type="text"
                          class="form-control"
                          placeholder="Street"
                          value={this.state.property.street}
                          name="street"
                        />
                      </div>
                    </div>
                    <div class="form-row mb-3">
                      <div class="col">
                        <label for="inputEmail4">Address 2</label>
                        <input
                          onChange={this.handleChange}
                          value={this.state.property.address_two}
                          name="address_two"
                          type="text"
                          class="form-control"
                          placeholder="Apartment, studio, or floor"
                        />
                      </div>
                    </div>
                    <div class="form-row mb-3">
                      <div class="col">
                        <label for="inputEmail4">City</label>
                        <input
                          onChange={this.handleChange}
                          value={this.state.property.city}
                          type="text"
                          class="form-control"
                          placeholder="City"
                          name="city"
                        />
                      </div>
                      <div class="col">
                        <label for="inputEmail4">State</label>
                        <input
                          onChange={this.handleChange}
                          type="text"
                          class="form-control"
                          placeholder="State"
                          value={this.state.property.state}
                          name="state"
                        />
                      </div>
                      <div class="col">
                        <label for="inputEmail4">Zip</label>
                        <input
                          onChange={this.handleChange}
                          type="text"
                          class="form-control"
                          placeholder="Zip"
                          value={this.state.property.zip}
                          name="zip"
                        />
                      </div>
                    </div>
                    <div class="form-row mb-3">
                      <div class="col">
                        <label for="inputAddress">Price</label>
                        <input
                          onChange={this.handleChange}
                          value={this.state.property.price}
                          name="price"
                          class="form-control"
                          id="exampleFormControlTextarea1"
                          placeholder="price"
                        />
                      </div>
                    </div>

                    <div class="form-row mb-3">
                      <div class="col">
                        <label for="inputAddress">Bed</label>
                        <input
                          onChange={this.handleChange}
                          type="text"
                          class="form-control"
                          placeholder="Bed"
                          value={this.state.property.bed}
                          name="bed"
                        />
                      </div>
                      <div class="col">
                        <label for="inputAddress">Bath</label>
                        <input
                          onChange={this.handleChange}
                          type="text"
                          class="form-control"
                          placeholder="bath"
                          value={this.state.property.bath}
                          name="bath"
                        />
                      </div>
                    </div>

                    <div class="form-row mb-3">
                      <div class="col">
                        <label for="inputAddress">About this property</label>
                        <textarea
                          onChange={this.handleChange}
                          value={this.state.property.about}
                          name="about"
                          class="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                        ></textarea>
                      </div>
                    </div>

                    <div class="form-row mb-2">
                      <button
                        type="submit"
                        class="form-control btn btn-primary"
                        placeholder="price"
                      >
                        Create
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
        )
      </React.Fragment>
    );
  }
}

export default withRouter(CreateProperty);
