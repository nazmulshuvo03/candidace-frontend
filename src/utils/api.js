export const responseHandler = async (
  response,
  successHandler = () => {},
  errorHandler = () => {}
) => {
  // console.log("handler: ", response, successHandler, errorHandler);
  if (response.success) {
    if (typeof successHandler === "function") {
      successHandler();
    } else successHandler;
  } else {
    if (typeof errorHandler === "function") {
      errorHandler();
      // alert(response.data);
      console.log("Error: ", response.data);
    } else errorHandler;
  }
};
