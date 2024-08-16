import moment from "moment";

// Function to get formatted date with weekday (DD-MM-YYYY, Weekday)
export function getFormattedDateWithWeekday(date) {
  date.setHours(0, 0, 0, 0); // Set time to 00:00:00 (midnight)
  const options = {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  // const options = {
  //   weekday: "long",
  //   day: "2-digit",
  //   month: "2-digit",
  //   year: "numeric",
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   second: "2-digit",
  // };

  const formattedDate = new Intl.DateTimeFormat("en-IN", options).format(date);
  return formattedDate;
}

// Function to generate an array of date objects with key-label pairs
export function generateDateArray() {
  const currentDate = new Date();
  const dateArray = [];

  for (let i = 0; i < 3; i++) {
    const formattedDate = getFormattedDateWithWeekday(currentDate);
    dateArray.push({
      key: currentDate.setHours(0, 0, 0, 0),
      label: formattedDate,
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray;
}

// Function to format the hour in 12-hour format with am/pm
export function formatHourWithAMPM(hour) {
  const period = hour >= 12 ? "PM" : "AM";
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:00 ${period}`;
}

// Function to generate an array of hour objects with key-label pairs
export function generateHourArray(untilNow = false) {
  const hourArray = [];
  const currentHour = new Date().getHours();

  for (let hour = 1; hour <= 24; hour++) {
    if (untilNow && hour - 1 <= currentHour) {
      continue;
    } else {
      const formattedHour = formatHourWithAMPM(hour - 1);
      hourArray.push({ id: hour, name: formattedHour });
    }
  }

  return hourArray;
}

export function getDateTimeStamp(timeIn24 = 0, originalDate) {
  // Original timestamp representing 12:00 AM
  if (!originalDate) {
    // If any date is not provided, date is set to today
    let current = new Date();
    originalDate = current.setHours(0, 0, 0, 0);
  }
  // Create a new Date object using the original timestamp
  const dateWithOriginalTime = new Date(originalDate);
  dateWithOriginalTime.setHours(timeIn24, 0, 0, 0);

  // Get the updated timestamp
  const updatedTimestamp = dateWithOriginalTime.getTime();
  return updatedTimestamp;
}

export function convertUnixLocalToUnixUTC(localTime) {
  let localDate = new Date(parseInt(localTime));
  let utcTimestamp =
    localDate.getTime() + localDate.getTimezoneOffset() * 60000;
  return utcTimestamp;
}

export function convertUnixUTCToLocal(utcTime) {
  let utcDate = new Date(parseInt(utcTime));
  let localTimeStamp = utcDate.getTime() - utcDate.getTimezoneOffset() * 60000;
  return localTimeStamp;
}

export const convertLocalDayTimeToUTCDayTime = (originalDate, hour) => {
  if (!originalDate || !hour) return "";
  let dateWithOriginalTime = new Date(originalDate);
  const updatedTime = dateWithOriginalTime.setHours(hour, 0, 0, 0);
  const updatedTimeToUTC = new Date(updatedTime).toISOString();
  return updatedTimeToUTC;
};

export const convertLocalDayTimeStringToUTCDayTime = (
  originalDate,
  hour = 0
) => {
  if (!originalDate) return "";
  // let dateComponents = originalDate.split("-");
  // let year = parseInt(dateComponents[0]);
  // let month = parseInt(dateComponents[1]) - 1;
  // let day = parseInt(dateComponents[2]);
  // let localDate = new Date(year, month, day, hour);
  const localDate = originalDate.setHours(hour, 0, 0, 0);
  const updatedTimeToUTC = new Date(localDate).toISOString();
  return updatedTimeToUTC;
};

export const convertUTCDayTimeToLocalDayTime = (unixDayTime) => {
  const localTime = new Date(unixDayTime);
  const dateOptions = {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-IN", dateOptions).format(
    localTime
  );
  const hourOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  const formattedHour = new Intl.DateTimeFormat("en-IN", hourOptions).format(
    localTime
  );
  return { date: formattedDate, time: formattedHour };
};

export const convertISOUTCDayTimeToLocalDayTime = (isoTIme) => {
  if (!isoTIme) return "";
  const localTime = new Date(isoTIme);
  const dateOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-IN", dateOptions).format(
    localTime
  );

  const dateOptionsMonthView = {
    day: "2-digit",
    month: "short",
    weekday: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat("en-US", dateOptionsMonthView);
  const [
    { value: weekday },
    ,
    { value: month },
    ,
    { value: day },
    ,
    { value: year },
  ] = formatter.formatToParts(localTime);
  const formattedDateMonthView = `${weekday}, ${day} ${month}`;
  const formattedDateYearView = `${month} ${day}, ${year}`;

  const hourOptions = {
    hour: "numeric",
    minute: "numeric",
    // second: "numeric",
    hour12: true,
  };
  const formattedHour = new Intl.DateTimeFormat("en-US", hourOptions).format(
    localTime
  );
  return {
    date: formattedDate,
    dateMonthView: formattedDateMonthView,
    dateYearView: formattedDateYearView,
    time: formattedHour,
  };
};

export const formatPostgresDate = (date) => {
  if (date) {
    const parsedDate = new Date(date);
    return parsedDate.toISOString();
  } else return null;
};

export const htmlDateInputFormat = (isoString) => {
  const isoDate = new Date(isoString);
  const formattedDate = isoDate.toISOString().split("T")[0];
  return formattedDate;
};

export const timeDistance = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  let yearDiff = end.getFullYear() - start.getFullYear();
  let monthDiff = end.getMonth() - start.getMonth();
  let dayDiff = end.getDate() - start.getDate();

  if (dayDiff < 0) {
    monthDiff--;
    let prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    dayDiff += prevMonth.getDate();
  }
  if (monthDiff < 0) {
    yearDiff--;
    monthDiff += 12;
  }

  if (yearDiff > 0 || monthDiff > 0) {
    if (yearDiff === 0) {
      return `${monthDiff} month${monthDiff > 1 ? "s" : ""}`;
    }
    if (monthDiff === 0) {
      return `${yearDiff} year${yearDiff > 1 ? "s" : ""}`;
    }
    return `${yearDiff} year${yearDiff > 1 ? "s" : ""} ${monthDiff} month${
      monthDiff > 1 ? "s" : ""
    }`;
  } else {
    if (dayDiff === 0) {
      return "Today";
    } else if (dayDiff === 1) {
      return "Yesterday";
    } else {
      return `${dayDiff} day${dayDiff > 1 ? "s" : ""}`;
    }
  }
};

export const timeDistanceMoment = (date1, date2) => {
  const moment1 = moment(date1);
  const moment2 = date2 ? moment(date2) : moment();

  const duration = moment.duration(moment2.diff(moment1));

  const years = duration.years();
  const months = duration.months();
  const days = duration.days();

  return { years, months, days };
};

export const getDateDescription = (timestamp) => {
  const today = new Date();
  const targetDate = new Date(parseInt(timestamp));

  // Get the start of today
  const startOfToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  // Get the start of tomorrow and the day after
  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);
  const startOfDayAfter = new Date(startOfTomorrow);
  startOfDayAfter.setDate(startOfDayAfter.getDate() + 1);

  // Remove time from the target date
  const targetDateWithoutTime = new Date(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate()
  );

  // Check if the target date matches today, tomorrow, or the day after
  if (targetDateWithoutTime.getTime() === startOfToday.getTime()) {
    return "Today";
  } else if (targetDateWithoutTime.getTime() === startOfTomorrow.getTime()) {
    return "Tomorrow";
  } else {
    // For future dates, return the day of the week
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[targetDate.getDay()];
  }
};
