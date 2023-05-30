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
      await dispatch(
        uploadRecord({ formData, patientId,description })
      ).unwrap();
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
        <label htmlFor="desc">Description</label>
        <br />
        <textarea
          name="description"
          id="desc"
          cols="30"
          rows="10"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button disabled={!canUpload}>Upload</button>
      </form>
    </div>
  );
};

export default UploadRecord;
