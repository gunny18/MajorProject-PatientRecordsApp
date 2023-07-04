import React from "react";
import "./HospOpsNav.css";
import { Link, useNavigate } from "react-router-dom";
import { getHospitalAuthState, logoutHospital } from "./hospitalSlice";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";

const HospOpsNav = () => {
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
    <button onClick={handleLogoutHosp} className="hospOpsLogoutBtn">
      <FontAwesomeIcon icon={faSignOut}/>&nbsp;&nbsp;Logout
    </button>
  ) : null;
  return (
    <nav className="hospOpsNav">
      <Link to="/hospital" className="hospOpsNavLinks">
        Home
      </Link>
      {logoutButtonHosp} 
    </nav>
  );
};

export default HospOpsNav;
