import axios from "axios";
import { config } from "../../.config";

const serverUrl = config.SERVER_URL;
const baseUrl = serverUrl + "/api/v1";
export const loginPageUrl = serverUrl + "/";

const asyncWrapper = (fn) => {
  return async (...params) => {
    try {
      return await fn(...params);
    } catch (error) {
      const errorData = error.response.data;
      console.log("Error: ", errorData);
      if (errorData.statusCode === 401) {
        // window.location.href = loginPageUrl;
        return errorData;
      } else {
        return errorData;
      }
    }
  };
};

export const fetchContent = asyncWrapper(async (url) => {
  const response = await axios.get(`${baseUrl}${url}`, {
    withCredentials: true,
  });
  return response.data;
});

export const postContent = asyncWrapper(async (url, body) => {
  const response = await axios.post(`${baseUrl}${url}`, body, {
    withCredentials: true,
  });
  return response.data;
});

export const putContent = asyncWrapper(async (url, updatedData) => {
  const response = await axios.put(`${baseUrl}${url}`, updatedData, {
    withCredentials: true,
  });
  return response.data;
});

export const deleteContent = asyncWrapper(async (url) => {
  const response = await axios.delete(`${baseUrl}${url}`, {
    withCredentials: true,
  });
  return response.data;
});
