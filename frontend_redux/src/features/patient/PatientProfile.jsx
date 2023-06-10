import React from "react";
import { useSelector } from "react-redux";
import { getPatient } from "./patientSlice";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { getAuthState } from "../auth/authSlice";
import "./PatientProfile.css";

const PatientProfile = () => {
  const currentPatient = useSelector(getPatient);
  const auth = useSelector(getAuthState);
  const patientList = currentPatient ? (
    <div className="patientProfileDetails">
      <h1>Patient Details</h1>
      <ul>
        <li>
          <strong>First Name: </strong>
          {currentPatient.firstName}
        </li>
        <li>
          <strong>Last Name: </strong>
          {currentPatient.lastName}
        </li>
        <li>
          <strong>DOB: </strong>
          {currentPatient.dob}
        </li>
        <li>
          <strong>Gender: </strong>
          {currentPatient.gender}
        </li>
        <li>
          <strong>Age: </strong>
          {currentPatient.age}
        </li>
        <li>
          <strong>Height: </strong>
          {currentPatient.height}
        </li>
        <li>
          <strong>Weight: </strong>
          {currentPatient.weight}
        </li>
        <li>
          <strong>Patient ID: </strong>
          {currentPatient.patientId}
        </li>
        <li>
          <strong>BMI: </strong>
          {currentPatient.bmi}
        </li>
        <li>
          <strong>Blood Group: </strong>
          {currentPatient.bloodGroup}
        </li>
        <li>
          <strong>Insurance Policy No: </strong>
          {currentPatient.insurance}
        </li>
      </ul>
    </div>
  ) : (
    <p>No patient details exist</p>
  );
  return (
    <div className="patientProfile">
      <section className="patientProfileAvatars">
        <Avatar
          className="avtImg"
          sx={{
            bgcolor: deepOrange[500],
            height: "80px",
            width: "80px",
            objectFit: "contain",
            fontSize: "20px",
          }}
        >
          {currentPatient?.firstName[0]}
        </Avatar>
        <h1>{auth?.currentUser?.username}</h1>
        <p>{auth?.currentUser?.email}</p>
      </section>
      {patientList}
    </div>
  );
};

export default PatientProfile;
