import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut, Settings } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import {getInitials} from "../services/helper"
const UserProfile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const dropdownRef = useRef(null);

  const [showDropdown, setShowDropdown] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: ""
  });

  useEffect(() => {
    if (user) {
      setUserData({
        username: user.username || "",
        email: user.email || ""
      });
    }
  }, [user]);
 useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    try {
      await logout(); 
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      navigate("/"); 
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-2 bg-purple-100 px-3 py-1 rounded-full hover:bg-purple-200 transition-colors"
      >
        <User className="w-4 h-4 text-purple-900" />
        <span className="font-semibold  text-purple-900">
          {userData.username?.split(" ")[0] || "User"}
        </span>
      </button>

      
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-70 bg-white rounded-xl shadow-xl border border-gray-200 z-50"
        >
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div
                className="w-10 h-10 bg-purple-700 text-white font-semibold rounded-full flex items-center justify-center cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                {getInitials(userData.username)}
              </div>
              <div>
                <h3 className="font-semibold">{userData.username}</h3>
                <p className="text-sm text-purple-700">{userData.email}</p>
              </div>
            </div>
          </div>

          <div className="p-2">
            <button
              onClick={() => {
                setShowDropdown(false);
                navigate("/edit-profile");
              }}
              className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Settings className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">Edit Profile</span>
            </button>

            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-red-600"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
