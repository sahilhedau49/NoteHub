import React from "react";
import policyConfig from "../Policy.json";

const NotAllowed = () => {
  return (
    <div className="flex place-content-center place-items-center min-h-screen">
      <div className="text-center text-4xl uppercase font-semibold">
        Please visit on working time <br />{" "}
        <span className="text-2xl">
          i.e. between {policyConfig.startTime} - {policyConfig.endTime}
        </span>
      </div>
    </div>
  );
};

export default NotAllowed;
