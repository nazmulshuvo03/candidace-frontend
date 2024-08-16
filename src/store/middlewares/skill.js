import { TOAST_TYPES } from "../../constants/Toast";
import { deleteContent, fetchContent, postContent } from "../../services/api";
import {
  all_experience_type_url,
  all_skills_url,
  single_experience_type_url,
  single_skill_url,
} from "../../services/urls/skill";
import { responseHandler } from "../../utils/api";
import { asyncWrapper } from "../../utils/async";
import { setToastMessage } from "../slices/global";
import {
  removeExperienceTypes,
  removeSkill,
  setAllExperienceType,
  setAllSkill,
  updateExperienceTypes,
  updateSkills,
} from "../slices/profession";

export const fetchAllSkill = () =>
  asyncWrapper(async (dispatch) => {
    const res = await fetchContent(all_skills_url());
    console.log("all skills fetched", res);
    responseHandler(res, () => dispatch(setAllSkill(res.data)));
  });

export const addSkill = (data) =>
  asyncWrapper(async (dispatch) => {
    const res = await postContent(all_skills_url(), data);
    console.log("Skill adding response: ", res);
    responseHandler(
      res,
      () => {
        dispatch(updateSkills(res.data));
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

export const deleteSkill = (id, profession) =>
  asyncWrapper(async (dispatch) => {
    const res = await deleteContent(single_skill_url(id));
    console.log("Skill delete response: ", res);
    responseHandler(
      res,
      () => {
        dispatch(removeSkill({ id, profession }));
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

export const fetchAllExperienceType = () =>
  asyncWrapper(async (dispatch) => {
    const res = await fetchContent(all_experience_type_url());
    console.log("all experience type fetched", res);
    responseHandler(res, () => dispatch(setAllExperienceType(res.data)));
  });

export const addExperienceType = (data) =>
  asyncWrapper(async (dispatch) => {
    const res = await postContent(all_experience_type_url(), data);
    console.log("Experience type adding response: ", res);
    responseHandler(
      res,
      () => {
        dispatch(updateExperienceTypes(res.data));
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

export const deleteExperienceType = (id, profession) =>
  asyncWrapper(async (dispatch) => {
    const res = await deleteContent(single_experience_type_url(id));
    responseHandler(
      res,
      () => {
        dispatch(removeExperienceTypes({ id, profession }));
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
