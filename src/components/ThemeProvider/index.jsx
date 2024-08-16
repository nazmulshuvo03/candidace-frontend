import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTheme, setTheme } from "../../store/slices/global";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export const ThemeProvider = () => {
  const dispatch = useDispatch();
  const darkTheme = useSelector(selectTheme);

  const toggleTheme = () => {
    dispatch(setTheme());
  };

  return (
    <div className={`theme-${darkTheme}`}>
      <label className="flex items-center justify-center cursor-pointer gap-2">
        <div className="relative">
          <input
            type="checkbox"
            className="hidden"
            checked={darkTheme}
            onChange={toggleTheme}
          />
          <div className="w-16 h-6 bg-slate-100 rounded-full shadow-inner"></div>
          <div
            className={`absolute w-6 h-6 rounded-full shadow top-0 border-2 border-sky-400 bg-white flex justify-center items-center ease-in-out duration-300 ${
              darkTheme ? "ease-in-out duration-300" : ""
            }`}
            style={{ translate: darkTheme ? "160%" : "0" }}
          >
            {darkTheme ? (
              <FontAwesomeIcon icon={faMoon} className="text-sky-400 h-4 w-4" />
            ) : (
              <FontAwesomeIcon icon={faSun} className="text-sky-400 h-4 w-4" />
            )}
          </div>
        </div>
      </label>
    </div>
  );
};
