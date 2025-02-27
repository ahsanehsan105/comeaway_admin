import React, { useState } from 'react';
import { CgList } from 'react-icons/cg';
import { FaUser, FaRegCreditCard, FaBars, FaTimes } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';
import { LuLayoutDashboard } from 'react-icons/lu';
import { MdLogout } from 'react-icons/md';
import { TbMusicCog } from 'react-icons/tb';

function Sidebar({ onMenuItemClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuItemClick = (tab) => {
    setActiveTab(tab);
    onMenuItemClick(tab);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className={`flex flex-col min-h-screen ${isOpen ? 'w-64' : 'w-20'} bg-gray-800 text-white shadow-lg transition-all duration-300`}>
      <div className="flex items-center justify-between w-full px-4 py-4">
        <button onClick={handleToggle} className="text-white text-lg">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <nav className="mt-5 w-full">
        <ul>
          {[
            { name: 'Dashboard', icon: <LuLayoutDashboard size={20} /> },
            { name: 'Categories', icon: <CgList size={20} /> },
            { name: 'SoundManagement', icon: <TbMusicCog size={20} /> },
            { name: 'Subscription', icon: <FaRegCreditCard size={20} /> },
            { name: 'UserManagement', icon: <FaUser size={20} /> },
            { name: 'Settings', icon: <IoSettings size={20} /> },
          ].map((item) => (
            <li key={item.name} className="mt-5">
              <button
                onClick={() => handleMenuItemClick(item.name)}
                className={`flex items-center justify-center px-1 py-2 text-gray-300 cursor-pointer rounded w-full text-left transition-all duration-300 ${
                  isOpen ? 'justify-start' : 'justify-center'
                } ${activeTab === item.name ? 'bg-white text-black' : 'hover:bg-[#5AD4FF]'} ${
                  isOpen ? 'border-b' : 'border-none'
                }`}
              >
                <div className={`${isOpen ? 'mr-3' : ''} ${activeTab === item.name ? 'text-black' : 'text-white'}`}>
                  {item.icon}
                </div>
                {isOpen && <span className={`${activeTab === item.name ? 'text-black' : 'text-white'}`}>{item.name}</span>}
              </button>
            </li>
          ))}
          <li className="mt-5 w-full">
            <button
              onClick={handleLogout}
              className={`flex items-center justify-center px-1 py-2 text-gray-300 cursor-pointer rounded w-full text-left transition-all duration-300 ${
                isOpen ? 'justify-start' : 'justify-center'
              } hover:bg-[#5AD4FF]`}
            >
              <div className={`${isOpen ? 'mr-3' : ''} text-white`}>
                <MdLogout size={20} />
              </div>
              {isOpen && <span className="text-white">Logout</span>}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;