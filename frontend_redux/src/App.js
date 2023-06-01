import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Welcome from "./components/Welcome";
import Missing from "./components/Missing";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Dashboard from "./components/Dashboard";
import RequireAuth from "./features/auth/RequireAuth";
import Users from "./features/users/Users";
import PatientRegister from "./features/patient/PatientRegister";
import PatientProfile from "./features/patient/PatientProfile";
import UploadRecord from "./components/UploadRecord";
import PatientRecords from "./features/patient/PatientRecords";
import HospitalRegister from "./features/hospital/HospitalRegister";
import HospitalWelcome from "./features/hospital/HospitalWelcome";
import HospitalLogin from "./features/hospital/HospitalLogin";
import HospitalOperations from "./features/hospital/HospitalOperations";
import HospitalPatientOptions from "./features/hospital/HospitalPatientOptions";
import HospitalPatientLogs from "./features/hospital/HospitalPatientLogs";
import RequireHospitalAuth from "./features/hospital/RequireHospitalAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public */}
        <Route index element={<Welcome />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        {/* protected */}
        <Route element={<RequireAuth />}>
          <Route path="dashboard">
            <Route index element={<Dashboard />} />
            <Route path="patient">
              <Route path="register" element={<PatientRegister />} />
              <Route path="profile" element={<PatientProfile />} />
              <Route path=":id/records" element={<PatientRecords />} />
            </Route>
          </Route>
          <Route path="users" element={<Users />} />
        </Route>
        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
      <Route path="hospital">
        <Route index element={<HospitalWelcome />} />
        <Route path="register" element={<HospitalRegister />} />
        <Route path="login" element={<HospitalLogin />} />
        <Route element={<RequireHospitalAuth />}>
          <Route path=":id/upload" element={<UploadRecord />} />
          <Route path="options" element={<HospitalOperations />} />
          <Route
            path="options/patients/:id"
            element={<HospitalPatientOptions />}
          />
          <Route
            path="options/patients/:id/logs"
            element={<HospitalPatientLogs />}
          />
          <Route
            path="options/patients/:id/upload"
            element={<UploadRecord />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
