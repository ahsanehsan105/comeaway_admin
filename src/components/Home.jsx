import React, { useState } from 'react';
import Navbar from '../pages/navbar/Navbar';
import Sidebar from './sidebar/Sidebar';
import UserActivity from './sidebar/useractivity/UserActivity';
import Subscription from './sidebar/subscription/Subscription';
import Payment from './sidebar/payment/Payment';
import Notification from './sidebar/notifications/Notification';
import User from './sidebar/user/User';
import Dashboard from './sidebar/dashboard/Dashboard';
import Categories from './sidebar/Categories/Categories';

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
        return <Categories />;
      case 'User Activity':
        return <UserActivity />;
      case 'Subscription':
        return <Subscription />;
      case 'Payment':
        return <Payment />;
      case 'Notifications':
        return <Notification />;
      default:
        return <UserActivity />;
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