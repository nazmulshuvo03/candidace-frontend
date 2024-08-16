export const getLastPartFromUrl = (url) => {
  const segments = url.split("/");
  const nonEmptySegments = segments.filter((segment) => segment !== "");
  const lastSegment = nonEmptySegments[nonEmptySegments.length - 1];
  return lastSegment;
};
