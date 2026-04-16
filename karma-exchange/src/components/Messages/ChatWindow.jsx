import React, { useEffect, useRef, useState } from "react";
import { useMessage } from "../../context/MessageContext";
import { useSocket } from "../../providers/SocketProviders";
import { useAuth } from "../../context/AuthContext";
import { tradeAPI } from "../../services/api";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { iconMaker } from "../../services/helper";
import { CheckCircle, X } from "lucide-react";

const CompleteConfirmModal = ({ onConfirm, onCancel }) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-slate-800 text-sm">Mark Trade as Complete?</h3>
        <button onClick={onCancel} className="text-slate-400 hover:text-slate-600">
          <X size={16} />
        </button>
      </div>
      <p className="text-slate-700 text-xs leading-relaxed mb-5">
        This confirms that you've fulfilled your side of the trade. 
        The trade will only be marked complete once <span className="font-medium text-slate-700">both users confirm</span>.
      </p>
      <div className="flex gap-2">
        <button
          onClick={onCancel}
          className="flex-1 text-xs px-4 py-2 rounded-full border border-slate-600 text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 text-xs px-4 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 transition-colors font-medium"
        >
          Yes, Confirm
        </button>
      </div>
    </div>
  </div>
);

const ChatWindow = ({ trade, currentUser }) => {
  const { messages, getTradeMessages, sendMessage, addMessage } = useMessage();
  const { user } = useAuth();
  const socket = useSocket();
  const messagesEndRef = useRef(null);
  const [completing, setCompleting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [localTrade, setLocalTrade] = useState(trade);

  useEffect(() => {
    setLocalTrade(trade);
  }, [trade]);

  useEffect(() => {
    if (!trade?._id) return;
    getTradeMessages(trade._id);
    socket.emit("join_trade", trade._id);
    return () => socket.emit("leave_trade", trade._id);
  }, [trade?._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!trade) return (
    <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
      Select a chat to get started
    </div>
  );

  const handleSend = async (content) => {
    if (!content.trim()) return;
    try {
      await sendMessage({ tradeId: trade._id, content });
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const hasCurrentUserConfirmed = localTrade?.completionConfirmedBy?.some(
    (id) => id === user?._id || id?._id === user?._id
  );

  const handleCompleteClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmed = async () => {
    setShowConfirmModal(false);
    setCompleting(true);
    try {
      const res = await tradeAPI.completeTrade(trade._id);
      const { status } = res.data;

      if (status === "awaiting_confirmation") {
        addMessage({
          _id: `system-${Date.now()}`,
          type: "system",
          content: `${user.username} has marked this trade as complete. Waiting for the other user to confirm.`,
          trade: trade._id,
          createdAt: new Date().toISOString(),
        });
        setLocalTrade((prev) => ({
          ...prev,
          completionConfirmedBy: [...(prev.completionConfirmedBy || []), user._id],
        }));
      } else if (status === "completed") {
        addMessage({
          _id: `system-${Date.now()}`,
          type: "system",
          content: "Congrats! Both users confirmed! This trade has been completed successfully.",
          trade: trade._id,
          createdAt: new Date().toISOString(),
        });
        setLocalTrade((prev) => ({ ...prev, status: "completed" }));
      }
    } catch (err) {
      console.error("Complete trade error:", err);
    } finally {
      setCompleting(false);
    }
  };

  const { icon: Icon, bg, color } = iconMaker(trade.category);
  const isCompleted = localTrade?.status === "completed";

  return (
    <>
      {showConfirmModal && (
        <CompleteConfirmModal
          onConfirm={handleConfirmed}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="px-5 py-5 border-b border-purple-100 bg-purple-50 flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full ${bg} flex items-center justify-center flex-shrink-0`}>
            <Icon size={15} className={color} />
          </div>
          <h3 className="font-semibold text-slate-800 capitalize text-sm">
            {trade.title || "Chat"}
          </h3>

          <div className="ml-auto flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded-full border ${
              isCompleted
                ? "bg-green-50 text-green-700 border-green-600"
                : "bg-purple-50 text-purple-500 border-purple-500"
            }`}>
              {isCompleted ? "completed" : "in-progress"}
            </span>

            {!isCompleted && (
              <button
                onClick={handleCompleteClick}
                disabled={completing || hasCurrentUserConfirmed}
                title={hasCurrentUserConfirmed ? "Waiting for the other user to confirm" : "Mark trade as complete"}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-all ${
                  hasCurrentUserConfirmed
                    ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                    : "bg-white text-green-600 border-green-400 hover:bg-green-50 cursor-pointer"
                }`}
              >
                
                {hasCurrentUserConfirmed ? "Awaiting other user" : completing ? "Confirming..." : "Mark Complete"}
              </button>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
          {messages.length === 0 && (
            <p className="text-center text-slate-400 text-sm mt-6">
              No messages yet - start the conversation ! (Send meet link for skill trading)
            </p>
          )}
          {messages.map((msg) => (
            <MessageBubble key={msg._id} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {!isCompleted ? (
          <div className="border-t border-purple-100 bg-white px-4 py-4">
            <MessageInput onSend={handleSend} />
          </div>
        ) : (
          <div className="border-t border-green-100 bg-green-100 px-4 py-3 text-center text-xs text-green-700 font-medium">
            This trade has been completed
          </div>
        )}
      </div>
    </>
  );
};

export default ChatWindow;