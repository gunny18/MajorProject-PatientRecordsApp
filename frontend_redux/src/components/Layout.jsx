import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./Layout.css";
import { useDispatch, useSelector } from "react-redux";
import { getAuthState, logoutUser } from "../features/auth/authSlice";
import { clearPatient } from "../features/patient/patientSlice";
import st_logo from "./images/logo.png";

const Layout = () => {
  const auth = useSelector(getAuthState);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      dispatch(clearPatient());
    } catch (err) {
      console.log("An error occured when logging out user---->", err);
    }
  };
  const logInOutButton = auth?.currentUser ? (
    <button onClick={handleLogout} className="nav_link_items_btn">
      Logout
    </button>
  ) : (
    <Link className="nav_links_item" to="/login">
      Login
    </Link>
  );

  return (
    <div className="layout">
      <nav className="layout_nav">
        <img src={st_logo} alt="txt" className="st_logo"></img>
        
        {/* <section>{logoutButtonHosp}</section> */}
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
          </Link >
          {logInOutButton}
        </section>
      </nav>
      <div className="layout_container">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
