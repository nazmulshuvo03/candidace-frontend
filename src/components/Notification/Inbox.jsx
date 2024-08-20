import { useContext } from "react";
import moment from "moment";
import { NotificationContext } from "../../context/notification";
import { IconButton } from "../Button/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { NoData } from "../NoData";
import { markNotificationAsRead } from "../../services/functions/notification";
import Link from "next/link";

export const NotificationInbox = ({ setShowData }) => {
  const { unreadNotifications, handleNotificationReadContext } =
    useContext(NotificationContext);

  return (
    <div className="w-96 max-h-96 flex flex-col">
      <ul className="w-full flex-1 p-1 overflow-y-auto">
        {unreadNotifications && unreadNotifications.length ? (
          unreadNotifications.map((notification, i) => (
            <li
              key={notification.id}
              className={`flex px-2 my-1 rounded ${
                i < unreadNotifications.length - 1
                  ? "border-b border-gray-300"
                  : ""
              } ${notification.read ? "" : "bg-gray-100"}`}
            >
              <div
                className="flex-1 pr-3 flex flex-col justify-center"
                style={{ maxWidth: "95%" }}
              >
                {notification.title && (
                  <p className="text-xs font-bold text-ellipsis overflow-hidden whitespace-nowrap">
                    Title: {notification.title}
                  </p>
                )}
                <p className="text-xs font-normal text-wrap break-words overflow-hidden">
                  {notification.message}
                </p>
                <p
                  className="font-light text-gray-400"
                  style={{ fontSize: "10px" }}
                >
                  {moment(notification.createdAt).fromNow()}
                </p>
              </div>
              <IconButton
                onClick={() => {
                  markNotificationAsRead(notification.id);
                  handleNotificationReadContext(notification.id);
                }}
              >
                <FontAwesomeIcon icon={faClose} className="!text-gray-400" />
              </IconButton>
            </li>
          ))
        ) : (
          <NoData
            size={80}
            message="You do not have any notification at this moment"
          />
        )}
      </ul>
      <Link
        href="/dashboard/notification"
        className="w-full text-center py-1 text-secondary font-bold"
        onClick={() => setShowData(false)}
      >
        See all...
      </Link>
    </div>
  );
};
