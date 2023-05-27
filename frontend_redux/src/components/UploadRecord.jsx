import React from "react";
import { useDispatch } from "react-redux";
import { uploadRecord } from "../features/patient/patientSlice";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UploadRecord = () => {
  const { id: patientId } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [file, setFile] = useState();

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
      await dispatch(uploadRecord({ formData, patientId })).unwrap();
      navigate(`/hospital/options`);
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
