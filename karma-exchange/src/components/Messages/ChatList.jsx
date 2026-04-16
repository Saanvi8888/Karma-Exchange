import React, { useEffect } from "react";
import { useTrade } from "../../context/TradeContext";
import { iconMaker } from "../../services/helper";
import { MessageCircle } from "lucide-react";
const ChatList = ({ onSelectTrade, activeTrade }) => {
  const { myTrades, fetchMyChatTrades, loading } = useTrade();

  useEffect(() => {
    fetchMyChatTrades();
  }, []);

  if (loading)
    return (
      <div className="w-full md:w-[300px] flex items-center justify-center text-slate-500 text-sm">
        Loading chats...
      </div>
    );

  return (
    <div className="w-full md:w-[350px] h-full overflow-y-auto border-r border-purple-100 bg-white flex-shrink-0">
      <div className="px-4 py-5 border-b border-purple-100 bg-purple-50 flex gap-3">
        <MessageCircle className="w-4 h-5 text-slate-900" />
        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
          My Trades Chat
        </h2>
      </div>

      {myTrades.length === 0 ? (
        <p className="text-center text-slate-400 text-sm mt-8">No chats yet</p>
      ) : (
        myTrades.map((trade) => {
          const isActive = activeTrade?._id === trade._id;
          const { icon: Icon, bg, color } = iconMaker(trade.category);

          return (
            <div
              key={trade._id}
              onClick={() => onSelectTrade(trade)}
              className={`
                flex items-center gap-3 px-4 py-4 border-b border-slate-200
                cursor-pointer transition-colors
                ${isActive
                  ? "bg-purple-50 border-l-4 border-l-purple-400"
                  : "hover:bg-slate-50 border-l-4 border-l-transparent"
                }
              `}
            >
              <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center flex-shrink-0`}>
                <Icon size={18} className={color} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-medium text-slate-800 capitalize text-sm truncate">
                  {trade.title || "Trade"}
                </p>
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-purple-50 text-purple-500 border border-purple-300">
                  {trade.status}
                </span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ChatList;