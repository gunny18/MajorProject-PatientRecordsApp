import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getHospitalAuthState, fetchActivePatients } from "./hospitalSlice";
import HospOpsNav from "./HospOpsNav";
import "./HospitalOperations.css";
import icon from "./images/refresh_icon.png";


const HospitalOperations = () => {
  const hospitalAuth = useSelector(getHospitalAuthState);
  const dispatch = useDispatch();
  const activePatientIds = hospitalAuth?.patientIds;
  const activePatientLinks = activePatientIds
    ? activePatientIds.map((patientId) => (
        <div className="ops_det" key={patientId}>
          <div className="pat_ops">Patient - {patientId} 
            <div className="btns">
              <Link className="btn-txt" to={`/hospital/options/patients/${patientId}/logs`}>
                <button className="prof-btn">Profile</button>
              </Link>
              
              <Link className="btn-txt" to={`/hospital/options/patients/${patientId}/upload`}>
                <button className="upload-btn">Upload</button>
              </Link>
            </div>
          </div>
              <hr/>
              

              {/* <Link to={`/hospital/options/patients/${patientId}/logs`}>
                Profile
              </Link> */} 
        </div>
      ))
    : [];

  const handleFetchActivePatients = async (e) => {
    try {
      e.preventDefault();
      await dispatch(
        fetchActivePatients({ hospitalId: hospitalAuth.hospitalId })
      ).unwrap();
    } catch (error) {
      console.log(error?.message);
    }
  };

  const fetchActivePatientButton = (
    <button className="refresh-btn" onClick={handleFetchActivePatients}><img className="icon" src={icon} alt="Ax"></img>Refresh</button>
  );
  console.log("hospital auth state--->", hospitalAuth);
  return (
    <section>
    <div>
    <HospOpsNav />
    </div>
    
    <div className="hosp_ops">
    <h1 className="hosp_name">{hospitalAuth?.hospitalName}</h1>
      <div className="ops_window">
      
        
        {/* {fetchActivePatientButton} */}
        
        <div className="cont_bar"><h1 className="active">Active Patients</h1>{fetchActivePatientButton}</div>
        {activePatientIds?.length !== 0 ? (
          <ul>{activePatientLinks}</ul>
        ) : (
          <h1>No Active Patients</h1>
        )}
        
      </div>
      </div>
      </section>
  );
};

export default HospitalOperations;
