export const sortArrayByProperty = (arr, property = "name") => {
  return arr.sort((a, b) => {
    const valueA = a[property];
    const valueB = b[property];
    if (valueA < valueB) {
      return -1;
    }
    if (valueA > valueB) {
      return 1;
    }
    return 0;
  });
};
