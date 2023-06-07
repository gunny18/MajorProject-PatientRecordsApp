import React from "react";
import { Outlet, Link,  useNavigate } from "react-router-dom";
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
 
  const navigate = useNavigate();

  const auth = useSelector(getAuthState);
  const hospitalAuth = useSelector(getHospitalAuthState);

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
      navigate("/hospital");
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
    <div className="layout">
      <nav className="layout_nav">
        <section>
          {logoutButton}
          {logoutButtonHosp}
        </section>
        <section className="nav_links">
          <Link className="nav_links_item" to="/">
            Home
          </Link>
          <Link className="nav_links_item" to="/about">
            About
          </Link>
          <Link className="nav_links_item" to="/register">
            Register
          </Link>
          <Link className="nav_links_item" to="/hospital">
            Hospital Portal
          </Link>
          <Link className="nav_links_item" to="/dashboard">
            Dashboard
          </Link>
          <Link className="nav_links_item" to="/login">
            Login
          </Link>
        </section>
      </nav>
      <div className="layout_container">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
