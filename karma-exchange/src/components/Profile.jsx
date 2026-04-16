import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../services/api";
import { useNavigate } from "react-router-dom";
import { User, Mail, MapPin, Award, Edit3, ArrowLeft } from "lucide-react";
import Header from "./Header";
import Sidebar from "./SideBar";
import { getInitials } from "../services/helper";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await authAPI.getProfile();
        if (response.data.success) {
          setProfile(response.data.data);
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header setIsMenuOpen={setIsMenuOpen} />
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-gray-500">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header setIsMenuOpen={setIsMenuOpen} />
        <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <div className="max-w-md mx-auto px-4 py-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-medium text-gray-900 mb-2">Profile not found</h2>
          <p className="text-gray-500 text-sm">We couldn't load your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 ">
      <Header setIsMenuOpen={setIsMenuOpen} />
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div className="max-w-4xl mx-auto px-4 py-8 my-12">
        
        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <div className="bg-white rounded-2xl border border-purple-200 shadow-sm p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div></div>
            <h1 className="text-2xl font-medium text-gray-900 ">MY PROFILE</h1>
            <button 
              onClick={() => navigate('/edit-profile')}
              className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-xl text-sm hover:bg-purple-00 transition"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
          </div>

          <div className="space-y-4">
            <div className="  p-6">
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 bg-gray-900 rounded-full bg-purple-500 flex items-center justify-center text-white text-xl font-medium">
                  {getInitials(profile.username)}
                </div>
                
                <div className="flex-1">
                  <h2 className="text-xl font-medium text-gray-900 mb-1 uppercase">{profile.username}</h2>
                  <p className="text-sm text-gray-500 mb-3">{profile.email}</p>
                  
                  <div className="inline-flex items-center gap-1.5 bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-100">
                    <Award className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-purple-600">{profile.karma || 0} karma</span>
                  </div>
                  
                </div>
                
              </div>
            </div>
            <div className="border border-gray-200 "></div>
            {profile.bio && (
              <div className="px-6 py-2">
                <h3 className="text-sm font-medium text-gray-700 mb-3">About</h3>
                <p className="text-gray-600 leading-relaxed">{profile.bio}</p>
              </div>
            )}
            <div className="border border-gray-200 "></div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm  p-6">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Contact</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-purple-400" />
                    <span className="text-gray-600">{profile.email}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200  shadow-sm p-6">
                <h3 className="text-sm font-medium text-gray-700 mb-4">Skills</h3>
                {profile.skills?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill) => (
                      <span
                        key={skill._id}
                        className="bg-purple-50 px-3 py-1.5 rounded-lg text-sm text-gray-700 border border-purple-100"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400">No skills added</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;