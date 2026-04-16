import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import CreateTrade from './components/CreateTrade';
import Profile from './components/Profile';
// import './App.css';
import EditProfile from './components/EditProfile';
import { TradeProvider } from './context/TradeContext';
import AvailableTrades from './components/AvailableTrades';
import TradeById from './components/TradeById';
import AllTrades from './components/AllTrades';
import MyInterestedTrades from './components/MyInterestedTrades';
import SearchPage from './components/SearchPage';
import { NotificationProvider } from './context/NotificationContext';
import { MessageProvider } from './context/MessageContext';
import { SocketProvider } from './providers/SocketProviders';
import MessagesPage from './components/Messages/MessagesPage';

function App() {
  return (
    <SocketProvider>
    <NotificationProvider>
    <TradeProvider>
    <MessageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-trade" element={<CreateTrade />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/my" element={<AvailableTrades />} />
          <Route path="/trades/:tradeId" element={<TradeById />} />
          <Route path="/trades" element={<AllTrades />} />
          <Route path="/mytrades" element={<MyInterestedTrades />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </Router>
      </MessageProvider>
    </TradeProvider>
    </NotificationProvider>
    </SocketProvider>

  );
}

export default App;