import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
    return currentUser ? children : <Navigate to="/signin"></Navigate>;
};

export default PrivateRoute;
