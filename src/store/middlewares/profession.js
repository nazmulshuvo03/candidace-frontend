import { responseHandler } from "../../utils/api";
import { asyncWrapper } from "../../utils/async";
import { deleteContent, fetchContent, postContent } from "../../services/api";
import {
  all_professions_url,
  single_profession_url,
} from "../../services/urls/profession";
import { setLoading, setToastMessage } from "../slices/global";
import {
  removeProfession,
  setProfessions,
  updateProfessions,
} from "../slices/profession";
import { TOAST_TYPES } from "../../constants/Toast";

export const fetchProfessions = () =>
  asyncWrapper(async (dispatch) => {
    dispatch(setLoading());
    const res = await fetchContent(all_professions_url());
    console.log("Profession docs: ", res);
    responseHandler(res, () => {
      dispatch(setProfessions(res.data));
    });
    dispatch(setLoading(false));
  });

export const addProfession = (data) =>
  asyncWrapper(async (dispatch) => {
    const res = await postContent(all_professions_url(), data);
    console.log("Profession doc: ", res);
    responseHandler(
      res,
      () => {
        dispatch(updateProfessions(res.data));
        dispatch(
          setToastMessage({
            type: TOAST_TYPES[0],
            message: `${res.data.name} added`,
          })
        );
      },
      () =>
        dispatch(
          setToastMessage({
            type: TOAST_TYPES[1],
            message: res.data,
          })
        )
    );
  });

export const deleteProfession = (id) =>
  asyncWrapper(async (dispatch) => {
    const res = await deleteContent(single_profession_url(id));
    console.log("Profession doc: ", id, res);
    responseHandler(
      res,
      () => {
        dispatch(removeProfession(id));
        dispatch(
          setToastMessage({
            type: TOAST_TYPES[0],
            message: res.data,
          })
        );
      },
      () =>
        dispatch(
          setToastMessage({
            type: TOAST_TYPES[1],
            message: res.data,
          })
        )
    );
  });
