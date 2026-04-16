import { Plus, Search, MessageCircle, CirclePlus, Send, Bell, UserRound, ArrowLeftRight, ArrowUpDown, FileCog } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isMenuOpen }) => {
  const navigate = useNavigate();
  return (
    
    <aside
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] border-r border-slate-200 shadow-xl transition-all duration-300 z-50 bg-white/70 backdrop-blur-lg ${isMenuOpen ? "w-44 translate-x-0" : "w-12 md:translate-x-0 -translate-x-full"} md:block`}
    >

      <nav className="p-3 space-y-2">
        <SidebarItem
          icon={<FileCog className="w-5 h-5 text-purple-700 font-bold" />}
          label="Edit profile"
          isMenuOpen={isMenuOpen}
          onClick={()=>navigate("/edit-profile")}
        />
        <SidebarItem
          icon={<CirclePlus className="w-5 h-5 text-purple-700 font-bold" />}
          label="Create Trade"
          isMenuOpen={isMenuOpen}
          onClick={()=>navigate("/create-trade")}
        />
        <SidebarItem
          icon={<ArrowUpDown className="w-5 h-5 text-purple-700 font-bold" />}
          label="Swap Trades"
          isMenuOpen={isMenuOpen}
          onClick={()=>navigate("/trades")}
        />
        <SidebarItem
          icon={<Send className="w-5 h-5 text-purple-700 font-bold" />}
          label="Messages"
          isMenuOpen={isMenuOpen}
          onClick={()=>navigate("/messages")}
        />
        <SidebarItem
          icon={<UserRound className="w-5 h-5 text-purple-700 font-bold" />}
          label="My Profile"
          isMenuOpen={isMenuOpen}
          onClick={()=>navigate("/profile")}
        />
      </nav>
    </aside>
  );
};

const SidebarItem = ({ icon, label, isMenuOpen,onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center ${isMenuOpen ? "gap-4 px-4" : "justify-center px-0"} py-3 rounded-xl hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 transition`}>
    {icon}
    {isMenuOpen && (
      <span className="text-sm font-medium whitespace-nowrap">
        {label}
      </span>
      
    )}
  </button>
);

export default Sidebar;
