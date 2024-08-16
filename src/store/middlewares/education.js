import { TOAST_TYPES } from "../../constants/Toast";
import { deleteContent, postContent, putContent } from "../../services/api";
import {
  all_education_url,
  single_education_url,
} from "../../services/urls/education";
import { responseHandler } from "../../utils/api";
import { asyncWrapper } from "../../utils/async";
import { setLoading, setToastMessage } from "../slices/global";
import { removeEducation, updateEducation } from "../slices/user";

export const addEducation = (data) =>
  asyncWrapper(async (dispatch) => {
    dispatch(setLoading());
    const res = await postContent(all_education_url(), data);
    console.log("Education adding response: ", res);

    responseHandler(
      res,
      () => {
        dispatch(setLoading(false));
        dispatch(updateEducation(res.data));
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

export const deleteEducation = (id) =>
  asyncWrapper(async (dispatch) => {
    dispatch(setLoading());
    const res = await deleteContent(single_education_url(id));
    console.log("Education delete response: ", res);

    responseHandler(
      res,
      () => {
        dispatch(removeEducation(id));
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

export const editEducation = (id, data) =>
  asyncWrapper(async (dispatch) => {
    dispatch(setLoading());
    console.log("Education update request data", data);
    const res = await putContent(single_education_url(id), data);
    console.log("Education update response: ", res);

    responseHandler(
      res,
      () => {
        dispatch(setLoading(false));
        dispatch(removeEducation(id));
        dispatch(updateEducation(res.data));
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
