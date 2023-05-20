import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPatient,
  getPatient,
  uploadRecord,
} from "../features/patient/patientSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthState } from "../features/auth/authSlice";

const UploadRecord = () => {
  const auth = useSelector(getAuthState);
  const currentPatient = useSelector(getPatient);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [file, setFile] = useState();

  const getPatientState = async () => {
    try {
      await dispatch(
        fetchPatient({ patientId: auth?.currentUser?.patientId })
      ).unwrap();
    } catch (error) {
      console.log(error?.message);
    }
  };

  if (currentPatient === null) {
    getPatientState();
  }

  console.log("Current Patient---->", currentPatient);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  console.log("File----->", file);

  const handleUploadRecord = async (e) => {
    e.preventDefault();
    try {
      console.log("In upload file try block");
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);
      await dispatch(
        uploadRecord({ formData, patientId: currentPatient.patientId })
      ).unwrap();
      navigate("/dashboard/patient/profile");
    } catch (err) {
      console.log("Error in upload record component---->", err?.message);
    }
  };

  const canUpload = [file].every(Boolean);

  return (
    <div>
      <h1>Upload a record</h1>
      <form onSubmit={handleUploadRecord}>
        <input type="file" name="file" onChange={handleFileChange} />
        <p>{file && `${file.name} - ${file.type}`}</p>
        <button disabled={!canUpload}>Upload</button>
      </form>
    </div>
  );
};

export default UploadRecord;
