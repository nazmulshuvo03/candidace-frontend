import { useEffect, useState } from "react";
import { fetchAllMessages } from "../../services/functions/message";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setChat } from "../../store/slices/global";

export const AllMessage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const inboxMessages = await fetchAllMessages();
        if (inboxMessages && inboxMessages.length) setMessages(inboxMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    loadMessages();
  }, []);

  return (
    <div className="inbox-container p-4">
      {messages.length === 0 ? (
        <p>No messages in your inbox</p>
      ) : (
        <ul className="message-list space-y-2">
          {messages.map((msg) => (
            <li
              key={msg.id}
              className={`${
                msg.isRead ? "bg-white" : "bg-gray-100"
              } message-item px-4 py-2 shadow rounded-lg hover:bg-gray-100 cursor-pointer`}
              onClick={() =>
                dispatch(
                  setChat(
                    msg.sender.id === profile.id ? msg.receiver : msg.sender
                  )
                )
              }
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <img
                    src={
                      msg.sender.id === profile.id
                        ? msg.receiver.photoURL
                        : msg.sender.photoURL
                    }
                    alt={
                      msg.sender.id === profile.id
                        ? msg.receiver.userName
                        : msg.sender.userName
                    }
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                    <div className="text-sm font-semibold">
                      {msg.sender.id === profile.id
                        ? msg.receiver.userName
                        : msg.sender.userName}
                    </div>
                    {msg.subject ? (
                      <div className="text-md">{msg.subject}</div>
                    ) : (
                      <div className="text-sm text-gray-700">
                        {msg.sender.id === profile.id ? "You: " : ""}
                        {msg.body.slice(0, 20)}...
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <FontAwesomeIcon
                    icon={msg.isRead ? faEnvelopeOpen : faEnvelope}
                    className="w-3 h-3 text-gray-500"
                  />
                  <div className="text-xs text-gray-500">
                    {moment(msg.createdAt).fromNow()}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
