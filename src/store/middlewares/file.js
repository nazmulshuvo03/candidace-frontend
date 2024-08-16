import { postContent } from "../../services/api";
import { upload_file } from "../../services/urls/file";
import { setLoading } from "../slices/global";

export const uploadFile = (file) => async (dispatch) => {
  try {
    setLoading();
    const response = await postContent(upload_file(), file);
    setLoading(false);
    return response.data;
  } catch (err) {
    console.log("Error: ", err.message);
    setLoading(false);
  }
};
