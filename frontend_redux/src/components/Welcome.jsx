import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div>
      <h1>Welcome!</h1>
      <ul>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to={"/login"}>Login</Link>
        </li>
        <li>
          <Link to={"/dashboard"}>Dashboard</Link>
        </li>
        <li>
          <Link to={"/users"}>Users</Link>
        </li>
        <li>
          <Link to="/hospital">Hospital Portal</Link>
        </li>
      </ul>
    </div>
  );
};

export default Welcome;
