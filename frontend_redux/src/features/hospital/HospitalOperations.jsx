import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getHospitalAuthState } from "./hospitalSlice";

const HospitalOperations = () => {
  const hospitalAuth = useSelector(getHospitalAuthState);
  console.log("hospital auth state--->", hospitalAuth);
  return (
    <div>
      <h1>Functions Available</h1>
      <ul>
        <li>Scan patient logs</li>
        <li>Upload Patient Records</li>
        <li>
          <Link to="/hospital/:id/upload">Upload Record</Link>
        </li>
      </ul>
    </div>
  );
};

export default HospitalOperations;
