import React, { createContext, useContext, useEffect, useState } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [spotlight,setSpotlight] = useState([])
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await authAPI.getProfile();
      setUser(res.data.data);
    } catch {
      logoutLocal();
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    setAuthLoading(true);
    try {
      const res = await authAPI.register(data);
      localStorage.setItem("token", res.data.data.token);
      await checkAuth(); 
      return { success: true };
    } catch (err) {
      return error(err);
    } finally {
      setAuthLoading(false);
    }
  };

  const fetchSpotlight=async()=>{
    setAuthLoading(true);
    try {
      const res = await authAPI.communitySpotlight();
      setSpotlight(res.data.data || [])
    } catch (error) {
      console.error(error)
    }finally{
      setAuthLoading(false)
    }
  }
  const login = async (data) => {
    setAuthLoading(true);
    try {
      const res = await authAPI.login(data);
      localStorage.setItem("token", res.data.data.token);
      await checkAuth(); 
      return { success: true };
    } catch (err) {
      return error(err);
    } finally {
      setAuthLoading(false);
    }
  };

  const updateProfile = async (data) => {
    try {
      await authAPI.updateProfile(data);
      await checkAuth();
      return { success: true };
    } catch (err) {
      return error(err);
    }
  };

  const updateAvatar = async (avatar) => {
    try {
      await authAPI.updateAvatar(avatar);
      await checkAuth();
      return { success: true };
    } catch (err) {
      return error(err);
    }
  };

  
  const logoutLocal = () => {
    localStorage.removeItem("token"); 
    setUser(null);                     
  };

  const logout = async () => {
    try {
     
      await authAPI.logout(); 
    } catch (err) {
      console.error("Logout API failed:", err.response?.data?.message || err.message);
    } finally {
      logoutLocal();
    }
  };

  const error = (err) => ({
    success: false,
    message: err?.response?.data?.message || err?.message || "Something went wrong",
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authLoading,
        isAuthenticated: !!user,
        spotlight,
        fetchSpotlight,
        register,
        login,
        logout,
        updateProfile,
        updateAvatar,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
