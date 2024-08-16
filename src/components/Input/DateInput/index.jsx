import React, { useState } from "react";
import DatePicker from "react-datepicker";
// import { getDate } from "date-fns";
import { CustomInput } from "./CustomInput";
import { CustomHeader } from "./CustomHeader";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";

export const DateInput = ({
  value = null,
  onChange = () => {},
  label = "",
  minDate = null,
  maxDate = null,
  placeholder = "",
  className = "",
  disabled = false,
}) => {
  // const [calenderOpen, setCalenderOpen] = useState(false);

  // const handleCalendarClose = () => setCalenderOpen(false);
  // const handleCalendarOpen = () => setCalenderOpen(true);

  return (
    <div className={`flex flex-col ${className}`}>
      <label className="!text-xs my-1">{label}</label>
      {!disabled ? (
        <DatePicker
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <CustomHeader
              {...{
                date,
                changeYear,
                changeMonth,
                decreaseMonth,
                increaseMonth,
                prevMonthButtonDisabled,
                nextMonthButtonDisabled,
              }}
            />
          )}
          selected={value}
          onChange={onChange}
          minDate={minDate}
          maxDate={maxDate}
          startDate={value}
          // endDate={endDate}
          // onChange={(date) => setDateValue(date)}
          // withPortal // this opens modal for calender
          // dayClassName={(date) =>
          //   getDate(date) < Math.random() * 31 ? "random" : undefined
          // }
          // isClearable
          placeholderText={placeholder}
          className="border border-gray-300 rounded-lg text-sm !pl-4 !pr-5 !py-2 w-full bg-white text-start"
          calendarClassName="w-full border-0 bg-white shadow-lg"
          dayClassName={(date) => "font-sans"}
          // customInput={
          //   <CustomInput
          //     placeholder={placeholder}
          //     onClick={() => {}}
          //     calenderOpen={calenderOpen}
          //   />
          // }
          // onCalendarClose={handleCalendarClose}
          // onCalendarOpen={handleCalendarOpen}
          closeOnScroll={true}
          showIcon
          icon={
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="text-gray-500 text-sm"
            />
          }
          calendarIconClassname={"right-0 top-1"}
        />
      ) : (
        <div
          className="border border-gray-300 rounded-lg text-sm !pl-4 !pr-5 !py-2 w-full bg-white text-start"
          style={{ height: "38px" }}
        />
      )}
    </div>
  );
};
