import React, { Component } from "react";

import axios from "axios";
// import { render } from "timeago.js";
import { Redirect, withRouter } from "react-router-dom";
import ImagePreview from "./imagePreview";
import { ProgressBar } from "react-bootstrap";
import { toast } from "react-toastify";

class PropertyPicsUpload extends Component {
  state = {
    files: [],
    images: [],
    progress: 0
  };

  handleUploadPics = e => {
    e.preventDefault();
    const { id } = this.props.match.params;
    const formData = new FormData();
    const files = this.state.images[0];
    if (files) {
      // loop over files upload and append to form data to upload
      for (let i = 0; i < files.length; i++) {
        formData.append(`images`, files[i]);
      }
      // ajax request
      axios({
        method: "post",
        url: `http://localhost:5000/api/listings/upload/${id}`,
        data: formData,
        onUploadProgress: progressEvent => {
          const { loaded, total } = progressEvent;
          const percent = Math.floor((loaded * 100) / total);
          this.setState({ progress: percent });
          if (this.state.progress === 100) {
            setTimeout(() => {
              this.setState({ progress: 0 });
            }, 4000);
          }
        }
      })
        .then(result => {
          console.log(result);
          if (result.data.status === 200) {
            // redirect to dashboard
            this.props.history.push("/dashboard");
          }
        })
        .catch(e => console.log(e));
    } else {
      toast("you must choose a photo");
    }
  };

  handleOnchange = ({ target }) => {
    const list = [...this.state.files];
    for (const file of target.files) {
      list.push(file);
    }
    // update states
    this.setState({
      files: list,
      images: [...this.state.images, target.files]
    });
  };

  render() {
    if (this.state.notfound) {
      return <Redirect to="/properties" />;
    }
    // const { property } = this.state.property ? this.state : {};
    return (
      <div className="homepage-wrapper">
        <div className="container">
          <div className="row pt-5 mt-5">
            <div className="col-md-8 pt-3 m-auto">
              <form
                className="upload-it"
                onSubmit={this.handleUploadPics}
                enctype="multipart/form-data"
              >
                <div className="form-group mt-5">
                  <h2>Upload</h2>
                  <p className="small">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Hic del.
                  </p>
                  <label for="form-upload">
                    <span>
                      <i class="fas fa-upload"></i>
                    </span>
                    <span>Choose Photos</span>
                  </label>
                  <input
                    onChange={this.handleOnchange}
                    name="images"
                    multiple
                    type="file"
                    className="form-control-file"
                    id="form-upload"
                  />
                  {this.state.progress !== 0 && (
                    <ProgressBar
                      now={this.state.progress}
                      label={`${this.state.progress}%`}
                    />
                  )}
                </div>
                <div className="previewPhotos">
                  {this.state.files[0] &&
                    this.state.files[0].length !== 0 &&
                    this.state.files.length + " Selected"}

                  {/* preiweing all images user wants to upload to server */}
                  {this.state.files.map(file => (
                    <div className="container">
                      <div className="row">
                        <div className="col-md-4">
                          <ImagePreview files={URL.createObjectURL(file)} />
                        </div>
                        <div className="col-md-4">{file.name}</div>
                      </div>
                    </div>
                  ))}
                  {/* preiweing ends here */}
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    className="btn btn-primary btn-block"
                    value="Upload"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PropertyPicsUpload);
