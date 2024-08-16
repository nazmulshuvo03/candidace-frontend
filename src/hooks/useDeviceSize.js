import { useState, useEffect } from "react";

const getSize = (width) => {
  if (width >= 1536) {
    return "2xl";
  } else if (width >= 1280) {
    return "xl";
  } else if (width >= 1024) {
    return "lg";
  } else if (width >= 768) {
    return "md";
    // } else if (width >= 640) {
    //   return "sm";
  } else {
    return "sm";
  }
};

const useDeviceSize = () => {
  const [deviceSize, setDeviceSize] = useState(getSize(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setDeviceSize(getSize(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceSize;
};

export default useDeviceSize;
