import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./SideBar";
import AvailableCard from "./cards/AvailableCard";
import { useTrade } from "../context/TradeContext";
import { X } from "lucide-react";

const SearchPage = () => {
  const { allTrades, fetchAllTrades, loading } = useTrade();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const inputRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlQuery =
      new URLSearchParams(location.search).get("query") || "";
    setQuery(urlQuery);
  }, [location.search]);

  useEffect(() => {
    const delay = setTimeout(() => {
      const currentQuery =
        new URLSearchParams(location.search).get("query") || "";

      if (query.trim()) {
        fetchAllTrades({
          search: query,
          page: 1,
          limit: 20,
        });

        if (query !== currentQuery) {
          navigate(`/search?query=${encodeURIComponent(query)}`, {
            replace: true,
          });
        }
      } else {
        fetchAllTrades();
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [query, location.search]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleClickTrade = (tradeId) => {
    navigate(`/trades/${tradeId}`);
  };

  const clearSearch = () => {
    setQuery("");
    navigate("/search");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header setIsMenuOpen={setIsMenuOpen} />
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <div className="max-w-6xl mx-auto px-4 py-6 mt-20">
        <div className="mb-6 relative">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills, trades..."
            className="w-full px-4 py-3 pr-10 rounded-xl bg-white border border-gray-200 shadow-sm 
            focus:ring-2 focus:ring-indigo-200 outline-none"
          />

          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <h1 className="text-xl text-slate-500 font-semibold mb-6">
          {query ? `Search Results for "${query}"` : "All Trades"}
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Searching...</p>
        ) : allTrades.length === 0 ? (
          <p className="text-center text-gray-500">
            No trades found {query && `for "${query}"`}
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