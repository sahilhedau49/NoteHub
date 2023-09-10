import React from "react";
import { UserAuth } from "../context/auth";
import { Navigate } from "react-router-dom";

const ProtectedSignup = ({ children }) => {
  const { user, isValidate } = UserAuth();
  if (user && isValidate) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedSignup;
