import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
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

  const patientRecordsList =
    patientRecords?.length !== 0 ? (
      <section>
        <ul>
          {patientRecords?.map((record) => (
            <div key={record._id}>
              <li key={record._id}>{record.filename}</li>
              <button onClick={(e) => handleDownload(e, record.filename)}>
                {<FontAwesomeIcon icon={faFileDownload} />}
              </button>
            </div>
          ))}
        </ul>
      </section>
    ) : (
      <p>Patient does not have any records</p>
    );
  return (
    <div>
      <h1>Patient Logs</h1>
      <h3>Patient General Details</h3>
      {patientList}
      <h3>Patient Records</h3>
      {patientRecordsList}
    </div>
  );
};

export default HospitalPatientLogs;
