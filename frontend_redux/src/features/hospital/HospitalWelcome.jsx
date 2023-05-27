import React from "react";
import { Link } from "react-router-dom";

const HospitalWelcome = () => {
  return (
    <div>
      <h1>Welcome to hospital web access Portal</h1>
      <ul>
        <li>
          <Link to="/hospital/register">Register</Link>
        </li>
        <li>
          <Link to="/hospital/login">Login</Link>
        </li>
      </ul>
    </div>
  );
};

export default HospitalWelcome;
