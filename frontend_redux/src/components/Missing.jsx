import React from "react";
import page from "./images/pgNot_found.png";
import "./Missing.css";

const Missing = () => {
  return (
    <div>
      <img src={page} alt="txt" className="page_not_found"></img>
      {/* <h1>Page Not Found!</h1>
      <p>The requested page des not exist.</p> */}
    </div>
  );
};

export default Missing;
