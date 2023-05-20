import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import "./Layout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getAuthState, logoutUser } from "../features/auth/authSlice";
import { clearPatient } from "../features/patient/patientSlice";

const Layout = () => {
  const location = useLocation();
  const { pathname } = location;

  const auth = useSelector(getAuthState);

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

  const logoutButton = auth?.currentUser ? (
    <button onClick={handleLogout}>
      <FontAwesomeIcon icon={faSignOut} />
    </button>
  ) : null;

  return (
    <div className="layout__container">
      {logoutButton}
      <Outlet />
      {homeLink}
    </div>
  );
};

export default Layout;
