
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrade } from "../context/TradeContext";
import { useAuth } from "../context/AuthContext";
import AvailableCard from "./cards/AvailableCard"
import Header from "./Header";
import Sidebar from "./SideBar";

const MyInterestedTrades = () => {
const { fetchMyTrades, myTrades, loading, cancelTrade ,deleteTrade} = useTrade();
  const { user } = useAuth();
    const [isMenuOpen,setIsMenuOpen] = useState(false)
  
  const navigate = useNavigate();

  useEffect(() => {
    if (user?._id) {
      fetchMyTrades();
    }
  }, [user]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading trades...</p>;
  }

  const myInterestedTrades = (myTrades || []).filter((trade) => {
    const tradeUserId =
      typeof trade.user === "object" ? trade.user._id : trade.user;

    const acceptedUserId =
      typeof trade.acceptedBy === "object"
        ? trade.acceptedBy?._id
        : trade.acceptedBy;

    return tradeUserId === user?._id || acceptedUserId === user?._id;
  });

const handleCancelTrade = async (id) => {
  const result = await cancelTrade(id);

  if (result.success) {
    fetchMyTrades();
  } else {
    alert(result.message || "Failed to cancel trade");
  }
};
const handleDeleteTrade = async (id) => {

    const result = await deleteTrade(id);

    if (result.success) {
      fetchMyTrades();
    } else {
      alert(result.message || "Failed to delete trade");
    }
  };
  return (
    <div className="max-w-6xl mx-auto p-6">
      <Header setIsMenuOpen={setIsMenuOpen}/>
      <Sidebar isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}/>
      <h1 className="text-2xl font-semibold mb-6 mt-12">My Trades</h1>

      {myInterestedTrades.length === 0 ? (
        <p className="text-gray-500">No trades found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {myInterestedTrades.map((trade) => (
            <AvailableCard
              key={trade._id}
              trade={trade}
              onClick={() => navigate(`/trades/${trade._id}`)}
              onCancel={handleCancelTrade}  
              onDelete={handleDeleteTrade}          />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyInterestedTrades;
