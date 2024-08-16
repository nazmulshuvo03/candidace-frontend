import { getYear, getMonth } from "date-fns";
import { IconButton } from "../../Button/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function range(start, end, step = 1) {
  const result = [];
  for (let i = start; i < end; i += step) {
    result.push(i);
  }
  return result;
}

// const years = range(1990, getYear(new Date()) + 1, 1);
const years = range(1900, 2900, 1);
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const CustomHeader = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}) => (
  <div className="flex justify-between items-center gap-2 px-2">
    <IconButton onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
      <FontAwesomeIcon icon={faArrowLeft} className="text-gray-700" />
    </IconButton>
    <select
      value={getYear(date)}
      onChange={({ target: { value } }) => changeYear(value)}
      className="py-1 px-2 text-normal font-medium cursor-pointer"
    >
      {years.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>

    <select
      value={months[getMonth(date)]}
      onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
      className="py-1 px-2 text-normal font-medium cursor-pointer"
    >
      {months.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>

    <IconButton onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
      <FontAwesomeIcon icon={faArrowRight} className="text-gray-700" />
    </IconButton>
  </div>
);
