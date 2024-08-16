import axios from "axios";
import { config } from "../../../.config";

export const wpLogout = async () => {
  try {
    const response = await axios.get(
      `${config.FRONTEND_URL}/blog/my-account/user-logout`,
      // `http://localhost/learning/my-account/user-logout`,
      {
        withCredentials: true, // This ensures cookies are sent with the request
      }
    );

    if (response.status === 200) {
      console.log("WordPress logout successful");
      window.location.href = "/";
    } else {
      console.log("WordPress logout failed");
    }
  } catch (error) {
    console.error("An error occurred during WordPress logout", error);
  }
};
