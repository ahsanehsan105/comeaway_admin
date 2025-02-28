import React, { useState } from 'react';
import Navbar from '../pages/navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import Dashboard from './sidebar/dashboard/Dashboard';
import Categories from './sidebar/Categories/Categories';
import SoundManagement from './sidebar/SoundManagement/SoundManagement';
import SubscriptionManagement from './sidebar/SubscriptionManagement/SubscriptionManagement';
import UserManagement from './sidebar/UserManagement/UserManagement';
import Settings from './sidebar/Settings/Settings';
import CategoryManagement from './sidebar/CategoryManagment/CategoryManagement';

function Home() {
  const [selectedContent, setSelectedContent] = useState('Dashboard');

  const handleMenuItemClick = (content) => {
    setSelectedContent(content);
  };

  const renderContent = () => {
    switch (selectedContent) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Categories':
        return <CategoryManagement />;
      case 'SoundManagement':
        return <SoundManagement />;
      case 'Subscription':
        return <SubscriptionManagement />;
      case 'UserManagement':
        return <UserManagement />;
      case 'Settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-200">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar onMenuItemClick={handleMenuItemClick} />
        <div className="flex-grow p-4 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Home;