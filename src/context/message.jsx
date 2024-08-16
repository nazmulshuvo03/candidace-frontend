import React, { createContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllMessages,
  fetchChatboxMessages,
  fetchInboxMessages,
  markMessagesAsRead,
} from "../services/functions/message";
import { setChat } from "../store/slices/global";
import socket from "../socket";

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const chatProfile = useSelector((state) => state.global.chat);
  const [messages, setMessages] = useState([]);
  const [inboxMessages, setInboxMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [chatboxMessages, setChatboxMessages] = useState([]);

  useEffect(() => {
    socket.emit("identify", profile.id);

    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    const getInitialMessages = async () => {
      const allMessages = await fetchAllMessages();
      if (allMessages && allMessages.length) {
        setMessages(allMessages);
      }
      const data = await fetchInboxMessages();
      if (data && data.inboxMessages && data.inboxMessages.length) {
        setInboxMessages(data.inboxMessages);
        setUnreadCount(data.unreadCount);
      }
    };

    const getChatMessages = async () => {
      const data = await fetchChatboxMessages(chatProfile.id);
      if (data && data.length) {
        setChatboxMessages(data);
        await markMessagesAsRead({
          otherUserId: chatProfile.id,
        });
      }
    };

    if (profile) getInitialMessages();

    if (chatProfile) getChatMessages();

    socket.on("message", (message) => {
      if (chatProfile && message.senderId === chatProfile.id) {
        setChatboxMessages((prev) => [...prev, message]);
        markMessagesAsRead({
          otherUserId: chatProfile.id,
        });
      } else {
        setUnreadCount((prev) => prev + 1);
      }
      setMessages((prev) => updateMessages(prev, message));
      setInboxMessages((prev) => updateMessages(prev, message));
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    return () => {
      socket.off("message");
    };
  }, [profile, chatProfile]);

  const updateMessages = (prevMessages, message) => {
    const existingMessageIndex = prevMessages.findIndex(
      (msg) =>
        msg.senderId === message.senderId &&
        msg.receiverId === message.receiverId
    );

    if (existingMessageIndex !== -1) {
      const updatedMessages = [...prevMessages];
      updatedMessages[existingMessageIndex] = message;
      return updatedMessages;
    } else {
      return [message, ...prevMessages];
    }
  };

  const handleMessageReadContext = async (selectedMessage) => {
    const otherUser =
      selectedMessage.senderId === profile.id
        ? selectedMessage.receiver
        : selectedMessage.sender;

    setInboxMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === selectedMessage.id
          ? { ...message, isRead: true }
          : message
      )
    );
    if (selectedMessage && selectedMessage.isRead === false) {
      setUnreadCount((prev) => prev - 1);
    }
    dispatch(setChat(otherUser));
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        setMessages,
        inboxMessages,
        setInboxMessages,
        unreadCount,
        setUnreadCount,
        chatProfile,
        chatboxMessages,
        setChatboxMessages,
        handleMessageReadContext,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};
