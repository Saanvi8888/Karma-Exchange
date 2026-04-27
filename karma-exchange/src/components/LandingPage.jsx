import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { X, Heart, Users, Shield, Star, Handshake, ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [authError, setAuthError] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: "",
  });

  const { register, login, authLoading, user, logout, loading, updateAvatar } = useAuth();

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
        result = await login({ email: formData.email, password: formData.password });
      } else {
        result = await register({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          avatar: formData.avatar,
        });
      }

      if (result.success) {
        setShowAuthPopup(false);
        setFormData({ username: "", email: "", password: "", avatar: "" });
        navigate("/dashboard");
      } else {
        setAuthError(result.message);
      }
    } catch (error) {
      setAuthError("An unexpected error occurred");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (authError) setAuthError("");
  };

  const handleClosePopup = () => {
    setShowAuthPopup(false);
    setAuthError("");
    setFormData({ username: "", email: "", password: "", avatar: "" });
  };

  const features = [
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Build Trust",
      description: "Earn karma points through helpful exchanges",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Join Community",
      description: "Connect with local helpers and traders",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Safe & Secure",
      description: "Verified users ",
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: "Connect with each other",
      description: "Use chat to connect with your trader",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 relative overflow-hidden">

      <div className="absolute top-[-80px] left-[-80px] w-[340px] h-[340px] bg-purple-200 rounded-full opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-60px] right-[-60px] w-[280px] h-[280px] bg-violet-300 rounded-full opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-100 rounded-full opacity-10 blur-3xl pointer-events-none" />

      <header className="fixed top-0 w-full z-30 bg-white/60 backdrop-blur-lg border-b border-purple-100 px-6 py-3">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="bg-gradient-to-br from-purple-500 to-violet-600 p-1.5 rounded-lg">
              <Handshake className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-purple-700 to-violet-600 bg-clip-text text-transparent">
              Skill Swap
            </span>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-purple-700 font-medium hidden sm:block">
                  Welcome, {user.username}!
                </span>
                <button
                  onClick={logout}
                  className="text-sm text-purple-600 hover:text-purple-800 font-medium px-4 py-2 rounded-xl border border-purple-200 hover:bg-purple-50 transition-all duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowAuthPopup(true)}
                className="text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 px-5 py-2 rounded-xl shadow-md hover:shadow-purple-200 hover:shadow-lg transition-all duration-200 active:scale-95"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 text-xs font-semibold px-4 py-1.5 rounded-full border border-purple-200">
              <Sparkles className="w-3.5 h-3.5" />
              Community-powered skill exchange
            </div>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-5">
              Trade skills.{" "}
              <span className="bg-gradient-to-r from-purple-600 to-violet-500 bg-clip-text text-transparent">
                Build trust.
              </span>
              <br />
              Grow your Karma.
            </h1>
            <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
              Join a friendly community where people exchange help and build meaningful
              connections — one kind act at a time.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
            <button
              onClick={() => setShowAuthPopup(true)}
              className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-purple-300 hover:shadow-xl transition-all duration-200 active:scale-95"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group bg-white/70 backdrop-blur-sm border border-purple-100 hover:border-purple-300 rounded-2xl p-5 shadow-sm hover:shadow-md hover:shadow-purple-100 transition-all duration-200 hover:-translate-y-1"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-violet-100 group-hover:from-purple-200 group-hover:to-violet-200 rounded-xl flex items-center justify-center text-purple-600 mb-3 transition-colors duration-200">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-gray-800 text-sm mb-1">{feature.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

        </div>
      </main>

      {showAuthPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={handleClosePopup}
          />
          <div className="relative bg-white rounded-2xl w-full max-w-sm shadow-2xl shadow-purple-200/50 border border-purple-100">

            <button
              onClick={handleClosePopup}
              className="absolute top-3.5 right-3.5 w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 transition-all duration-150"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="px-7 pt-7 pb-5 border-b border-gray-100">
              
              <h2 className="text-xl font-bold text-gray-900">
                {isLogin ? "Welcome back!" : "Join Skill Swap"}
              </h2>
              <p className="text-sm text-gray-400 mt-0.5">
                {isLogin ? "Sign in to your account" : "Create your free account"}
              </p>
            </div>

            <form onSubmit={handleAuth} className="px-7 py-5 space-y-3.5">

              {authError && (
                <div className="flex items-start gap-2.5 bg-red-50 border border-red-100 border-l-4 border-l-red-400 text-red-600 px-4 py-3 rounded-xl text-sm">
                  {authError}
                </div>
              )}

              {!isLogin && (
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter your full name"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-40 focus:border-purple-400 transition-all duration-200 placeholder:text-gray-300"
                    required={!isLogin}
                    disabled={authLoading}
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-40 focus:border-purple-400 transition-all duration-200 placeholder:text-gray-300"
                  required
                  disabled={authLoading}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder={isLogin ? "Enter your password" : "Create a password (min 6 chars)"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-40 focus:border-purple-400 transition-all duration-200 placeholder:text-gray-300"
                  required
                  disabled={authLoading}
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-2.5 rounded-xl transition-all duration-200 active:scale-95 disabled:scale-100 shadow-md hover:shadow-purple-200 hover:shadow-lg mt-1"
              >
                {authLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {isLogin ? "Signing in..." : "Creating account..."}
                  </div>
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </button>

              <p className="text-center text-sm text-gray-400 pt-1">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => { setIsLogin(!isLogin); setAuthError(""); }}
                  disabled={authLoading}
                  className="text-purple-600 hover:text-purple-700 font-semibold transition-colors duration-150"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;