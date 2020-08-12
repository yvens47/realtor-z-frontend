import React from "react";

const ImagePreview = ({ files }) => {
  return (
    <div className="previewer">
      <img src={files} />
    </div>
  );
};

export default ImagePreview;
