import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from './loading/Loading'

const PrivateRoute = () => {
  const { currentUser, loading } = useAuth();
  if (loading) {
    return <Loading />
  } else if (currentUser && !loading) {
    return <Outlet />;
  } else {
    return <Navigate to="/signin" />;
  }
};

export default PrivateRoute;
