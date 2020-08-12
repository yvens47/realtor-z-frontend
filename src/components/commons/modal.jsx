import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
const CustomModal = props => {
  return (
    <Modal show={props.isOpen} onHide={props.hideModal}>
      <Modal.Header>
        <Modal.Title>Hi</Modal.Title>
      </Modal.Header>
      <form onSubmit={props.uploadAvatar} enctype="multipart/form-data">
        <Modal.Body>
          <div className="form-group">
            <label hmlFor="exampleInputEmail1">Upload File</label>
            <input
              name="avatar"
              onChange={props.handleOnchange}
              type="file"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <small id="emailHelp" className="form-text text-muted">
              Upload a pic
            </small>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-warning" onClick={this.hideModal}>
            Cancel
          </button>
          <button
            onSubmit={this.uploadAvatar}
            className="btn btn-primary"
            type="submit"
          >
            Save
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default CustomModal;
