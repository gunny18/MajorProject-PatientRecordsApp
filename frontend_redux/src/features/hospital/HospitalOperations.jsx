import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getHospitalAuthState, fetchActivePatients } from "./hospitalSlice";
import HospOpsNav from "./HospOpsNav";

const HospitalOperations = () => {
  const hospitalAuth = useSelector(getHospitalAuthState);
  const dispatch = useDispatch();
  const activePatientIds = hospitalAuth?.patientIds;
  const activePatientLinks = activePatientIds
    ? activePatientIds.map((patientId) => (
        <div key={patientId}>
          <h1>Patient - {patientId}</h1>
          <ul>
            <li>
              <Link to={`/hospital/options/patients/${patientId}/logs`}>
                Profile
              </Link>
            </li>
            <li>
              <Link to={`/hospital/options/patients/${patientId}/upload`}>
                Upload
              </Link>
            </li>
          </ul>
        </div>
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
      <HospOpsNav />
      {fetchActivePatientButton}
      <h1>{hospitalAuth?.hospitalName}</h1>
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
