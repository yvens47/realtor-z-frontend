import React from "react";

const ImagePreview = ({ files }) => {
  return (
    <div className="previewer">
      <img src={files} alt="preview" />
    </div>
  );
};

export default ImagePreview;
