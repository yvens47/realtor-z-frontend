import React from "react";
import { Link } from "react-router-dom";
const DropDownMenuButton = props => {
  return (
    <div className="dropdown-menu">
      {props.children
        ? props.children
        : props.items.map(item => (
            <Link to={item.value} className="dropdown-item">
              {item.name}
            </Link>
          ))}
    </div>
  );
};

export default DropDownMenuButton;
