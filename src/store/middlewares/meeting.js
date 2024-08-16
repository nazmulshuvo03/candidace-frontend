import { responseHandler } from "../../utils/api";
import { asyncWrapper } from "../../utils/async";
import { fetchContent, postContent } from "../../services/api";
import {
  cancel_meeting_url,
  meeting_url,
  single_meeting_url,
  user_meeting_url,
} from "../../services/urls/meeting";
import { updateAvailabilityState } from "../slices/availability";
import {
  removeUserMeeting,
  setMeetingDetails,
  setUserMeetings,
} from "../slices/meeting";
import {
  setLoading,
  setModalMessageData,
  setToastMessage,
} from "../slices/global";
import { TOAST_TYPES } from "../../constants/Toast";
import {
  updatePeopleAvailability,
  updateVisitorProfileAvailability,
} from "../slices/user";

export const getUserMeetings = (userId) =>
  asyncWrapper(async (dispatch) => {
    const res = await fetchContent(user_meeting_url(userId));
    console.log("User meetings", res);
    responseHandler(res, dispatch(setUserMeetings(res.data)));
  });

export const createMeeting = (
  data,
  page = "" // called from 2 pages: "visit" and "people"
) =>
  asyncWrapper(async (dispatch) => {
    dispatch(setLoading());
    const res = await postContent(meeting_url(), data);
    console.log("meeting response: ", res);
    responseHandler(
      res,
      () => {
        dispatch(updateAvailabilityState(res.data));
        if (page === "visit") dispatch(updateVisitorProfileAvailability(data));
        if (page === "people") dispatch(updatePeopleAvailability(data));
        const messageData = { name: "meetingSuccess", ...res.data };
        dispatch(setModalMessageData(messageData));
        // dispatch(
        //   setToastMessage({
        //     type: TOAST_TYPES[0],
        //     message: "Meeting scheduled",
        //   })
        // );
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

export const getSingleMeeting = (id) =>
  asyncWrapper(async (dispatch) => {
    dispatch(setLoading());
    const res = await fetchContent(single_meeting_url(id));
    console.log("meeting response: ", res);
    responseHandler(
      res,
      () => {
        dispatch(setMeetingDetails(res.data));
      },
      () => {
        dispatch(
          setToastMessage({
            type: TOAST_TYPES[1],
            message: `Error finding meeting`,
          })
        );
      }
    );
    dispatch(setLoading(false));
  });

export const cancelMeeting = (data) =>
  asyncWrapper(async (dispatch) => {
    dispatch(setLoading());
    const res = await postContent(cancel_meeting_url(), data);
    console.log("cancel meeting response: ", res, data);
    responseHandler(
      res,
      () => {
        dispatch(removeUserMeeting(data.meetingId));
        dispatch(
          setToastMessage({
            type: TOAST_TYPES[0],
            message: res.data,
          })
        );
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
