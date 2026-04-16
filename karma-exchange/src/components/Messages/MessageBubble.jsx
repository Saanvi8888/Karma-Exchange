import React from "react";
import { useAuth } from "../../context/AuthContext";

const MessageBubble = ({ message }) => {
  const { user } = useAuth();

  const senderId =
    typeof message.sender === "object"
      ? message.sender._id
      : message.sender;

  const isMine = senderId === user?._id;

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div
        className={`
          max-w-[70%] px-4 py-2.5 text-sm leading-relaxed rounded-2xl
          ${
            isMine
              ? "bg-purple-500 text-white rounded-br-sm"
              : "bg-slate-100 text-slate-800 rounded-bl-sm"
          }
        `}
      >
        {message.content}
      </div>
    </div>
  );
};

export default MessageBubble;