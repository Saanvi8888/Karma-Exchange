import {
  Code2, GraduationCap, MessageCircle, Palette, Music,
  Dumbbell, Brain, TrendingUp, ChefHat, Scissors,
  Camera, Heart, Leaf, Wrench, Sparkles
} from "lucide-react";

const categoryConfig = {
  "Programming & Tech Skills":  { icon: Code2,         bg: "bg-blue-100",    color: "text-blue-500" },
  "Academic Tutoring":          { icon: GraduationCap, bg: "bg-indigo-100",  color: "text-indigo-500" },
  "Languages & Communication":  { icon: MessageCircle, bg: "bg-sky-100",     color: "text-sky-500" },
  "Design & Creative Skills":   { icon: Palette,       bg: "bg-pink-100",    color: "text-pink-500" },
  "Music & Performing Arts":    { icon: Music,         bg: "bg-purple-100",  color: "text-purple-500" },
  "Fitness, Yoga & Sports":     { icon: Dumbbell,      bg: "bg-orange-100",  color: "text-orange-500" },
  "Personal Development":       { icon: Brain,         bg: "bg-yellow-100",  color: "text-yellow-600" },
  "Business & Marketing":       { icon: TrendingUp,    bg: "bg-emerald-100", color: "text-emerald-500" },
  "Cooking & Baking":           { icon: ChefHat,       bg: "bg-red-100",     color: "text-red-500" },
  "Handicrafts & DIY":          { icon: Scissors,      bg: "bg-amber-100",   color: "text-amber-600" },
  "Photography & Video":        { icon: Camera,        bg: "bg-cyan-100",    color: "text-cyan-500" },
  "Lifestyle & Wellness":       { icon: Heart,         bg: "bg-rose-100",    color: "text-rose-500" },
  "Gardening & Sustainability": { icon: Leaf,          bg: "bg-green-100",   color: "text-green-500" },
  "Home & Practical Skills":    { icon: Wrench,        bg: "bg-slate-100",   color: "text-slate-500" },
  "Other":                      { icon: Sparkles,      bg: "bg-gray-100",    color: "text-gray-500" },
};

export const iconMaker = (category)=>{
  
  return categoryConfig[category] || categoryConfig["Other"];


}

export const getInitials = (username = "") => {
  if (!username) return "U";

  return username
  .split(" ")
  .map(word => word[0])
  .join("")
  .toUpperCase();
};
