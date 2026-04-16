import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, X, Plus, User, Info } from "lucide-react";
import Header from "./Header";
import Sidebar from "./SideBar";

const CATEGORIES = [
  'Programming & Tech Skills',
  'Academic Tutoring',
  'Languages & Communication',
  'Design & Creative Skills',
  'Music & Performing Arts',
  'Fitness, Yoga & Sports',
  'Personal Development',
  'Business & Marketing',
  'Cooking & Baking',
  'Handicrafts & DIY',
  'Photography & Video',
  'Lifestyle & Wellness',
  'Gardening & Sustainability',
  'Home & Practical Skills',
  'Other'
];

const EditProfile = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    bio: "",
    skills: [],
    newSkill: "",
    newCategory: "Other",
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || "",
        bio: user.bio || "",
        skills: Array.isArray(user.skills) ? user.skills : [],
        newSkill: "",
        newCategory: "Other",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addSkill = () => {
    if (!form.newSkill.trim()) return;

    const exists = form.skills.some(
      s => s.name.toLowerCase() === form.newSkill.toLowerCase()
    );

    if (exists) {
      setMessage({ text: "Skill already added", type: "error" });
      setTimeout(() => setMessage({ text: "", type: "" }), 2000);
      return;
    }

    setForm({
      ...form,
      skills: [
        ...form.skills,
        { name: form.newSkill.trim(), category: form.newCategory },
      ],
      newSkill: "",
      newCategory: "Other",
    });
  };

  const removeSkill = (name) => {
    setForm({
      ...form,
      skills: form.skills.filter(s => s.name !== name),
    });
  };

  const handleSave = async () => {
    if (!form.username.trim()) {
      setMessage({ text: "Name is required", type: "error" });
      return;
    }

    setSaving(true);
    setMessage({ text: "", type: "" });

    const response = await updateProfile({
      username: form.username,
      bio: form.bio,
      skills: form.skills,
    });

    if (response.success) {
      setMessage({ text: "Profile updated!", type: "success" });
      setTimeout(() => navigate("/"), 1500);
    } else {
      setMessage({ text: response.message || "Something went wrong", type: "error" });
    }
    setSaving(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
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
          <h1 className="text-2xl font-semibold text-gray-900 mb-8">
            Edit profile
          </h1>

          {message.text && (
            <div className={`mb-6 p-3 rounded-xl text-sm ${
              message.type === "success" 
                ? "bg-emerald-50 text-emerald-700" 
                : "bg-red-50 text-red-600"
            }`}>
              {message.text}
            </div>
          )}

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <User className="w-4 h-4 text-gray-400" />
                Your name
              </label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="e.g. Alex Morgan"
                className="w-full px-4 py-3 bg-purple-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition"
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Info className="w-4 h-4 text-gray-400" />
                Bio
              </label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                placeholder="Tell others a bit about yourself..."
                rows={4}
                className="w-full px-4 py-3 bg-purple-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition resize-none"
              />
              <p className="text-xs text-gray-400">
                Brief description for your profile
              </p>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Skills
              </label>

              {form.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {form.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 bg-purple-50 border border-gray-200 px-3 py-1.5 rounded-lg text-sm text-gray-700"
                    >
                      {skill.name}
                      <span className="text-xs text-gray-400">• {skill.category}</span>
                      <button 
                        onClick={() => removeSkill(skill.name)}
                        className="ml-1 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <input
                  value={form.newSkill}
                  onChange={(e) => setForm({ ...form, newSkill: e.target.value })}
                  placeholder="Add a skill"
                  className="flex-1 px-4 py-2.5 bg-purple-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-300 transition"
                  onKeyDown={(e) => e.key === "Enter" && addSkill()}
                />
                
                <select
                  value={form.newCategory}
                  onChange={(e) => setForm({ ...form, newCategory: e.target.value })}
                  className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition"
                >
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={addSkill}
                  className="p-3 bg-purple-50 border border-gray-200 text-black rounded-full hover:bg-gray-200 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-400">
                Press Enter to add a skill
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 bg-purple-500 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;