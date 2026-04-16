import React from 'react'
import { getInitials } from '../../services/helper'
import { Star, Award } from 'lucide-react'

const SpotlightCard = ({ user }) => {
  return (
    <div className="p-5 bg-white border border-gray-100 shadow-sm hover:border-gray-200 hover:shadow-md rounded-xl transition-all">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-700 text-white text-sm font-medium">
          {getInitials(user.username)}
        </div>
        <p className="font-medium text-gray-900">{user.username}</p>
      </div>
      
      <div className="flex  justify-between items-center gap-3 text-sm text-gray-500 mb-3">
        <span className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5" /> 
          {user.karma} pts.
        </span>
        
        <span className="flex items-center gap-1">
          <Award className="w-3.5 h-3.5" /> 
          {user.completedSessions || 0} trades
        </span>
      </div>

      <p className="text-sm text-gray-600 ">
        {user.bio || "No bio yet"}
      </p>
    </div>
  )
}

export default SpotlightCard