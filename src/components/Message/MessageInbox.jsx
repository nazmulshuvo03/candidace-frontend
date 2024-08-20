import { useContext } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";
import { NoData } from "../NoData";
import Link from "next/link";
import { MessageContext } from "../../context/message";

export const MessageInbox = ({ setShowData }) => {
  const { inboxMessages, handleMessageReadContext } =
    useContext(MessageContext);

  return (
    <div className="w-96 max-h-96 flex flex-col">
      <ul className="w-full flex-1 p-1 overflow-y-auto">
        {inboxMessages && inboxMessages.length ? (
          inboxMessages.map((msg) => (
            <li
              key={msg.id}
              className={`${
                msg.isRead ? "bg-white" : "bg-gray-100"
              } message-item px-4 py-2 shadow rounded-lg hover:bg-gray-100 cursor-pointer`}
              onClick={() => {
                handleMessageReadContext(msg);
                setShowData(false);
              }}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <img
                    src={msg.sender.photoURL}
                    alt={msg.sender.userName}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                    <div className="text-sm font-semibold">
                      {msg.sender.userName}
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
          ))
        ) : (
          <NoData
            size={80}
            message="You do not have any message at this moment"
          />
        )}
      </ul>
      <Link
        href="/dashboard/message"
        className="w-full text-center py-1 text-secondary font-bold"
        onClick={() => setShowData(false)}
      >
        See all...
      </Link>
    </div>
  );
};
