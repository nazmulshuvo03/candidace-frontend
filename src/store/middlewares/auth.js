import { responseHandler } from "../../utils/api";
import { asyncWrapper } from "../../utils/async";
import { postContent } from "../../services/api";
import {
  forget_pass_url,
  google_auth_url,
  login_url,
  logout_url,
  resend_email_verification_url,
  reset_pass_url,
  signup_url,
  validate_email_verification_url,
} from "../../services/urls/auth";
import { persistor } from "../index";
import {
  setAdmin,
  setAuthenticated,
  setLoading,
  setModalMessageData,
  setToastMessage,
} from "../slices/global";
import { TOAST_TYPES } from "../../constants/Toast";
import {
  resetUserState,
  setCompletionStatus,
  setProfile,
  updateEmailVerificationStatus,
} from "../slices/user";
import { setTargetProfession } from "../slices/profession";
import { setUserAvailabilities } from "../slices/availability";
// import { wpLogout } from "../../services/functions/auth";

export const logoutUser = (data) =>
  asyncWrapper(async (dispatch) => {
    const res = await postContent(logout_url(), data);
    // await wpLogout();
    responseHandler(res, () => {
      persistor.purge();
      dispatch(setAuthenticated(false));
      dispatch(setAdmin(false));
      dispatch(resetUserState());
    });
  });

export const signupUser = (data) =>
  asyncWrapper(async (dispatch) => {
    data.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const response = await postContent(signup_url(), data);
    console.log("user sign up response: ", response);
    responseHandler(
      response,
      () => {
        dispatch(setProfile(response.data));
        dispatch(setAuthenticated(true));
        dispatch(setTargetProfession(response.data.targetProfessionId));
        dispatch(setUserAvailabilities(response.data.availabilities));
        dispatch(setCompletionStatus(response.data.completionStatus));
        // window.location.href = "/onboard";
        dispatch(setAdmin(response.data.type === "ADMIN"));
      },
      () => {
        dispatch(
          setToastMessage({ type: TOAST_TYPES[1], message: response.data })
        );
      }
    );
  });

export const loginUser = (data) =>
  asyncWrapper(async (dispatch) => {
    const response = await postContent(login_url(), data);
    console.log("user login response: ", response);
    responseHandler(
      response,
      () => {
        dispatch(setProfile(response.data));
        dispatch(setAuthenticated(true));
        dispatch(setTargetProfession(response.data.targetProfessionId));
        dispatch(setUserAvailabilities(response.data.availabilities));
        dispatch(setCompletionStatus(response.data.completionStatus));
        dispatch(setAdmin(response.data.type === "ADMIN"));
      },
      () => {
        dispatch(
          setToastMessage({ type: TOAST_TYPES[1], message: response.data })
        );
      }
    );
  });

export const googleAuthUser = (data) =>
  asyncWrapper(async (dispatch) => {
    dispatch(setLoading());
    data.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const response = await postContent(google_auth_url(), data);
    console.log("google login response: ", response);
    responseHandler(
      response,
      () => {
        dispatch(setProfile(response.data));
        dispatch(setAuthenticated(true));
        dispatch(setTargetProfession(response.data.targetProfessionId));
        dispatch(setUserAvailabilities(response.data.availabilities));
        dispatch(setCompletionStatus(response.data.completionStatus));
        dispatch(setModalMessageData(null));
        dispatch(setLoading(false));
        dispatch(setAdmin(response.data.type === "ADMIN"));
      },
      () => {
        if (response.data.message === "PROFESSION_REQUIRED") {
          dispatch(
            setModalMessageData({
              name: "professionRequired",
              data: response.data,
            })
          );
        } else {
          dispatch(
            setToastMessage({ type: TOAST_TYPES[1], message: response.data })
          );
        }
        dispatch(setLoading(false));
      }
    );
  });

export const resendVerificationEmail = () =>
  asyncWrapper(async (dispatch) => {
    dispatch(setLoading());
    const response = await postContent(resend_email_verification_url());
    console.log("resend email verification response: ", response);
    responseHandler(
      response,
      () => {
        dispatch(
          setToastMessage({ type: TOAST_TYPES[0], message: response.data })
        );
      },
      () => {
        dispatch(
          setToastMessage({ type: TOAST_TYPES[1], message: response.data })
        );
      }
    );
    dispatch(setLoading(false));
  });

export const validateEmailVerification = (data) =>
  asyncWrapper(async (dispatch) => {
    dispatch(setLoading());
    const response = await postContent(validate_email_verification_url(), data);
    console.log("validate email verification response: ", response);
    responseHandler(
      response,
      () => {
        dispatch(updateEmailVerificationStatus(true));
        dispatch(
          setToastMessage({
            type: TOAST_TYPES[0],
            message: response.data,
            duration: 500,
            onClose: () => {
              window.location.href = "/profile";
            },
          })
        );
      },
      () => {
        dispatch(
          setToastMessage({
            type: TOAST_TYPES[1],
            message: response.data,
            duration: 500,
            onClose: () => {
              window.location.href = "/";
            },
          })
        );
      }
    );
    dispatch(setLoading(false));
  });

export const sendForgetPassword = (data) =>
  asyncWrapper(async (dispatch) => {
    dispatch(setLoading());
    const response = await postContent(forget_pass_url(), data);
    console.log("forget password response: ", response);
    responseHandler(
      response,
      () => {
        dispatch(
          setToastMessage({ type: TOAST_TYPES[0], message: response.data })
        );
      },
      () => {
        dispatch(
          setToastMessage({ type: TOAST_TYPES[1], message: response.data })
        );
      }
    );
    dispatch(setLoading(false));
  });

export const resetPassword = (data) =>
  asyncWrapper(async (dispatch) => {
    const response = await postContent(reset_pass_url(), data);
    console.log("user login response: ", response);
    responseHandler(
      response,
      () => {
        dispatch(
          setModalMessageData({
            name: "resetPassSuccess",
            data: { message: response.data },
          })
        );
      },
      () => {
        dispatch(
          setToastMessage({ type: TOAST_TYPES[1], message: response.data })
        );
      }
    );
  });
