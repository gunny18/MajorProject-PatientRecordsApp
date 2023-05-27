import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import "./Layout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getAuthState, logoutUser } from "../features/auth/authSlice";
import { clearPatient } from "../features/patient/patientSlice";
import {
  getHospitalAuthState,
  logoutHospital,
} from "../features/hospital/hospitalSlice";

const Layout = () => {
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate()

  const auth = useSelector(getAuthState);
  const hospitalAuth = useSelector(getHospitalAuthState);

  const homeLink = pathname !== "/" ? <Link to={"/"}>Home</Link> : null;

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      dispatch(clearPatient());
    } catch (err) {
      console.log("An error occured when logging out user---->", err);
    }
  };

  const handleLogoutHosp = async () => {
    try {
      await dispatch(
        logoutHospital({ hospitalId: hospitalAuth.hospitalId })
      ).unwrap();
      navigate("/hospital")
    } catch (err) {
      console.log("An error occured when logging out hospital user---->", err);
    }
  };

  const logoutButton = auth?.currentUser ? (
    <button onClick={handleLogout}>
      <FontAwesomeIcon icon={faSignOut} />
    </button>
  ) : null;

  const logoutButtonHosp = hospitalAuth?.hospitalId ? (
    <button onClick={handleLogoutHosp}>
      <FontAwesomeIcon icon={faSignOut} />
    </button>
  ) : null;

  return (
    <div className="layout__container">
      {logoutButton}
      {logoutButtonHosp}
      <Outlet />
      {homeLink}
    </div>
  );
};

export default Layout;
