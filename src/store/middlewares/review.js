import { TOAST_TYPES } from "../../constants/Toast";
import { fetchContent, postContent } from "../../services/api";
import {
  all_review_questions,
  review_interviewer,
  review_self,
  user_reviews,
} from "../../services/urls/review";
import { setLoading, setToastMessage } from "../slices/global";

export const fetchAllReviewQuestions = (practiceAreaId) => async (dispatch) => {
  const res = await fetchContent(all_review_questions(practiceAreaId));
  console.log(`Review questions of: ${practiceAreaId}`, res);
  if (res.success) {
    return res.data;
  } else {
    dispatch(
      setToastMessage({
        type: TOAST_TYPES[1],
        message: res.data.message,
      })
    );
  }
};

export const getInterviewerReview = (ids) => async (dispatch) => {
  dispatch(setLoading());
  const res = await fetchContent(
    review_interviewer(ids.meetingId, ids.interviewerId)
  );
  console.log("Interviewer review get response: ", res);
  dispatch(setLoading(false));
  if (res.success) {
    return res.data;
  }
};

export const createInterviewerReview = (data) => async (dispatch) => {
  dispatch(setLoading());
  const res = await postContent(
    review_interviewer(data.meetingId, data.interviewerId),
    data
  );
  console.log("Review interviewer response ", res);
  dispatch(setLoading(false));
  if (!res.success) {
    dispatch(
      setToastMessage({
        type: TOAST_TYPES[1],
        message: res.data,
      })
    );
  }
};

export const getSelfReview = (ids) => async (dispatch) => {
  dispatch(setLoading());
  const res = await fetchContent(review_self(ids.meetingId, ids.skillId));
  console.log("Self review get response: ", res);
  dispatch(setLoading(false));
  if (res.success) {
    return res.data;
  }
};

export const createSelfReview = (data) => async (dispatch) => {
  dispatch(setLoading());
  const res = await postContent(
    review_self(data.meetingId, data.skillId),
    data
  );
  console.log("Review self response: ", res);
  dispatch(setLoading(false));
  if (!res.success) {
    dispatch(
      setToastMessage({
        type: TOAST_TYPES[1],
        message: res.data,
      })
    );
  }
};

export const getUserReviews = (userId) => async (dispatch) => {
  dispatch(setLoading());
  const res = await fetchContent(user_reviews(userId));
  console.log("User reviews response: ", res);
  dispatch(setLoading(false));
  if (res.success) {
    return res.data;
  }
};
