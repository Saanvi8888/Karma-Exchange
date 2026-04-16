import React, { useEffect } from "react";
import { useTrade } from "../context/TradeContext";
import { useAuth } from "../context/AuthContext";
import AvailableCard from "./cards/AvailableCard";
import { useNavigate } from "react-router-dom";
import { ArrowBigRight, ArrowRight, Plus } from "lucide-react";

const AvailableTrades = () => {
  const { fetchMyTrades, myTrades, loading,deleteTrade ,cancelTrade} = useTrade();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?._id) {
      fetchMyTrades();
    }
  }, [user]);

  // const myInterestedTrades = (myTrades || []).filter(
  //   (trade) => trade.user === user?._id || trade.acceptedBy === user?._id
  // );
  const myInterestedTrades = (myTrades || []).filter((trade) => {
    const tradeUserId =
      typeof trade.user === "object" ? trade.user._id : trade.user;

    const acceptedUserId =
      typeof trade.acceptedBy === "object"
        ? trade.acceptedBy?._id
        : trade.acceptedBy;

    return tradeUserId === user?._id || acceptedUserId === user?._id;
  });
  const handleEditTrade = (trade) => {
    navigate(`/edit-trade/${trade._id}`);
  };

  const handleDeleteTrade = async (trade) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trade?"
    );

    if (!confirmDelete) return;

    const result = await deleteTrade(trade._id);

    if (result.success) {
      fetchMyTrades();
    } else {
      alert(result.message || "Failed to delete trade");
    }
  };
  const handleClick = (id) => {
    navigate(`/trades/${id}`);
  };


  const handleCancelTrade = async (trade) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this trade?"
    );

    if (!confirmCancel) return;

    const result = await cancelTrade(trade._id);

    if (result.success) {
      fetchMyTrades();
    } else {
      alert(result.message || "Failed to cancel trade");
    }
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-2">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-5">
          <h1 className="text-2xl font-bold">My Trades</h1>
          <button
              onClick={() => navigate("/create-trade")}
              className="px-4 py-2 text-sm font-semibold rounded-xl text-black transition"
            >
            <div className="flex gap-3 items-center">
              <div className="bg-purple-200 text-purple-800   rounded-full p-2 hover:scale-120">
                <Plus className="w-3 h-3  text-purple font-semibold"/>
              </div>
               <div className="text-medium text-purple-700">Create Trade</div>
            </div>
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div
            onClick={() => navigate("/mytrades")}
            className="px-3 py-2 text-xs font-medium rounded-2xl whitespace-nowrap bg-blue-100 text-blue-950 flex items-center gap-1 cursor-pointer hover:bg-blue-200 transition"
          >
            See All <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
        <div className="p-3 rounded-3xl">
          {loading ? (
            <p className="text-gray-500">Loading trades...</p>
          ) : myInterestedTrades.length === 0 ? (
            <p className="text-gray-500">No interested trades yet.</p>
          ) : (
            <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2">
              {myInterestedTrades.slice(0, 3).map((trade) => (
                <AvailableCard
                  key={trade._id}
                  trade={trade}
                  onClick={() => handleClick(trade._id)}
                  onEdit={handleEditTrade}
                  onDelete={handleDeleteTrade}
                  onCancel={handleCancelTrade}
                />
              ))}
            </div>

          )}
        </div>  
    </div>
  );
};

export default AvailableTrades;
