import React from "react";
import DropDownMenuButton from "./drop-down-menu";
const DropDownButton = props => {
  return (
    <div className="btn-group mr-1">
      <button
        type="button"
        className="btn btn-secondary dropdown-toggle"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {props.dropDownText}
      </button>
      {props.form ? (
        <DropDownMenuButton items={props.items}>
          {props.children}
        </DropDownMenuButton>
      ) : (
        <DropDownMenuButton items={props.items}></DropDownMenuButton>
      )}
    </div>
  );
};

export default DropDownButton;
