import { useContext } from "react";
import moment from "moment";
import { NotificationContext } from "../../context/notification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NoData } from "../NoData";
import { faEnvelope, faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";

export const AllNotifications = () => {
  const { notifications } = useContext(NotificationContext);

  return (
    <div className="flex flex-col h-full">
      <ul className="p-4 overflow-y-auto">
        {notifications && notifications.length ? (
          notifications.map((notification, i) => (
            <li
              key={notification.id}
              className={`flex px-3 py-2 my-2 rounded ${
                i < notifications.length - 1 ? "border-b border-gray-300" : ""
              } ${notification.read ? "" : "bg-gray-200"}`}
            >
              <div
                className="flex-1 pr-3 flex flex-col justify-center"
                style={{ maxWidth: "95%" }}
              >
                {notification.title && (
                  <p className="text-xs font-bold text-wrap break-words overflow-hidden">
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
              <div className="flex items-center justify-center">
                {
                  <FontAwesomeIcon
                    icon={notification.read ? faEnvelopeOpen : faEnvelope}
                    className="text-gray-500"
                  />
                }
              </div>
            </li>
          ))
        ) : (
          <NoData
            size={80}
            message="You do not have any notification at this moment"
          />
        )}
      </ul>
    </div>
  );
};
