import React from "react";
import { UserAuth } from "../context/auth";
import { Navigate } from "react-router-dom";

const ProtectedHome = ({ children }) => {
  const { user } = UserAuth();
  if (!user) {
    return <Navigate to="/signup" />;
  }
  return children;
};

export default ProtectedHome;
