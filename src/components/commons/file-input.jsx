import React from "react";
import PropTypes from "prop-types";

const FileInput = ({ change, name }) => {
  return (
    <div className="form-group mt-5">
      <h2>Upload</h2>
      <p className="small">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic del.
      </p>
      <label for="form-upload">
        <span>
          <i class="fas fa-upload"></i>
        </span>
        <span>Choose Photos</span>
      </label>
      <input
        onChange={change}
        name={name}
        multiple
        type="file"
        className="form-control-file"
        id="form-upload"
      />
    </div>
  );
};

FileInput.propTypes = {
  name: PropTypes.string.isRequired, // name attribute of the input
  change: PropTypes.func.isRequired // onchange function
};

export default FileInput;
