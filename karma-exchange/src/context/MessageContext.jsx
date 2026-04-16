
import React, { createContext, useContext, useEffect, useState } from "react";
import { messageAPI } from "../services/api";
import { useAuth } from "./AuthContext"; 
import { socket } from "../services/socket"; 

const MessageContext = createContext();

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage must be used within MessageProvider");
  }
  return context;
};


export const MessageProvider = ({ children }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTradeId, setActiveTradeId] = useState(null);

  const getTradeMessages = async (tradeId) => {
    setLoading(true);
    setActiveTradeId(tradeId);

    try {
      const res = await messageAPI.getTradeMessages(tradeId);
      setMessages(res.data);
    } catch (error) {
      console.error("Fetch messages error:", error);
    } finally {
      setLoading(false);
    }
  };

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const sendMessage = async ({ tradeId, content }) => {
    try {
      const res = await messageAPI.sendMessage({ tradeId, content });
      return res.data;
    } catch (error) {
      console.error("Send message error:", error);
      throw error;
    }
  };

  const markMessagesAsRead = async (tradeId) => {
    try {
      await messageAPI.markMessagesAsRead(tradeId);

      setMessages((prev) =>
        prev.map((m) =>
          m.receiver === user._id ? { ...m, isRead: true } : m
        )
      );
    } catch (error) {
      console.error("Mark read error:", error);
    }
  };

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message) => {
      if (message.trade === activeTradeId) {
        setMessages((prev) => {
          const exists = prev.some((m) => m._id === message._id);
          if (exists) return prev;
          return [...prev, message];
        });
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [activeTradeId]);

  const clearMessages = () => {
    setMessages([]);
    setActiveTradeId(null);
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        loading,
        activeTradeId,
        getTradeMessages,
        sendMessage,
        markMessagesAsRead,
        clearMessages,
        addMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContext;

