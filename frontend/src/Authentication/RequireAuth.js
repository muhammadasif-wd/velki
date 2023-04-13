import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthUser from "../../Hooks/AuthUser";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { userRole } = AuthUser();

  if (userRole !== "user") {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  return children;
};

export default RequireAuth;