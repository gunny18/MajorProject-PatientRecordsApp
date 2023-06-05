import React from "react";
import { Link } from "react-router-dom";
import Typed from "react-typed";
import "./HospitalWelcome.css";
import clogo from "./images/logo_white_3.png";

const HospitalWelcome = () => {
  return (
    <div className="app">
      <div className="container">
        <img src={clogo} className="logo_hosp" alt="hosp logo"></img>
        <h1 className="title">Welcome To Hospital Portal</h1>
      </div>
      <div className="animated-typing">
        <Typed
          strings={[
            "Optimize Hospital Workflow.",
            "Manage Patient Records Efficiently.",
            "Authorize The Patients.",
          ]}
          typeSpeed={150}
          backSpeed={100}
          loop
        />
      </div>
      <div className="buttons_hosp">
        <Link className="login_txt" to="/hospital/register">
          <button className="btn-pink">Register</button>
        </Link>

        <Link className="login_txt" to="/hospital/login">
          <button className="btn-purple">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default HospitalWelcome;
