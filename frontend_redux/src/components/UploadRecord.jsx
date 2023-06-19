import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { uploadRecord } from "../features/patient/patientSlice";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./UploadRecord.css";
import { getPatient, fetchPatient } from "../features/patient/patientSlice";
import { useSelector } from "react-redux";
import HospOpsNav from "../features/hospital/HospOpsNav";

const UploadRecord = () => {
  const { id: patientId } = useParams();

  const [showUploaded, setShowUploaded] = useState(false);

  const currentPatient = useSelector(getPatient);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    try {
      dispatch(fetchPatient({ patientId })).unwrap();
    } catch (error) {
      console.log(error.message);
    }
  }, [dispatch, patientId]);

  const [file, setFile] = useState();

  const [description, setDescription] = useState("");

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
      formData.append("description", description);
      await dispatch(uploadRecord({ formData, patientId })).unwrap();
      setShowUploaded(true);
      setTimeout(() => {
        setShowUploaded(false)
        navigate(`/hospital/options`);
      }, 2000);
      // navigate(`/hospital/options`);
    } catch (err) {
      console.log("Error in upload record component---->", err?.message);
    }
  };

  const canUpload = [file].every(Boolean);

  console.log(currentPatient);

  return (
    <div className="up_back">
      <HospOpsNav />
      {showUploaded && <p className="uploadedElement">Uploaded Record, Redirecting to options page....</p>}
      <div>
        <h1 className="nameDets">
          {currentPatient?.firstName} {currentPatient?.patientId}
        </h1>
        <form className="upload_form" onSubmit={handleUploadRecord}>
          <input
            className="choose_file"
            type="file"
            name="file"
            onChange={handleFileChange}
          />
          <p>{file && `${file.name} - ${file.type}`}</p>
          <label className="desc_head" htmlFor="desc">
            Description
          </label>
          <br />
          <textarea
            className="des_txt_area"
            name="description"
            id="desc"
            cols="30"
            rows="10"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <button className="upload_btn" disabled={!canUpload}>
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadRecord;
