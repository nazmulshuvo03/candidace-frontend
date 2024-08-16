import React, { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export const CustomInput = forwardRef(
  (
    { value, placeholder = "", onClick = () => {}, calenderOpen = false },
    ref
  ) => {
    return (
      <div
        className="border rounded-lg text-sm px-4 py-2 w-full bg-white text-start"
        style={{ minHeight: "38px" }}
        onClick={onClick}
        ref={ref}
      >
        {value ? (
          <span>{value}</span>
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
        <span className="text-gray-500 text-sm">
          {/* {calenderOpen ? (
            <FontAwesomeIcon
              className="absolute top-4 right-3"
              icon={faSortUp}
            />
          ) : (
            <FontAwesomeIcon
              className="absolute top-2 right-3"
              icon={faSortDown}
            />
          )} */}
          {calenderOpen ? (
            <FontAwesomeIcon
              icon={faTimes}
              className="absolute top-3 right-3"
            />
          ) : (
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="absolute top-3 right-3"
            />
          )}
        </span>
      </div>
    );
  }
);
