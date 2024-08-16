export const updateLastVisit = (lastVisitTime) => {
  localStorage.setItem("lastVisit", lastVisitTime);
};

export const getLastVisit = () => {
  return localStorage.getItem("lastVisit");
};

export const shouldUpdateLastVisit = () => {
  const lastVisit = getLastVisit();
  if (!lastVisit) return true;

  const lastVisitDate = new Date(lastVisit);
  const currentTime = new Date();
  const timeDifference = (currentTime - lastVisitDate) / (1000 * 60 * 60); // in hour

  return timeDifference >= 6; // more than 6 hours
};
