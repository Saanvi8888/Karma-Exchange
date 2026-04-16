import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrade } from "../context/TradeContext";
import DashboardTradeCard from "./cards/DashboardTradeCard";
import { ArrowRight } from "lucide-react";

const DashboardAvailableTrades = () => {
  const {
    dashboardTrades,
    fetchDashboardTrades,
    fetchAllTrades,
    acceptTrade,
    loading,
  } = useTrade();

  const [acceptingId, setAcceptingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardTrades();
  }, []);

  const handleAccept = async (tradeId) => {
    setAcceptingId(tradeId);
    const res = await acceptTrade(tradeId);

    if (res.success) {
      fetchDashboardTrades();

      fetchAllTrades({ type: "interested" });
    }

    setAcceptingId(null);
  };

  return (
    <div className=" rounded-2xl   p-5">
      
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Latest Trades
        </h2>

         <div className="flex items-center gap-3">
          

          <div
            onClick={() => navigate("/trades")}
            className="px-3 py-2 text-xs font-medium rounded-2xl whitespace-nowrap bg-blue-100 text-blue-950 flex items-center gap-1 cursor-pointer hover:bg-blue-200 transition"
          >
            See All <ArrowRight className="w-4 h-4" />
          </div>
        </div> 
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading trades...</p>
      ) : dashboardTrades.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No trades available right now.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {dashboardTrades.map((trade) => (
            <DashboardTradeCard
              key={trade._id}
              trade={trade}
              accepting={acceptingId === trade._id}
              onAccept={handleAccept}
              onClick={() => navigate(`/trades/${trade._id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardAvailableTrades;
