import React from "react";
//import { Children } from "react";
//import Footer from "../commons/footer";
const LoginTemplate = props => {
  return (
    <>
      <div className="login-wrapper">
        <div className="container-fluid pt-5">
          <div className="row pt-5 pt-5">{props.children}</div>
        </div>
      </div>
    </>
  );
};

export default LoginTemplate;
