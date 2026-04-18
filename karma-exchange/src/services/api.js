import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => API.post("/auth/register", data),
  login: (data) => API.post("/auth/login", data),
  logout: () => API.post("/auth/logout"),
  communitySpotlight:()=> API.get("/auth/community-spotlight"),
  getProfile: () => API.get("/auth/profile"),

  updateProfile: (data) =>
    API.put("/auth/update-profile", data),

  updateAvatar: (avatar) =>
    API.put("/auth/update-avatar", { avatar }),

};
export const tradeAPI = {
  createTrade: (data) => API.post("/trades", data),
  trendingSkills: () => API.get("/trades/trending-skills"),
  getDashboardTrades: (params = {}) =>
    API.get("/trades/dashboard", { params }),
  getAllTrades: (params = {}) =>
    API.get("/trades", { params }),
  getInterestedTrades: () => API.get("/trades/my-trades"),

  getMyTrades: () => API.get("/trades/my"),
  getMyChatTrades: () => API.get("/trades/my-chats"),
  deleteTrade: (id) => API.delete(`/trades/${id}`),
  cancelTrade: (id) => API.post(`/trades/${id}/cancel`),
  acceptTrade: (id) => API.post(`/trades/${id}/accept`),
  getTradeById:(id)=> API.get(`/trades/${id}?t=${Date.now()}`),
  completeTrade:(id)=>API.post(`/trades/${id}/complete`),
  
};
export const notificationAPI = {
  getUserNotifications:()=>API.get("/notifications")
}
export const messageAPI = {
  sendMessage:(data)=>API.post("/messages",data),
  getTradeMessages:(tradeId)=>API.get(`/messages/${tradeId}`),
  markMessagesAsRead:(tradeId)=>API.patch(`/messages/read/${tradeId}`),
  getUserChats: () => API.get("/messages"),
}
export default API;
