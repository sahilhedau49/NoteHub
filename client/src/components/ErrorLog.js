import React from "react";
import { UserAuth } from "../context/auth";

const ErrorLog = () => {
  const { errWhileLog } = UserAuth();
  return (
    <div className="absolute bottom-0 alert alert-error rounded-none">
      <p className="block max-w-fit">
        Error Occured --{`>`}
        {errWhileLog.message}
      </p>
    </div>
  );
};

export default ErrorLog;
