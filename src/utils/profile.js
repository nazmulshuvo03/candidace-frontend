import { COMPLETION_ITEMS } from "../constants/Profile";

export const completionRemaining = (obj) => {
  const falses = listOfFalses(obj);
  if (falses.length === 3) {
    return `${falses[0]}, ${falses[1]} and ${falses[2]}`;
  } else if (falses.length === 2) {
    return `${falses[0]} and ${falses[1]}`;
  } else if (falses.length === 1) {
    return `${falses[0]}`;
  } else {
    return `all required items`;
  }
};

export const isProfileComplete = (status) => {
  return Object.values(status).every((value) => value === true);
};

export const listOfFalses = (obj) => {
  const falses = [];
  Object.keys(obj).forEach((key) => {
    if (obj[key] === false) falses.push(COMPLETION_ITEMS[key]);
  });
  return falses;
};

export const workProfile = (works) => {
  let mostRecent = null;
  let rest = [];
  if (works.length === 1) {
    mostRecent = works[0];
  }
  if (works.length > 1) {
    for (let work of works) {
      if (work.currentCompany) {
        mostRecent = work;
      } else {
        rest.push(work);
      }
    }
    if (!mostRecent) {
      // this means there is no current company; run the loop again to find the most recent company
      rest = [];
      mostRecent = works[0];
      for (let work of works) {
        if (new Date(work.endDate) > new Date(mostRecent.endDate)) {
          rest.push(mostRecent);
          mostRecent = work;
        } else if (new Date(work.endDate) < new Date(mostRecent.endDate))
          rest.push(work);
      }
    }
  }
  return {
    mostRecent,
    rest,
  };
};
