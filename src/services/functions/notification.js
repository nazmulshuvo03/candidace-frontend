import { fetchContent, putContent } from "../api";
import {
  single_notification_url,
  user_notificaiton_url,
} from "../urls/notification";

export const fetchUserNotifications = async (userId) => {
  const res = await fetchContent(user_notificaiton_url(userId));
  console.log("Fetch notification response: ", res);
  if (res.success) {
    return res.data;
  } else return null;
};

export const markNotificationAsRead = async (id) => {
  const res = await putContent(single_notification_url(id), {});
  console.log("Mark notification read response: ", res);
  if (res.success) {
    return res.data;
  } else return null;
};
