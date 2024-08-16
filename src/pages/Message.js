import { AllMessage } from "../components/Message/AllMessage";
import { MessageProvider } from "../context/message";

const Message = () => {
  return (
    <MessageProvider>
      <AllMessage />
    </MessageProvider>
  );
};

export default Message;
