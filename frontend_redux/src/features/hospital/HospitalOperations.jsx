import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getHospitalAuthState, fetchActivePatients } from "./hospitalSlice";

const HospitalOperations = () => {
  const hospitalAuth = useSelector(getHospitalAuthState);
  const dispatch = useDispatch();
  const activePatientIds = hospitalAuth?.patientIds;
  const activePatientLinks = activePatientIds
    ? activePatientIds.map((patientId) => (
        <li key={patientId}>
          <Link to={`/hospital/options/patients/${patientId}`}>
            Active Patient
          </Link>
        </li>
      ))
    : [];

  const handleFetchActivePatients = async (e) => {
    try {
      e.preventDefault();
      await dispatch(
        fetchActivePatients({ hospitalId: hospitalAuth.hospitalId })
      ).unwrap();
    } catch (error) {
      console.log(error?.message);
    }
  };

  const fetchActivePatientButton = (
    <button onClick={handleFetchActivePatients}>Fetch Patients</button>
  );
  console.log("hospital auth state--->", hospitalAuth);
  return (
    <div>
      {fetchActivePatientButton}
      <h1>Active Patients</h1>
      {activePatientIds?.length !== 0 ? (
        <ul>{activePatientLinks}</ul>
      ) : (
        <h1>No Active Patients</h1>
      )}
    </div>
  );
};

export default HospitalOperations;
