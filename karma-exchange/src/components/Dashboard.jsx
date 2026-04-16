import React, { useContext, useState } from 'react';
import Header from "./Header";
import UserProfileCard from "./UserProfileCard";
import CommunitySpotlight from "./CommunitySpotlight";
import AvailableTrades from "./AvailableTrades";
import { useAuth } from '../context/AuthContext';
import DashboardAvailableTrades from './DashboardAvailableTrades';
import EditProfileCard from './cards/EditProfileCard';
import SideBar from './SideBar';
const Dashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <SideBar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-4 sm:pb-6 lg:pb-8">

        
        {user && (!user.bio || !user.skills) && <EditProfileCard />}

        <div className=' mt-5 mb-5'>
          <CommunitySpotlight />  
        </div>    
        <div className="flex flex-col lg:flex-row gap-6 mb-4">
          <div className="w-full lg:w-80 space-y-6">
            <UserProfileCard user={user} />
            
          </div>

          <div className="flex-1 space-y-6 sm:space-y-8">
            <AvailableTrades />
            
          </div>
          
        </div>
        <DashboardAvailableTrades/>
      </main>
    </div>
  );
};

export default Dashboard;