import React, { useState } from "react";

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    onSend(trimmed);
    setText("");
  };

  return (
    <form
      onSubmit={handleSend}
      className="flex items-center gap-3 px-4 py-3 bg-white"
    >
      <input
        type="text"
        placeholder="Type a message.."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="
          flex-1 px-4 py-2 rounded-full border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
      />

      <button
        type="submit"
        className="
          px-4 py-2 rounded-full bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;