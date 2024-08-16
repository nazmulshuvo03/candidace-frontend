export const queryObjectToString = (queries) => {
  return Object.keys(queries)
    .filter((key) => queries[key])
    .map((key) => `${key}=${encodeURIComponent(queries[key])}`)
    .join("&");
};
