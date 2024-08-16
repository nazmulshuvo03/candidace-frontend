import { TOAST_TYPES } from "../../constants/Toast";
import { deleteContent, postContent, putContent } from "../../services/api";
import {
  all_interviewExperience_url,
  single_interviewExperience_url,
} from "../../services/urls/interviewExperience";
import { responseHandler } from "../../utils/api";
import { asyncWrapper } from "../../utils/async";
import { setLoading, setToastMessage } from "../slices/global";
import {
  removeInterviewExperience,
  updateInterviewExperience,
} from "../slices/user";

export const addInterviewExperience = (data) =>
  asyncWrapper(async (dispatch) => {
    dispatch(setLoading());
    const res = await postContent(all_interviewExperience_url(), data);
    console.log("Interview experience adding response: ", res);

    responseHandler(
      res,
      () => {
        dispatch(setLoading(false));
        dispatch(updateInterviewExperience(res.data));
      },
      () => {
        dispatch(setLoading(false));
        dispatch(
          setToastMessage({
            type: TOAST_TYPES[1],
            message: res.data,
          })
        );
      }
    );
  });

export const deleteInterviewExperience = (id) =>
  asyncWrapper(async (dispatch) => {
    dispatch(setLoading());
    const res = await deleteContent(single_interviewExperience_url(id));
    console.log("Interview experience delete response: ", res);

    responseHandler(
      res,
      () => {
        dispatch(removeInterviewExperience(id));
        dispatch(setLoading(false));
      },
      () => {
        dispatch(setLoading(false));
        dispatch(
          setToastMessage({
            type: TOAST_TYPES[1],
            message: res.data,
          })
        );
      }
    );
  });

export const editInterviewExperience = (id, data) =>
  asyncWrapper(async (dispatch) => {
    dispatch(setLoading());
    const res = await putContent(single_interviewExperience_url(id), data);
    console.log("Interview experience update response: ", res);

    responseHandler(
      res,
      () => {
        dispatch(setLoading(false));
        dispatch(removeInterviewExperience(id));
        dispatch(updateInterviewExperience(res.data));
      },
      () => {
        dispatch(setLoading(false));
        dispatch(
          setToastMessage({
            type: TOAST_TYPES[1],
            message: res.data,
          })
        );
      }
    );
  });
