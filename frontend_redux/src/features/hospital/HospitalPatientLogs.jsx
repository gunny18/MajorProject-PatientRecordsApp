import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./HospitalPatientLogs.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPatient,
  getPatient,
  fetchRecords,
  downloadRecord,
  getPatientRecords,
  clearPatient,
} from "../patient/patientSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import HospOpsNav from "./HospOpsNav"

const HospitalPatientLogs = () => {
  const { id: patientId } = useParams();
  const currentPatient = useSelector(getPatient);
  const allPatientRecords = useSelector((state) => getPatientRecords(state));
  const patientRecords = allPatientRecords?.filter(
    (record) => record.metadata.patientId === patientId
  );
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      dispatch(fetchPatient({ patientId })).unwrap();
      dispatch(fetchRecords({ patientId })).unwrap();
    } catch (error) {
      console.log(error.message);
    }
    return () => {
      dispatch(clearPatient());
    };
  }, [dispatch, patientId]);

  const handleDownload = async (e, filename) => {
    try {
      await dispatch(
        downloadRecord({
          patientId: currentPatient.patientId,
          filename,
        })
      ).unwrap();
    } catch (error) {
      console.log(error?.message);
    }
  };
  console.log("patient---->", currentPatient);
  console.log("patient records---->", patientRecords);
  const patientList = currentPatient ? (
    <div className="log_det_back">
      <section className="avtSectionHosp">
        <Avatar sx={{ bgcolor: deepOrange[500] }}>
          {currentPatient?.firstName[0]}
        </Avatar>
        <p>{currentPatient?.firstName}</p>
      </section>
      <h1 className="det_name">
        {currentPatient.firstName} {currentPatient.lastName}
      </h1>
      <div className="table_disp">
        <table className="table_disp">
          <tr>
            <td className="tab">
              <strong>{currentPatient.patientId}</strong>
              <br />
              Patient ID{" "}
            </td>
            <td className="tab">
              <strong>{currentPatient.dob}</strong>
              <br /> DOB
            </td>
            <td className="tab">
              <strong>{currentPatient.age} Yrs</strong>
              <br /> Age
            </td>
            <td className="tab">
              <strong>{currentPatient.height} cm</strong>
              <br /> Height
            </td>
          </tr>
          <tr>
            <td className="tab">
              <strong>{currentPatient.weight} kg</strong>
              <br /> Weight
            </td>
            <td className="tab">
              <strong>{currentPatient.bmi} Kg/cm</strong>
              <br /> BMI
            </td>
            <td className="tab">
              <strong>{currentPatient.bloodGroup}</strong>
              <br /> Blood Group
            </td>
            <td className="tab">
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

  const patientRecordsList =
    patientRecords?.length !== 0 ? (
      <section>
        <ul>
          {patientRecords?.map((record) => (
            <div className="logs_table" key={record._id}>
              <strong className="doc_name" key={record._id}>
                <p>{record.filename}</p>
              </strong>

              <i>
                <p>{record.description}</p>
              </i>

              <button
                className="down_btn"
                onClick={(e) => handleDownload(e, record.filename)}
              >
                {<FontAwesomeIcon icon={faFileDownload} />}&nbsp; Download
              </button>
              <hr />
            </div>
          ))}
        </ul>
      </section>
    ) : (
      <p>Patient does not have any records</p>
    );
  return (
    <section>
      <HospOpsNav/>
      <div className="logs">
        {/* <h1>Patient Logs</h1>
        <h3>Patient General Details</h3> */}
        {patientList}
      </div>
      <div className="pat_log">
        <h3 className="pat_rec_head">PATIENT RECORDS</h3>
        <div className="logs_table_border">{patientRecordsList}</div>
      </div>
    </section>
  );
};

export default HospitalPatientLogs;
