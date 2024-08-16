import { useEffect, useState } from "react";
import { fetchSentMessages } from "../../services/functions/message";

export const Sentbox = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const sentMessages = await fetchSentMessages();
        if (sentMessages && sentMessages.length) setMessages(sentMessages);
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
              className="message-item p-4 border border-gray-200 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <img
                    src={msg.receiver.photoURL}
                    alt={msg.receiver.userName}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                    <div className="text-sm font-semibold">
                      {msg.receiver.userName}
                    </div>
                    {msg.subject ? (
                      <div className="text-md">{msg.subject}</div>
                    ) : (
                      <div className="text-sm text-gray-700">
                        {msg.body.slice(0, 20)}...
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(msg.createdAt).toLocaleString()}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
