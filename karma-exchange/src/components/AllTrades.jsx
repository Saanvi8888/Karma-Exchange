import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrade } from "../context/TradeContext";
import Header from "./Header";
import Sidebar from "./SideBar";

const AllTrades = () => {
  const { allTrades, fetchAllTrades, loading, acceptTrade } = useTrade();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [acceptingId, setAcceptingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllTrades();
  }, []);

  const handleAccept = async (e, tradeId) => {
    e.stopPropagation(); 
    setAcceptingId(tradeId);
    const res = await acceptTrade(tradeId);
    if (res.success) {
      fetchAllTrades();
    }
    setAcceptingId(null);
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading trades...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-20">
      <Header setIsMenuOpen={setIsMenuOpen} />
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <h1 className="text-2xl font-semibold mb-6">All Trades</h1>

      {allTrades.length === 0 ? (
        <p className="text-gray-500">No trades found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {allTrades.map((trade) => (
            <div
              key={trade._id}
              onClick={() => navigate(`/trades/${trade._id}`)}
              className="bg-white rounded-xl border border-gray-100 p-5 cursor-pointer hover:border-blue-200 hover:shadow-lg transition-all duration-200 shadow-md"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <h3 className="font-medium text-gray-900 line-clamp-2">
                  {trade.title}
                </h3>

                <span className="text-xs font-medium text-blue-950 px-2 py-1 rounded-full bg-blue-100">
                  {trade.category}
                </span>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex gap-2">
                  <span className="text-gray-400 min-w-[70px]">
                    You give:
                  </span>
                  <span className="text-gray-700">{trade.offer}</span>
                </div>

                <div className="flex gap-2">
                  <span className="text-gray-400 min-w-[70px]">
                    You get:
                  </span>
                  <span className="text-gray-700">{trade.lookingFor}</span>
                </div>
              </div>

              <div className="flex justify-between mb-3">
                <div className="text-xs text-gray-400">
                  Posted by {trade.user?.username || "Unknown"}
                </div>
                <div className="text-xs text-blue-900">
                  {trade.karmaValue} pts.
                </div>
              </div>

              <button
                disabled={acceptingId === trade._id}
                onClick={(e) => handleAccept(e, trade._id)}
                className="w-full px-4 py-2 text-sm font-medium rounded-lg bg-green-100 text-green-700 hover:bg-green-200 disabled:opacity-50"
              >
                {acceptingId === trade._id ? "Accepting..." : "Accept"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTrades;