import React from "react";
import { Link, useParams } from "react-router-dom";

const HospitalPatientOptions = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div>
      <h1>HospitalPatientOptions</h1>
      <ul>
        <li>
          <Link to={`/hospital/options/patients/${id}/logs`}>Logs</Link>
        </li>
        <li>
          <Link to={`/hospital/options/patients/${id}/upload`}>Upload</Link>
        </li>
      </ul>
    </div>
  );
};

export default HospitalPatientOptions;
