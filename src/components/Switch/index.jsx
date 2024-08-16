import React, { useState } from "react";

export const Switch = ({
  leftText = "",
  rightText = "",
  handleAction = () => {},
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
    handleAction();
  };

  return (
    <label className="flex items-center justify-center cursor-pointer gap-2">
      <div className="text-accent font-medium">{leftText}</div>
      <div className="relative">
        <input
          type="checkbox"
          className="hidden"
          checked={isChecked}
          onChange={toggleSwitch}
        />
        <div className="toggle__line w-10 h-5 bg-white border border-secondary rounded-full shadow-inner"></div>
        <div
          className={`toggle__dot absolute w-5 h-5 bg-secondary rounded-full shadow top-0 ${
            isChecked ? "transform translate-x-full" : ""
          }`}
        ></div>
      </div>
      <div className="text-accent font-medium">{rightText}</div>
    </label>
  );
};
