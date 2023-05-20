import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuthState } from "../features/auth/authSlice";
import { Link } from "react-router-dom";
import { getPatient, fetchPatient } from "../features/patient/patientSlice";

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

  const profileLink = currentPatient ? (
    <div>
      <Link to="/dashboard/patient/profile">Go to Patient Profile</Link>
      <br />
      <Link to={`/dashboard/patient/${currentPatient.patientId}/upload`}>
        Upload Record
      </Link>
      <br />
      <Link to={`/dashboard/patient/${currentPatient.patientId}/records`}>
        View Records
      </Link>
    </div>
  ) : null;

  return (
    <div>
      <h1>My Dashboard</h1>
      <ul>
        <li>Username - {currentUser.username}</li>
        <li>PatientId - {currentUser.patient_id}</li>
        <li>UId - {currentUser.uid}</li>
        <li>
          Access Token
          {` ${auth.accessToken[auth.accessToken.length - 3]}${
            auth.accessToken[auth.accessToken.length - 2]
          }${auth.accessToken[auth.accessToken.length - 1]}`}
        </li>
        <Link to="/dashboard/patient/register">
          Please fill the basic details
        </Link>
      </ul>
      {profileLink}
    </div>
  );
};

export default Dashboard;
