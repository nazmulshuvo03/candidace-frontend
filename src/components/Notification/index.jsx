import { useState } from "react";
import { NotificationProvider } from "../../context/notification";
import { Bell } from "./Bell";
import { NotificationInbox } from "./Inbox";
import { Menu } from "../Modal/Menu";

export const Notification = () => {
  const [showData, setShowData] = useState(false);

  return (
    <NotificationProvider>
      <Menu
        handlerComponent={<Bell />}
        showMenu={showData}
        setShowMenu={setShowData}
        menuClasses="!top-7 -right-4"
      >
        <NotificationInbox setShowData={setShowData} />
      </Menu>
    </NotificationProvider>
  );
};
