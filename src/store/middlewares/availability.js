import { TOAST_TYPES } from "../../constants/Toast";
import { responseHandler } from "../../utils/api";
import { asyncWrapper } from "../../utils/async";
import { deleteContent, fetchContent, postContent } from "../../services/api";
import {
  user_availability_url,
  availability_url,
  single_availability_url,
  recurrent_availability_url,
  single_recurrent_availability_url,
} from "../../services/urls/availability";
import {
  removeAvailability,
  removeRecurrentAvailability,
  setRecurrentAvailabilities,
  setUserAvailabilities,
  updateRecurrentAvailabilities,
  updateUserAvailabilities,
} from "../slices/availability";
import { setLoading, setToastMessage } from "../slices/global";
import { setCompletionStatus } from "../slices/user";

export const fetchUserAvailabilities = (userId) =>
  asyncWrapper(async (dispatch) => {
    const res = await fetchContent(user_availability_url(userId));
    console.log("user availabilities: ", res);
    responseHandler(res, dispatch(setUserAvailabilities(res.data)));
  });

export const visitUserAvailabilities = (userId) => async (dispatch) => {
  const res = await fetchContent(user_availability_url(userId));
  console.log("user availabilities: ", res);
  return res.data;
};

export const createUserAvailability = (data) =>
  asyncWrapper(async (dispatch) => {
    const res = await postContent(availability_url(), data);
    console.log("availability create", data, res);
    responseHandler(
      res,
      () => {
        dispatch(updateUserAvailabilities(res.data));
        dispatch(setCompletionStatus(res.data.completionStatus));
      },
      () => {
        dispatch(
          setToastMessage({
            type: TOAST_TYPES[1],
            message: res.data,
          })
        );
      }
    );
  });

export const deleteAvailability = (data) =>
  asyncWrapper(async (dispatch) => {
    const res = await deleteContent(single_availability_url(data.id));
    console.log("availability deleted", res);
    responseHandler(
      res,
      () => {
        dispatch(removeAvailability(data));
        dispatch(setCompletionStatus(res.data));
      },
      () => {
        dispatch(
          setToastMessage({
            type: TOAST_TYPES[1],
            message: res.data,
          })
        );
      }
    );
  });

export const fetchRecurrentAvailabilities = () =>
  asyncWrapper(async (dispatch) => {
    const res = await fetchContent(recurrent_availability_url());
    console.log("recurrent availability response: ", res);
    responseHandler(
      res,
      () => {
        dispatch(setRecurrentAvailabilities(res.data));
      },
      () => {
        dispatch(
          setToastMessage({
            type: TOAST_TYPES[1],
            message: `Error fetching recurrent availability data`,
          })
        );
      }
    );
  });

export const createRecurrentAvailability = (data) =>
  asyncWrapper(async (dispatch) => {
    dispatch(setLoading());
    const res = await postContent(recurrent_availability_url(), data);
    console.log("recurrent availability created: ", res);
    responseHandler(
      res,
      () => {
        dispatch(updateRecurrentAvailabilities(res.data.recurrent));
        dispatch(updateUserAvailabilities(res.data.availablity));
        dispatch(setCompletionStatus(res.data.availablity.completionStatus));
      },
      () => {
        dispatch(
          setToastMessage({
            type: TOAST_TYPES[1],
            message: res.data,
          })
        );
      }
    );
    dispatch(setLoading(false));
  });

export const deleteRecurrentAvailability = (data) =>
  asyncWrapper(async (dispatch) => {
    const res = await deleteContent(single_recurrent_availability_url(data.id));
    console.log("recurrent availability deleted", res);
    responseHandler(
      res,
      () => {
        dispatch(removeRecurrentAvailability(data));
      },
      () => {
        dispatch(
          setToastMessage({
            type: TOAST_TYPES[1],
            message: res.data,
          })
        );
      }
    );
  });
