import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTrade } from "../context/TradeContext";
import { useAuth } from "../context/AuthContext";
import { UserCard } from "./cards/UserCard";
import { Clock, ArrowLeft, MessageCircle, Edit3 } from "lucide-react";
import Header from "./Header";

import Sidebar from "./SideBar";
const TradeById = () => {
  const { tradeId } = useParams();
  const navigate = useNavigate();

  const { fetchTradeById, acceptTrade,completeTrade } = useTrade();
  const { user } = useAuth();
  const [isMenuOpen,setIsMenuOpen] = useState(false)
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [trade, setTrade] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasConfirmed, setHasConfirmed] = useState(false);
  useEffect(() => {
    if (!tradeId) return;

    const loadTrade = async () => {
      setLoading(true);
      const data = await fetchTradeById(tradeId);
      setTrade(data);
      setLoading(false);
    };

    loadTrade();
  }, [tradeId]);

  if (loading || !trade) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <p className="text-gray-400 text-center">Loading trade...</p>
      </div>
    );
  }

  const handleCompleteTrade=(trade)=>{
    setSelectedTrade(trade)
    setShowCompleteModal(true)
  }
  const confirmCompleteTrade = async () => {
    if (!selectedTrade) return;

    if (!hasConfirmed) {
      setHasConfirmed(true);
      setShowCompleteModal(false);
      return;
    }

    const result = await completeTrade(selectedTrade._id);

    if (result.success) {
      setTrade({ ...trade, status: "completed" });
    } else {
      alert(result.message || "Failed to complete trade");
    }

    setShowCompleteModal(false);
  };
  const isOwner = trade.user?._id === user?._id;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Header setIsMenuOpen={setIsMenuOpen}/>
      <Sidebar isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}/>
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="bg-white rounded-2xl border border-purple-200 shadow-sm p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">
            {trade.title}
          </h1>
          <span className={`
            shrink-0 px-3 py-1.5 text-xs font-medium rounded-full
            ${trade.status === 'active' 
              ? 'bg-green-50 text-green-600' 
              : trade.status === 'in-progress'
              ? 'bg-blue-50 text-blue-600'
              : 'bg-gray-50 text-gray-600'
            }
          `}>
            {trade.status}
          </span>
        </div>

        {trade.description && (
          <p className="text-gray-600 mb-8 pb-6 border-b border-purple-200">
            {trade.description}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wide">You offer</div>
            <div className="text-gray-900 bg-purple-50 rounded-lg px-4 py-3 capitalize">
              {trade.offer}
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wide">You get</div>
            <div className="text-gray-900 bg-purple-50 rounded-lg px-4 py-3 capitalize">
              {trade.lookingFor}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 mb-8 pb-6 border-b border-purple-200">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">{trade.duration} hours</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">Karma:</span>
            <span className="font-medium text-gray-900">{trade.karmaValue}</span>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="text-sm font-medium text-gray-400 mb-3">Posted by</div>
            <UserCard user={trade.user} />
          </div>

          {trade.acceptedBy && (
            <div>
              <div className="text-sm font-medium text-gray-400 mb-3">Accepted by</div>
              <UserCard user={trade.acceptedBy} />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
        <div className="flex gap-3">
          {trade.status === "in-progress" && (
            <div>
              <button
                onClick={() => navigate(`/messages?trade=${trade._id}`)}
                className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-green-800 hover:text-white transition-colors "
              >
                <MessageCircle className="w-4 h-4" />
                Message
              </button>
            </div>
          )}

          {/* {trade.status === "active" && (
            <button className="flex items-center gap-2 border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
          )} */}
          {showCompleteModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg">
                <h2 className="text-lg font-semibold text-gray-900">
                  Complete Trade?
                </h2>

                <p className="text-sm text-gray-600 mt-2">
                  {hasConfirmed
                    ? "The other user has already confirmed. Complete now?"
                    : "Are you sure you want to mark this trade as completed?"}
                </p>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setShowCompleteModal(false)}
                    className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={confirmCompleteTrade}
                    className="px-4 py-2 rounded-lg bg-green-600 text-white"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TradeById;

