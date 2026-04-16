import React, { useState,useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Search, User, X, ArrowRight, Star, Shield, Users, Heart, Handshake } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();
  const [avatarFile, setAvatarFile] = useState(null);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    avatar:"",
  });

  const { register, login, authLoading, user, logout ,loading,updateAvatar } = useAuth();
   useEffect(() => {
      if (!loading && user) {
        navigate("/dashboard");
      }
    }, [loading, user, navigate]);


  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError("");

    if (!isLogin && formData.password.length < 6) {
      setAuthError("Password must be at least 6 characters");
      return;
    }

    try {
      let result;
      
      if (isLogin) {
        result = await login({
          email: formData.email,
          password: formData.password
        });
      } else {
        result = await register({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          avatar:formData.avatar,
        });
      }

      if (result.success) {
        setShowAuthPopup(false);
        setFormData({
          username: "",
          email: "",
          password: "",
          avatar:"",
        });
        navigate("/dashboard")
        console.log("Auth successful:", result.data);
      } else {
        setAuthError(result.message);
      }
    } catch (error) {
      setAuthError("An unexpected error occurred");
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (authError) setAuthError("");
  };

  const handleClosePopup = () => {
    setShowAuthPopup(false);
    setAuthError("");
    setFormData({
      username: "",
      email: "",
      password: "",
      avatar:"",
    });
  };

  const features = [
    { icon: <Heart className="w-6 h-6" />, title: "Build Trust", description: "Earn karma points through helpful exchanges" },
    { icon: <Users className="w-6 h-6" />, title: "Join Community", description: "Connect with local helpers and traders" },
    { icon: <Shield className="w-6 h-6" />, title: "Safe & Secure", description: "Verified users and secure transactions" },
    { icon: <Star className="w-6 h-6" />, title: "Grow Together", description: "Level up your skills and reputation" }
  ];
  
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-purple-50 via-white to-violet-50  relative overflow-hidden">

      <header className="w-full fixed top-0 z-30 bg-white/20 backdrop-blur-md border-b border-purple-200 px-8 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3 px-6">
          <Handshake className="w-7 h-7 text-purple-600"/>
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent px-3">
            Skill Swap
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-purple-700 font-medium">Welcome, {user.username}!</span>
              <button
                onClick={logout}
                className="bg-white hover:bg-emerald-50 text-purple-700 px-4 py-2 rounded-xl text-lg shadow border border-purple-200 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              
              <button
                onClick={() => setShowAuthPopup(true)}
                className="bg-white hover:bg-purple-600 hover:text-white text-purple-700 px-6 py-2 rounded-xl font-semibold shadow-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 border border-purple-700"
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </header>

      
      <main className="w-full min-h-screen flex items-center relative sm:p-8 z-10 ">
  <section className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12 max-w-7xl mx-auto w-full px-4 sm:px-6 py-10 lg:py-0">
    
    <div className="lg:w-1/2 space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start">
      
      <div className="space-y-6">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
          Trade skills.
          <span className="block bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
            Build trust.
          </span>
          <span className="block">Grow your Karma.</span>
        </h1>

        <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl">
          Join a friendly community where people exchange help and build meaningful connections — one kind act at a time.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-auto">
        <button
          onClick={() => setShowAuthPopup(true)}
          className="w-full sm:w-auto group bg-gradient-to-br from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
        >
          Get Started Free
        </button>
      </div>
    </div>

    
    <div className="lg:w-1/2 relative justify-center hidden lg:flex">
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-purple-200 to-violet-300 rounded-3xl blur-lg opacity-20 animate-pulse" />
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-2xl border border-white/50">
          <img 
            src="/131ace36d4f29414f0675b2357b8653e.gif" 
            alt="Community Exchange" 
            className="w-full max-w-md rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </div>

  </section>
</main>

      {showAuthPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={handleClosePopup}
          />
          <div className="relative bg-white rounded-2xl w-3/4 max-w-md shadow-xl transform transition-all duration-300 scale-100 ">
            <button 
              onClick={handleClosePopup}
              className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="p-8 pb-0">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {isLogin ? 'Welcome Back!' : 'Join Skill Swap'}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  {isLogin ? 'Sign in to your account' : 'Create your free account'}
                </p>
              </div>
            </div>

            <form onSubmit={handleAuth} className="p-8 pt-0 space-y-2">
              {authError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  {authError}
                </div>
              )}
              
              {!isLogin && (
                <div>
                  <label className="block text-sm  text-gray-900 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter your full name"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white mb-1"
                    required={!isLogin}
                    disabled={authLoading}
                  />
                </div>
              )}
              
              

              
              <div>
                <label className="block text-sm  text-gray-900 mb-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white mb-1"
                  required
                  disabled={authLoading}
                />
              </div>
              
              <div>
                <label className="block text-sm  text-gray-900 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder={isLogin ? "Enter your password" : "Create a password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white mb-1"
                  required
                  disabled={authLoading}
                />
              </div>
              
              <button 
                type="submit"
                disabled={authLoading}
                className="mt-2 w-full bg-gradient-to-br from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-2 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:transform-none shadow-lg hover:shadow-xl disabled:shadow"
              >
                {authLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                  </div>
                ) : (
                  isLogin ? 'Sign In' : 'Create Account'
                )}
              </button>
              
              <div className="text-center pt-4">
                <button 
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setAuthError("");
                  }}
                  disabled={authLoading}
                  className="text-gray-600 hover:text-gray-700 text-sm disabled:text-gray-500  transition-colors"
                >
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;