import { useState } from "react";
import { Menu } from "../Modal/Menu";
import { MessageIcon } from "./MessageIcon";
import { MessageInbox } from "./MessageInbox";
import { MessageProvider } from "../../context/message";

export const Message = () => {
  const [showData, setShowData] = useState(false);

  return (
    <MessageProvider>
      <Menu
        handlerComponent={<MessageIcon />}
        showMenu={showData}
        setShowMenu={setShowData}
        menuClasses="!top-7 -right-4"
      >
        <MessageInbox setShowData={setShowData} />
      </Menu>
    </MessageProvider>
  );
};
