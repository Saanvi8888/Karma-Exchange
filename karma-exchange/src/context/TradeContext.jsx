import { messageAPI, tradeAPI } from "../services/api";
import React, { createContext, useContext, useState } from "react";

const TradeContext = createContext();

export const useTrade = () => {
  const context = useContext(TradeContext);
  if (!context) throw new Error("useTrade must be used within TradeProvider");
  return context;
};

export const TradeProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const [dashboardTrades, setDashboardTrades] = useState([]);
  const [allTrades, setAllTrades] = useState([]);
  const [myTrades, setMyTrades] = useState([]);
  const [interestedTrades, setInterestedTrades] = useState([]);
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pages: 1,
  });
  
  const fetchAllTrades = async (params = {}) => {
    try {
      setLoading(true);

      const res = await tradeAPI.getAllTrades(params);

      setAllTrades(res.data.data || []);
      setPagination(res.data.pagination || {});
    } catch (err) {
      console.error("fetchAllTrades error:", err);
    } finally {
      setLoading(false);
    }
  };
  const fetchDashboardTrades = async () => {
    try {
      setLoading(true);
      const res = await tradeAPI.getDashboardTrades();
      setDashboardTrades(res.data.data);
    } catch (err) {
      console.error("Dashboard trades error:", err);
    } finally {
      setLoading(false);
    }
  };
  const createTrade = async (tradeData) => {
    try {
      setLoading(true);

      const res = await tradeAPI.createTrade({
        ...tradeData,
        karmaValue: Number(tradeData.karmaValue),
      });

      return res.data;
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    } finally {
      setLoading(false);
    }
  };

  
  const fetchMyTrades = async () => {
    try {
      setLoading(true);
      const res = await tradeAPI.getMyTrades();
      setMyTrades(res.data.data);
    } catch (err) {
      console.error("My trades error:", err);
    } finally {
      setLoading(false);
    }
  };
  const fetchMyChatTrades = async () => {
    try {
      setLoading(true);
      const res = await tradeAPI.getMyChatTrades();
      setMyTrades(res.data.data); 
    } catch (err) {
      console.error(err);
      setMyTrades([]);
    } finally {
      setLoading(false);
    }
  };
  const fetchInterestedTrades = async () => {
    try {
      setLoading(true);
      const res = await tradeAPI.getInterestedTrades();
      setInterestedTrades(res.data.data);
    } catch (err) {
      console.error("Interested trades error:", err);
    } finally {
      setLoading(false);
    }
  };

    const fetchTradeById = async (id) => {
      if (!id) return null;

      try {
        const res = await tradeAPI.getTradeById(id);
        return res.data.data;
      } catch (err) {
        console.error("Trade by id error:", err);
        return null;
      }
    };

    const acceptTrade = async (id) => {
      try {
        const res = await tradeAPI.acceptTrade(id);
        return res.data;
      } catch (err) {
        return { success: false, message: err.response?.data?.message || err.message };
      }
    };
    const deleteTrade = async (id) => {
      try {
        const response = await tradeAPI.deleteTrade(id);
        return response.data;
      } catch (error) {
        return { success: false, message: error.message };
      }
    };
    const cancelTrade = async (id) => {
      try {
        const response = await tradeAPI.cancelTrade(id);
        return response.data;
      } catch (error) {
        return { success: false, message: error.message };
      }
    };

    const completeTrade=async(id)=>{
      try {
        const response = await tradeAPI.completeTrade(id);
        return response.data;
      } catch (error) {
        return {success:false,message:error.message}
        
      }
    }
  return (
    <TradeContext.Provider
      value={{
        loading,

        dashboardTrades,
        allTrades,
        myTrades,
        interestedTrades,
        selectedTrade,
        fetchDashboardTrades,
        fetchAllTrades,
        fetchMyTrades,
        fetchInterestedTrades,
        fetchTradeById,
        acceptTrade,
        createTrade,
        deleteTrade,
        cancelTrade,
        fetchMyChatTrades,
        completeTrade,
      }}
    >
      {children}
    </TradeContext.Provider>
  );
};
