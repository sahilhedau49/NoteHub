import React from "react";
import { UserAuth } from "../context/auth";
import { Navigate } from "react-router-dom";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const Protected = ({ children }) => {
  const { user, checkingStatus } = UserAuth();

  if (checkingStatus) {
    return (
      <div className="flex place-content-center place-items-center min-h-[90vh] min-w-full">
        <ClimbingBoxLoader />
      </div>
    );
  }

  if (!user || !user?.emailVerified) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default Protected;
