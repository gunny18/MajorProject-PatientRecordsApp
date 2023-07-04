import React from "react";
import "./HospNav.css";
import { Link, useNavigate } from "react-router-dom";
import { getHospitalAuthState, logoutHospital } from "./hospitalSlice";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

const HospNav = () => {
  const navigate = useNavigate();
  const hospitalAuth = useSelector(getHospitalAuthState);
  const dispatch = useDispatch();
  const handleLogoutHosp = async () => {
    try {
      await dispatch(
        logoutHospital({ hospitalId: hospitalAuth.hospitalId })
      ).unwrap();
      navigate("/hospital");
    } catch (err) {
      console.log("An error occured when logging out hospital user---->", err);
    }
  };
  const logoutButtonHosp = hospitalAuth?.hospitalId ? (
    <button onClick={handleLogoutHosp} className="hospLogoutBtn">
     < FontAwesomeIcon icon={faSignOut} />&nbsp;&nbsp;Logout 
    </button>
  ) : null;
  const optionLink = hospitalAuth?.hospitalId ? (
    <Link to="/hospital/options" className="hospNavLinks">
      Options
    </Link>
  ) : null;
  return (
    <nav className="hospNav">
      {optionLink}
    {logoutButtonHosp}
    </nav>
  );
};

export default HospNav;
