export const companyNameShortner = (str = "", maxLength = 3) => {
  const words = str.split(" ");
  if (words.length > maxLength) {
    return `${words.slice(0, maxLength).join(" ")}`;
  } else {
    return str;
  }
};

export const uuidShortner = (uuid, letters = 4) => {
  const segments = uuid.split("-");

  const firstSegment = segments[0];
  const lastSegment = segments[segments.length - 1];

  const firstFour = firstSegment.substring(0, letters);
  const lastFour = lastSegment.substring(lastSegment.length - letters);

  return `${firstFour}....${lastFour}`;
};

export const timezoneLastpart = (timezone = "") => {
  const parts = timezone.split("/");
  if (parts.length > 0) {
    const lastPart = parts[parts.length - 1];
    return lastPart;
  } else return "";
};
