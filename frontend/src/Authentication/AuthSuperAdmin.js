import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthUser from "../../Hooks/AuthUser";

const AuthSuperAdmin = ({ children }) => {
    const location = useLocation();
    const { userRole, logout } = AuthUser();

    if (userRole === "admin") {
        return children;
    }
    if (userRole === "stuff") {
        return children;
    } else {
        logout();
        return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
    }
};

export default AuthSuperAdmin;