import React from "react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getHospitalStatus, registerHospital } from "./hospitalSlice";

const HospitalRegister = () => {
  const userRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [name, setName] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const dispatch = useDispatch();

  const status = useSelector(getHospitalStatus);
  //   let status = "idle";

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const canRegister = [email, pwd].every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        registerHospital({
          hospitalName: name,
          hospitalEmail: email,
          hospitalPassword: pwd,
        })
      ).unwrap();
      setEmail("");
      setPwd("");
      setName("");
    } catch (error) {
      console.log("An error occured when registering user - in component");
      console.log(error);
      setErrMsg(error.message);
    }
  };

  const content =
    status === "success" ? (
      <section>
        <Link to="/hospital/login">Login</Link>
      </section>
    ) : (
      <section>
        <div className={errMsg ? "err" : "hide"}>
          <h1>{errMsg}</h1>
        </div>
        <h1>Register</h1>
        <form className="register__form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Hospital Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              required
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              autoComplete="off"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="pwd">Password</label>
            <input
              type="password"
              name="pwd"
              id="pwd"
              value={pwd}
              required
              onChange={(e) => setPwd(e.target.value)}
            />
          </div>
          <button disabled={!canRegister} className="register__button">
            Sign Up
          </button>
        </form>
      </section>
    );

  return <>{content}</>;
};

export default HospitalRegister;
