import { useSelector } from "react-redux";

export const Chat = ({ message }) => {
  const profile = useSelector((state) => state.user.profile);

  return (
    <div
      className={`message mb-2 flex ${
        message.senderId === profile.id ? "justify-end" : "justify-start"
      }`}
    >
      {message.sender && message.senderId !== profile.id && (
        <img
          src={message.sender.photoURL}
          alt={message.sender.userName}
          className="w-8 h-8 rounded-full mr-2"
        />
      )}
      <div
        className={`message-content text-sm px-2 py-1 rounded-lg ${
          message.senderId === profile.id
            ? "bg-primary text-white"
            : "bg-gray-300 text-black"
        }`}
      >
        {message.body}
      </div>
      {message.sender && message.senderId === profile.id && (
        <img
          src={message.sender.photoURL}
          alt={message.sender.userName}
          className="w-8 h-8 rounded-full ml-2"
        />
      )}
    </div>
  );
};
