import React from "react";
import { UserAuth } from "../context/auth";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { user } = UserAuth();
  // console.log(user);
  if (!user || !user?.emailVerified) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default Protected;
