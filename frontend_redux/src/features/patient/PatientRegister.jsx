import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatient, registerPatient } from "./patientSlice";
import { getAuthState } from "../auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import error_img from "./images/already_registered.png";
import "./PatientRegister.css";
// import pat_reg_img from './images/pat_reg.jpg'

const PatientRegister = () => {
  const auth = useSelector(getAuthState);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bloodGroup, setBloodGroup] = useState("");
  const [insurance, setInsurance] = useState("");
  const [dob, setDob] = useState("");
  console.log("DOB----->",dob,typeof(dob))
  const dispatch = useDispatch();
  const handleRegisterPatient = async (e) => {
    try {
      const patientDetails = {
        firstName,
        lastName,
        weight,
        height,
        bloodGroup,
        patientId: auth.currentUser.patientId,
        insurance,
        dob
      };
      e.preventDefault();
      await dispatch(registerPatient(patientDetails)).unwrap();
      setFirstName("");
      setLastName("");
      setWeight(0);
      setHeight(0);
      setBloodGroup("");
      setInsurance("");
      setDob("")
      console.log("Successfully registered patient detials");
      navigate("/dashboard/patient/profile");
    } catch (error) {
      const errMsg = JSON.parse(error?.message);
      console.log("In catch block in component", errMsg);
      // console.log(error)
    }
  };

  const getPatient = async () => {
    try {
      console.log("fetching patient details");
      await dispatch(
        fetchPatient({ patientId: auth?.currentUser?.patientId })
      ).unwrap();
    } catch (error) {
      console.log(error?.message);
    }
  };

  if (auth.currentUser.patientDetails === true) {
    getPatient();
  }

  let registerPatientForm =
    auth.currentUser.patientDetails === false ? (
      <div className="Patient_Registration">
        {/* <img src={pat_reg_img} className="pat_reg_back" alt='txt'></img> */}
        <h1>Register Patient Details</h1>
        <div className="form_div">
          <form className="pat_reg_form" onSubmit={handleRegisterPatient}>
            <label htmlFor="firstname">First Name: </label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="lastname">Last Name: </label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor="dob">DOB</label>
            <input
              type="date"
              name="dob"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
            <label htmlFor="weight">Weight(kg): </label>
            <input
              type="number"
              name="weight"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              min={0}
            />
            <label htmlFor="height">Height(cm): </label>
            <input
              type="number"
              name="height"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              min={0}
            />
            <label htmlFor="ins">Insurance(If Any)</label>
            <input
              type="text"
              name="insurance"
              value={insurance}
              onChange={(e) => setInsurance(e.target.value)}
            />
            <label htmlFor="bg">Blood Group: </label>
            <select
              name="bg"
              value={bloodGroup}
              id="bg"
              onChange={(e) => setBloodGroup(e.target.value)}
            >
              <option value="select category">Select category</option>
              <option value="A+">A +ve</option>
              <option value="A-">A -ve</option>
              <option value="O+">O +ve</option>
              <option value="O-">O -ve</option>
              <option value="B+">B +ve</option>
              <option value="B-">B -ve</option>
              <option value="AB+">AB +ve</option>
              <option value="AB-">AB -ve</option>
            </select>

            <button className="pat_reg_btn">Submit Details</button>
          </form>
        </div>
      </div>
    ) : (
      <div className="already_registered_page">
        <img src={error_img} className="imag_error" alt="txt" />
        <h1 className="err_msg">Patient Already Registered!</h1>
        <Link className="link_txt err_btn" to="/dashboard/patient/profile">
          <button>View profile</button>
        </Link>
      </div>
    );
  return registerPatientForm;
};

export default PatientRegister;
