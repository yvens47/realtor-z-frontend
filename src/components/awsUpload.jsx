import React, { Component } from "react";
import ReactS3 from "react-s3";
import "bootstrap/dist/css/bootstrap.css";
const config = {
  bucketName: "realtor-zfddbc35f-bd08-4ee5-85e5-1998a1fdf585",
  region: "us-east-1",
  accessKeyId: "AKIAZWTT42QKAENK5TFP",
  secretAccessKey: "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"
};

class AWSUpload extends Component {
  state = {
    file: {}
  };
  upload = () => {
    console.log(this.state.file);

    ReactS3.uploadFile(this.state.file, config)
      .then(data => {})
      .catch(error => console.log(error));
  };
  handleChange = ({ target }) => {
    console.log(target.files[0]);
    this.setState({ file: target.files[0] });
    ReactS3.uploadFile(target.files[0], config)
      .then(data => {})
      .catch(error => console.log(error));
  };
  render() {
    return (
      <div>
        <input onChange={this.handleChange} type="file" name="image" />
        <button onClick={this.upload} className="btn btn-primary">
          Upload
        </button>
      </div>
    );
  }
}
export default AWSUpload;
