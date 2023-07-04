import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAuthState } from "../auth/authSlice";
import {
  fetchRecords,
  getPatient,
  getPatientRecords,
  downloadRecord,
} from "./patientSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import './PatientRecords.css'
import nofile from "./images/no_file.png";

const PatientRecords = () => {
  const currentPatient = useSelector(getPatient);
  const patientRecords = useSelector(getPatientRecords);
  const auth = useSelector(getAuthState)

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
        <div className="rec_table" key={record._id}>
          <strong className="rec_name" key={record._id}>{record.filename}</strong>
          <i>
            <p>{record.description}</p>
          </i>
          <button className="download_btn" onClick={(e) => handleDownload(e, record.filename)}>
            {<FontAwesomeIcon icon={faFileDownload} />}Download
          </button>
          <hr/>
        </div>
      ))}
    </ul>
  ) : (
    <div>
    <img className="no_file_img" src={nofile} alt="txt"></img>
    <p className="no_rec_msg">There are no records present!</p>
    </div>
  );
  return (
    <div className="my_rec">
      <h1 className="us_name_id">
        {auth?.currentUser.username}
        <p>{auth?.currentUser?.patientId}</p>
      </h1>
      <div className="rec_list">{patientRecordList}</div>
    </div>
  );
};

export default PatientRecords;
