import React, { useState, useEffect } from "react";

const CircularProgress = () => {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress + 1) % 101);
    }, 20);

    const dotsInterval = setInterval(() => {
      setDots((prevDots) => {
        switch (prevDots) {
          case "":
            return ".";
          case ".":
            return "..";
          case "..":
            return "...";
          default:
            return "";
        }
      });
    }, 300);

    return () => {
      clearInterval(interval);
      clearInterval(dotsInterval);
    };
  }, []);

  const getColor = () => {
    if (progress >= 75) {
      return "stroke-green-500";
    } else if (progress >= 50) {
      return "stroke-yellow-500";
    } else {
      return "stroke-red-500";
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
      style={{ backgroundColor: "rgb(143 143 143 / 60%)" }}
    >
      <div className="relative w-52 h-52 rounded-full">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100">
          <circle
            // className="stroke-current"
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="6"
            stroke="#ddd"
            strokeLinecap="round"
          />
          <circle
            className={`stroke-current ${getColor()}`}
            cx="50"
            cy="50"
            r="45"
            fill="none"
            strokeWidth="6"
            strokeDasharray="283"
            strokeDashoffset={283 - (progress * 283) / 100}
            strokeLinecap="round"
          />
        </svg>
        {/* <div className="absolute inset-0 flex items-center w-32 px-6">
          <span className="text-lg font-semibold">Loading </span>
          <span>{dots}</span>
        </div> */}
      </div>
    </div>
  );
};

export default CircularProgress;
