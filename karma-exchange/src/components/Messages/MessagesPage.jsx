import React, { useState } from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import Header from "../Header";
import Sidebar from "../SideBar";

const MessagesPage = () => {
  const [selectedTrade, setSelectedTrade] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSelectTrade = (trade) => {
    setSelectedTrade(trade);
  };

  const handleBack = () => {
    setSelectedTrade(null);
  };

  return (
    <div className="">
      <Header setIsMenuOpen={setIsMenuOpen} />
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <div className=" w-[1250px] max-w-[90%] h-[580px] mx-auto mt-20 mb-7 flex bg-white rounded-xl shadow-md overflow-hidden">

        <div className={`
          ${selectedTrade ? "hidden md:flex" : "flex"} w-full md:w-auto
        `}>
          <ChatList onSelectTrade={handleSelectTrade} />
        </div>

        <div className={`
          ${selectedTrade ? "flex" : "hidden md:flex"}
          flex-1 flex-col
        `}>
          {selectedTrade ? (
            <>
              <button
                onClick={handleBack}
                className="md:hidden flex items-center gap-1 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 border-b border-slate-200"
              >
                 Back to chats
              </button>
              <ChatWindow trade={selectedTrade} currentUser/>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-500 text-sm">
              Select a chat
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default MessagesPage;