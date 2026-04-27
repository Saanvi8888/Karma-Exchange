import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import SpotlightCard from './cards/SpotlightCard';
import {  Sparkles } from 'lucide-react';

const CommunitySpotlight = () => {
  const { fetchSpotlight, authLoading, spotlight } = useAuth();

  useEffect(() => {
    fetchSpotlight();
  }, []);

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
      <h2 className="font-semibold text-xl text-gray-900 mb-5 flex items-center justify-center gap-2">
        {/* <Sparkles className="w-5 h-5 text-purple-600" /> */}
        Community Heroes
      </h2>
      
      {authLoading ? (
        <p className="text-sm text-gray-400 text-center py-8">Loading...</p>
      ) : spotlight && spotlight.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
          {spotlight.map((user) => (
            <SpotlightCard key={user._id} user={user} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <Sparkles className="w-8 h-8 text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium">No community heroes yet</p>
          <p className="text-sm text-gray-400 mt-1">
            Be the first to make a trade and earn karma
          </p>
        </div>
      )}
    </div>
  );
};

export default CommunitySpotlight;