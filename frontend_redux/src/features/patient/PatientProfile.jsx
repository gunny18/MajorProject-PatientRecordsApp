import React from "react";
import { useSelector } from "react-redux";
import { getPatient } from "./patientSlice";
import "./PatientProfile.css";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { getAuthState } from "../auth/authSlice";

const PatientProfile = () => {
  const currentPatient = useSelector(getPatient);
  const auth = useSelector(getAuthState);
  const patientList = currentPatient ? (
    <div className="pat_det_back">
      <section className="avtSection">
        <Avatar sx={{ bgcolor: deepOrange[500] }}>
          {currentPatient?.firstName[0]}
        </Avatar>
        <p>{auth?.currentUser?.username}</p>
      </section>
      <h1 className="det_us_name">
        {currentPatient.firstName} {currentPatient.lastName}
      </h1>
      <div className="table_disp">
        <table className="table_disp">
          <tr>
            <td className="det_tab">
              <strong>{currentPatient.patientId}</strong>
              <br />
              Patient ID{" "}
            </td>
            <td className="det_tab">
              <strong>{currentPatient.dob}</strong>
              <br /> DOB
            </td>
            <td className="det_tab">
              <strong>{currentPatient.age} Yrs</strong>
              <br /> Age
            </td>
            <td className="det_tab">
              <strong>{currentPatient.height} cm</strong>
              <br /> Height
            </td>
          </tr>
          <tr>
            <td className="det_tab">
              <strong>{currentPatient.weight} kg</strong>
              <br /> Weight
            </td>
            <td className="det_tab">
              <strong>{currentPatient.bmi} Kg/cm</strong>
              <br /> BMI
            </td>
            <td className="det_tab">
              <strong>{currentPatient.bloodGroup}</strong>
              <br /> Blood Group
            </td>
            <td className="det_tab">
              <strong>{currentPatient.insurance}</strong>
              <br /> Policy No
            </td>
          </tr>
        </table>
      </div>
    </div>
  ) : (
    <p>No patient details exist</p>
  );
  return <div>{patientList}</div>;
};

export default PatientProfile;
