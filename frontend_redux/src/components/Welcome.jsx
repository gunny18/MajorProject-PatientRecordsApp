import { Link } from "react-router-dom";
import "./Welcome.css";
import homeRect from "./images/home_rect.png";
import logoHome from "./images/logo_home.png";
import homeDescRect from "./images/home_desc_rect.png";
import { useDispatch, useSelector } from "react-redux";
import { getAuthState, logoutUser } from "../features/auth/authSlice";
import { clearPatient } from "../features/patient/patientSlice";

const Welcome = () => {
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
      {/* <FontAwesomeIcon icon={faSignOut} /> */}
    </button>
  ) : (
    <Link className="nav_links_item" to="/login">
      Login
    </Link>
  );
  return (
    <div className="welcome">
      <nav className="wlayout_nav">
        <section className="wnav_links">
          <Link className="wnav_links_item" to="/">
            Home
          </Link>
          <Link className="wnav_links_item" to="/about">
            About
          </Link>
          <Link className="wnav_links_item" to="/register">
            Register
          </Link>
          <Link className="wnav_links_item dc" to="/hospital">
            Hospital Portal
          </Link>
          <Link className="wnav_links_item dc" to="/dashboard">
            Dashboard
          </Link>
          {logInOutButton}
        </section>
      </nav>
      <img src={logoHome} alt="home" className="homeLogo" />
      <img src={homeRect} alt="home rect" className="homeRect" />
      <img src={homeDescRect} alt="home desc rect" className="homeDescRect" />
      <div className="homeDescText">
        <h1>Syncrypt Technology</h1>
        <i>
          aids the health organizations streamline its workflow by synchronizing
          patient documents, reports resulting in optimization of hospital
          workflow & provides less cumbersome way of managing patients records.
        </i>
        <br />
      </div>
    </div>
  );
};

export default Welcome;
