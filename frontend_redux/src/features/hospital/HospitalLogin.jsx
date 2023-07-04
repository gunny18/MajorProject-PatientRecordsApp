import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginHospital } from "./hospitalSlice";
import "./HospitalLogin.css";
import hospRectImg from "./images/hosp_port_he.png"
import hospPortImg from "./images/hosp_port_img.png"
import logo from "./images/logo.png"

const HospitalLogin = () => {
  const navigate = useNavigate();
  
  const userRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const canRegister = [user, pwd].every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        loginHospital({ hospitalEmail: user, hospitalPassword: pwd })
      ).unwrap();
      navigate("/hospital/options", { replace: true });
    } catch (error) {
      console.log("An error occured when logging in user in component");
      console.log(error);
      setErrMsg(error.message);
    }
  };

  const content = (
    <section className="hosp_login_form_container">
      <div className={errMsg ? "err" : "hide"}>{errMsg}
        <h1>Sign In</h1>
      </div>
      <form className="hosp_login_form" onSubmit={handleSubmit}>
        <img src={logo} className="logo" alt="logo" />
        <h1>Enter Credentials</h1>
        <div>
          {/* <label htmlFor="username">Username</label> */}
          <input
            type="email"
            name="username"
            id="username"
            placeholder="Username"
            value={user}
            ref={userRef}
            autoComplete="off"
            required
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div>
          {/* <label htmlFor="pwd">Password</label> */}
          <input
            type="password"
            name="pwd"
            id="pwd"
            placeholder="Password"
            value={pwd}
            required
            onChange={(e) => setPwd(e.target.value)}
          />
        </div>
        <button disabled={!canRegister} className="hosp_login_button">
          Sign In
        </button>
        <label>Forgot Password?</label>
      </form>
    </section>
  );

  return (
   <div className="hosplogin">
     {content}
     <img className="hospImg" src={hospRectImg} alt="hosp_port_head" />
     <section className="hosp_login_heading">
       <h1>Hospital</h1>
       <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login</h1>
     </section>
     <img src={hospPortImg} alt="hosp back" className="hospPortImg"/>
   </div>
  );
};

export default HospitalLogin;
