import React, { createContext, useState, useEffect } from "react";
import { fetchUserNotifications } from "../services/functions/notification";
import { useSelector } from "react-redux";
import socket from "../socket";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const profile = useSelector((state) => state.user.profile);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    socket.emit("identify", profile.id);

    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    const getInitialNotifications = async () => {
      const data = await fetchUserNotifications(profile.id);
      setUnreadCount(data.unreadCount);
      if (data && data.notifications && data.notifications.length) {
        setNotifications(data.notifications);
      }
      if (data && data.unreadNotifications && data.unreadNotifications.length) {
        setUnreadNotifications(data.unreadNotifications);
      }
    };

    if (profile) getInitialNotifications();

    socket.on("notification", (notification) => {
      setNotifications((prevNotifications) => [
        notification,
        ...prevNotifications,
      ]);
      setUnreadNotifications((prevNotifications) => [
        notification,
        ...prevNotifications,
      ]);
      setUnreadCount((prev) => prev + 1);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    return () => {
      socket.off("notification");
    };
  }, [profile]);

  const handleNotificationReadContext = (id) => {
    setUnreadNotifications((prev) => prev.filter((item) => item.id !== id));
    setUnreadCount((prev) => prev - 1);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        unreadNotifications,
        setUnreadNotifications,
        unreadCount,
        handleNotificationReadContext,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
