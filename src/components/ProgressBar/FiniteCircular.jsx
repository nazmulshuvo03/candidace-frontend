import React from "react";

const CircularProgress = ({ progress = 50 }) => {
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
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-3xl font-semibold ${getColor()}`}>
            {progress}%
          </span>
        </div>
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
      </div>
    </div>
  );
};

export default CircularProgress;
