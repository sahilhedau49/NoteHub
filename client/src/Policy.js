import { useEffect, useState } from "react";
import policyConfig from "./Policy.json";

const Policy = () => {
  const [allowed, setAllowed] = useState(false);

  let today = new Date();
  let currHour = today.getHours();

  useEffect(() => {
    if (
      currHour >= policyConfig.startTime &&
      currHour <= policyConfig.endTime
    ) {
      setAllowed(true);
    } else {
      setAllowed(false);
    }
  }, [currHour]);

  return {
    allowed,
  };
};

export default Policy;
