import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuthState } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import { getPatient, fetchPatient } from "../features/patient/patientSlice";
import "./Dashboard.css";
import view_rec from "./images/view.png";
import pat_doc from "./images/docs.png";
import prof from "./images/profile.png";

const Dashboard = () => {
  const auth = useSelector(getAuthState);
  const currentUser = auth.currentUser;
  const currentPatient = useSelector(getPatient);

  const dispatch = useDispatch();

  const getPatientState = async () => {
    try {
      await dispatch(
        fetchPatient({ patientId: auth?.currentUser?.patientId })
      ).unwrap();
    } catch (error) {
      console.log(error?.message);
    }
  };
  if (currentPatient === null) {
    getPatientState();
  }

  const profLink = currentPatient?.patientId
    ? `/dashboard/patient/${currentPatient.patientId}/records`
    : null;

  return (
    <section>
      <div className="Dashboard">
        <h1 className="wel_txt">Welcome</h1>
        <h2 className="us_name">
          {currentUser.username}
          <br />
        </h2>
        <div className="msg">
          Everything about your profile for{" "}
          <strong className="dif">maintaining </strong> your records & details.{" "}
          <br />
        </div>
        <div className="options">
          <div className="view">
            <img src={view_rec} className="view_img" alt="txt"></img>
            <div className="view_body">
              <h1 className="view_title">Basic Details</h1>
              <p className="view_st">
                Enter basic details like Name, Weigth, Height & Blood Group{" "}
              </p>

              <Link to="/dashboard/patient/register">
                <button className="view_btn">Enter Now</button>
              </Link>
            </div>

            <h3 className="view_remark">Basic Details</h3>
          </div>

          <div className="docs">
            <img src={pat_doc} className="doc_img" alt="txt"></img>
            <div className="docs_body">
              <h1 className="doc_title">Records</h1>
              <p className="doc_st">
                View your previous health reports, documents & bills.
              </p>
              <Link to={profLink}>
                <button className="doc_btn">View Records</button>
              </Link>
            </div>
          </div>

          <div className="profile">
            <img src={prof} className="prof_img" alt="txt"></img>
            <div className="prof_body">
              <h1 className="prof_title">My Profile</h1>
              <p className="prof_st">
                View your health profile with general biometric details.
              </p>
              <Link to="/dashboard/patient/profile">
                <button className="prof_btn">View Profile</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="remark">
          <h3>Basic Details</h3>
          <h3>My Records &nbsp; </h3>
          <h3>My Profile</h3>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
