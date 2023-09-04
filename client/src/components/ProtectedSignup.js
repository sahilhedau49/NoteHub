import React from "react";
import { UserAuth } from "../context/auth";
import { Navigate } from "react-router-dom";

const ProtectedSignup = ({ children }) => {
  const { user } = UserAuth();
  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedSignup;
