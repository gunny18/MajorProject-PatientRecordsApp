import { useEffect, useRef, useState } from "react";
import "./Register.css";
import { Link, useSearchParams } from "react-router-dom";
import { getAuthRegisterStatus, registerUser } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const [searchParams] = useSearchParams();
  const uid = searchParams.get("uid");

  const userRef = useRef();

  const [user, setUser] = useState("");
  const [email,setEmail] = useState("")
  const [pwd, setPwd] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const dispatch = useDispatch();

  const status = useSelector(getAuthRegisterStatus);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const canRegister = [user, pwd].every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("UID before dispatch--->", uid);
      await dispatch(registerUser({ user,email, pwd, uid })).unwrap();
      setUser("");
      setPwd("");
    } catch (error) {
      console.log("An error occured when registering user - in component");
      console.log(error);
      setErrMsg(error.message);
    }
  };

  const content =
    status === "success" ? (
      <section>
        <Link to="/login">Login</Link>
      </section>
    ) : (
      <section>
        <div className={errMsg ? "err" : "hide"}>
          <h1>{errMsg}</h1>
        </div>
        <h1>Register</h1>
        <form className="register__form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="user"
              id="username"
              value={user}
              ref={userRef}
              autoComplete="off"
              required
              onChange={(e) => setUser(e.target.value)}
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

export default Register;
