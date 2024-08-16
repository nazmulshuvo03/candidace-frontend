import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { googleAuthUser } from "../../store/middlewares/auth";
import { setToastMessage } from "../../store/slices/global";
import { TOAST_TYPES } from "../../constants/Toast";

export const GoogleAuth = ({ additionalData = {}, useOneTap = false }) => {
  const dispatch = useDispatch();

  const handleSuccess = (credentialResponse) => {
    // credentialResponse: { clientId, credential, select_by }
    const user = jwtDecode(credentialResponse.credential);
    dispatch(
      googleAuthUser({
        ...user,
        ...additionalData,
      })
    );
  };

  const handleError = (e) => {
    console.log("Google Authentication Failed", e);
    dispatch(
      setToastMessage({
        type: TOAST_TYPES[1],
        message: "Google authentication failed",
      })
    );
  };

  if (useOneTap) {
    useGoogleOneTapLogin({
      onSuccess: handleSuccess,
      onError: handleError,
    });
  } else {
    return (
      <GoogleLogin
        id="GoogleLoginButton"
        onSuccess={handleSuccess}
        onError={handleError}
        type="standard"
        theme="filled_blue"
        flow="auth-code"
        width={288}
        // useOneTap={useOneTap}
        // style={{ width: "100%" }}
      />
    );
  }
};
