import React, { useState } from "react";
import { Search, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";
import NotificationCard from "./NotificationCard";

const Header = ({ setIsMenuOpen }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const query = searchTerm.trim();
    if (query) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-40 h-16 bg-white/80 backdrop-blur-lg border-b border-slate-200/60">
      
      <div className="px-3 sm:px-6 h-full flex items-center justify-between">

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="p-2 hover:bg-slate-100 rounded-lg transition"
          >
            <Menu className="w-5 h-5 text-slate-600" />
          </button>

          <h1
            className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            SkillSwap
          </h1>
        </div>

        <div className="hidden md:flex flex-1 max-w-xl mx-4 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search skills..."
            className="w-full pl-12 pr-4 py-2 rounded-xl bg-slate-100 focus:ring-2 focus:ring-indigo-200 outline-none"
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-3">

          <button
            onClick={() =>
              navigate(
                searchTerm
                  ? `/search?query=${encodeURIComponent(searchTerm)}`
                  : "/search"
              )
            }
            className="p-2 md:hidden hover:bg-slate-100 rounded-lg transition"
          >
            <Search className="w-5 h-5 text-slate-600" />
          </button>

          <NotificationCard />
          <UserProfile />
        </div>
      </div>
    </header>
  );
};

export default Header;