import { useEffect, useRef, useState } from "react";
import "./Register.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "./authSlice";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let from = location?.state?.from?.pathname || "/";
  if (from === "/dashboard/patient/profile") {
    from = "/dashboard";
  }

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
      await dispatch(loginUser({ user, pwd })).unwrap();
      navigate(from, { replace: true });
    } catch (error) {
      console.log("An error occured when logging in user in component");
      console.log(error);
      setErrMsg(error.message);
    }
  };

  const content = (
    <section>
      <h1 className={errMsg ? "err" : "hide"}>{errMsg}</h1>
      <h1>Sign In</h1>
      <form className="register__form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="email"
            name="username"
            id="username"
            value={user}
            ref={userRef}
            autoComplete="off"
            required
            onChange={(e) => setUser(e.target.value)}
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
          Sign In
        </button>
      </form>
    </section>
  );

  return <>{content}</>;
};

export default Login;
