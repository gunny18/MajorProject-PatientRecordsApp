import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getHospitalAuthState } from "./hospitalSlice";
import { useSelector } from "react-redux";

const RequireHospitalAuth = () => {
  const hospitalAuth = useSelector(getHospitalAuthState);
  console.log("auth state--->", hospitalAuth);
  return hospitalAuth ? <Outlet /> : <Navigate to="/hospital/login" replace />;
};

export default RequireHospitalAuth;
