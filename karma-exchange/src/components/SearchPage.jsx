import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./SideBar";
import AvailableCard from "./cards/AvailableCard";
import { useTrade } from "../context/TradeContext";

const SearchPage = () => {
  const { allTrades, fetchAllTrades, loading } = useTrade();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const searchTerm =
    new URLSearchParams(location.search).get("query") || "";

  useEffect(() => {
    if (searchTerm) {
      fetchAllTrades({
        search: searchTerm,
        page: 1,
        limit: 20,
      });
    }
  }, [searchTerm]);

  const handleClickTrade = (tradeId) => {
    navigate(`/trades/${tradeId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 ml-12">
      <Header setIsMenuOpen={setIsMenuOpen} />
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <div className="max-w-6xl mx-auto px-4 py-6 mt-20">
        <h1 className="text-xl text-slate-500 font-semibold mb-6">
          Search Results for "{searchTerm}"
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading trades...</p>
        ) : allTrades.length === 0 ? (
          <p className="text-center text-gray-500">
            No trades found for "{searchTerm}"
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {allTrades.map((trade) => (
              <AvailableCard
                key={trade._id}
                trade={trade}
                onClick={() => handleClickTrade(trade._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;