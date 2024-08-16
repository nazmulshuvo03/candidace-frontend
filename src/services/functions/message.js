import { fetchContent, postContent, putContent } from "../api";
import {
  all_message_url,
  all_messge_url,
  mark_as_read_url,
  message_inbox_url,
  sent_message_url,
  user_chat_url,
} from "../urls/message";

export const sendMessage = async (messageData) => {
  const res = await postContent(all_messge_url(), messageData);
  console.log("send message response: ", res);
  if (res.success) {
    return res.data;
  } else {
    return null;
  }
};

export const fetchAllMessages = async () => {
  const res = await fetchContent(all_message_url());
  console.log("Message Inbox response: ", res);
  if (res.success) {
    return res.data;
  } else {
    return null;
  }
};

export const fetchInboxMessages = async () => {
  const res = await fetchContent(message_inbox_url());
  console.log("Message Inbox response: ", res);
  if (res.success) {
    return res.data;
  } else {
    return null;
  }
};

export const fetchSentMessages = async () => {
  const res = await fetchContent(sent_message_url());
  console.log("Sent message response: ", res);
  if (res.success) {
    return res.data;
  } else {
    return null;
  }
};

export const fetchChatboxMessages = async (otherUserId) => {
  const res = await fetchContent(user_chat_url(otherUserId));
  console.log("chat response: ", res);
  if (res.success) {
    return res.data;
  } else {
    return null;
  }
};

export const markMessagesAsRead = async (otherUserId) => {
  const res = await putContent(mark_as_read_url(), otherUserId);
  console.log("mark as read response: ", res);
  if (res.success) {
    return res.data;
  } else {
    return null;
  }
};
