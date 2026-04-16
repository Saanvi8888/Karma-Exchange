import React from "react";
import { getInitials } from "../services/helper";

const UserProfileCard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-lg ">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
          <span className="font-semibold text-xl">{getInitials(user.username)}</span>
        </div>

        <div>
          <h2 className="text-xl font-bold">{user.username}</h2>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm ">Karma Points</span>
          <span className="text-lg font-bold">{user.karma?? 0}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm">Completed Trades</span>
          <span className="text-lg font-bold">{user.completedSessions ?? 0}</span>
        </div>

        <div>
          <span className="text-sm block mb-3">Skills</span>
          <div className="flex flex-wrap gap-2">
            {user.skills?.length > 0 ? (
              user.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/20 text-white border border-white/30"
                >
                  {skill.name}
                </span>
              ))
            ) : (
              <span className="text-sm text-white/60">No skills added</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;