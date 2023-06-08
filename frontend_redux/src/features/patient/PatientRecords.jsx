import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { getAuthState } from "../auth/authSlice";
import {
  // fetchPatient,
  fetchRecords,
  getPatient,
  getPatientRecords,
  downloadRecord,
} from "./patientSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";

const PatientRecords = () => {
  const currentPatient = useSelector(getPatient);
  const patientRecords = useSelector(getPatientRecords);

  const dispatch = useDispatch();

  useEffect(() => {
    const getRecords = async () => {
      try {
        await dispatch(
          fetchRecords({ patientId: currentPatient.patientId })
        ).unwrap();
      } catch (error) {
        console.log(error?.message);
      }
    };
    getRecords();
  }, [currentPatient, dispatch]);

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

  const patientRecordList = patientRecords ? (
    <ul>
      {patientRecords.map((record) => (
        <div key={record._id}>
          <li key={record._id}>{record.filename}</li>
          <i>
            <p>{record.description}</p>
          </i>
          <button onClick={(e) => handleDownload(e, record.filename)}>
            {<FontAwesomeIcon icon={faFileDownload} />}
          </button>
        </div>
      ))}
    </ul>
  ) : (
    <p>Patient does not have any records</p>
  );
  return (
    <div>
      <h1>Patient Records</h1>
      {patientRecordList}
    </div>
  );
};

export default PatientRecords;
