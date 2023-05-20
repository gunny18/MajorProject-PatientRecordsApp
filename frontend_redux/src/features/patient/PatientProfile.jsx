import React from "react";
import { useSelector } from "react-redux";
import { getPatient } from "./patientSlice";


const PatientProfile = () => {
  const currentPatient = useSelector(getPatient);
  const patientList = currentPatient ? (
    <div>
      <ul>
        <li>First Name: {currentPatient.firstName}</li>
        <li>Last Name: {currentPatient.lastName}</li>
        <li>Height: {currentPatient.height}</li>
        <li>Weight: {currentPatient.weight}</li>
        <li>Patient ID: {currentPatient.patientId}</li>
        <li>BMI: {currentPatient.bmi}</li>
        <li>Blood Group: {currentPatient.bloodGroup}</li>
      </ul>
    </div>
  ) : (
    <p>No patient details exist</p>
  );
  return (
    <div>
      <h1>Patient Details</h1>
      {patientList}
    </div>
  );
};

export default PatientProfile;
