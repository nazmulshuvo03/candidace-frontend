import { MessageProvider } from "../../context/message";
import { Chatbox } from "./Chatbox";

export const Chats = () => {
  return (
    <MessageProvider>
      <div>
        <Chatbox />
      </div>
    </MessageProvider>
  );
};
