import { Plus } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const EditProfileCard = () => {
    const navigate = useNavigate();
  return (
    <div
      className="w-3/4 mx-auto border-2 border-dashed border-gray-600 rounded-2xl p-10 mb-7 cursor-pointer hover:bg-gray-200 transition group"
      onClick={()=>navigate("/edit-profile")}
    >
      <div className="flex flex-col items-center justify-center gap-3 text-center">
        <div className="w-12 h-12 rounded-full bg-gray-400 text-white flex items-center justify-center group-hover:scale-105 transition" >
          <Plus size={22} />
        </div>
        <h1 className="text-base font-semibold text-gray-900">
          Edit Profile
        </h1>
        <p className="text-sm text-gray-600">
          Add skills, update bio & preferences 
        </p>
      </div>
    </div>
  );
};

export default EditProfileCard;
