import { TOAST_TYPES } from "../constants/Toast";
import { setLoading, setToastMessage } from "../store/slices/global";

export const asyncWrapper = (fn) => {
  return async (dispatch) => {
    try {
      await fn(dispatch);
    } catch (error) {
      console.log("Error: ", error);
      dispatch(setLoading(false));
      dispatch(
        setToastMessage({ type: TOAST_TYPES[1], message: error.message })
      );
    }
  };
};
