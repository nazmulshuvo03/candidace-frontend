import { useContext } from "react";
import { NotificationContext } from "../../context/notification";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Bell = () => {
  const { unreadCount } = useContext(NotificationContext);

  return (
    <div className="relative">
      <FontAwesomeIcon icon={faBell} className="w-5 h-5" />
      {unreadCount ? (
        <div
          className="absolute -top-1/2 -right-3 translate-y-1/4 bg-red-500 text-white w-4 h-4 flex justify-center items-center rounded-full"
          style={{ fontSize: "8px" }}
        >
          {unreadCount}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
