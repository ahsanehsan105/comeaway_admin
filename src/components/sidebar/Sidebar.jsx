import React, { useState } from 'react';
import { CgList } from 'react-icons/cg';
import { FaUser, FaRegCreditCard, FaDollarSign, FaBell, FaBars, FaTimes } from 'react-icons/fa';
import { FiUsers } from 'react-icons/fi';
import { LuLayoutDashboard } from 'react-icons/lu';
import { MdLogout } from 'react-icons/md';
import { TbMusicCog, TbPlaylistAdd } from 'react-icons/tb';

function Sidebar({ onMenuItemClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`flex flex-col min-h-screen ${isOpen ? 'w-64' : 'w-20'} bg-gray-800 text-white shadow-lg transition-all duration-300`}>
      <div className="flex items-center justify-between w-full px-4 py-4">
        <button onClick={handleToggle} className="text-white text-lg">
          {isOpen ? <FaTimes /> : <FaBars className="justify-end" />}
        </button>
      </div>
      <nav className="mt-5 w-full">
        <ul>
          <li className="mt-5">
            <button onClick={() => onMenuItemClick('Dashboard')} className={`flex items-center px-1 py-2 text-gray-300 hover:bg-[#5AD4FF] hover:text-black cursor-pointer rounded w-full text-left ${isOpen ? 'border-b' : 'border-none justify-center'}`}>
              <LuLayoutDashboard className="mr-3" size={20} />
              {isOpen && <span>Dashboard</span>}
            </button>
          </li>
          <li className="mt-5">
            <button onClick={() => onMenuItemClick('Categories')} className={`flex items-center px-1 py-2 text-gray-300 hover:bg-[#5AD4FF] hover:text-black cursor-pointer rounded w-full text-left ${isOpen ? 'border-b' : 'border-none justify-center'}`}>
              <CgList className="mr-3" size={20} />
              {isOpen && <span>Categories</span>}
            </button>
          </li>
          <li className="mt-5">
            <button onClick={() => onMenuItemClick('Sound Management')} className={`flex items-center px-1 py-2 text-gray-300 hover:bg-[#5AD4FF] hover:text-black cursor-pointer rounded w-full text-left ${isOpen ? 'border-b' : 'border-none justify-center'}`}>
              <TbMusicCog 
              className="mr-3" size={20} />
              {isOpen && <span>Sound Management</span>}
            </button>
          </li>
          <li className="mt-5">
            <button onClick={() => onMenuItemClick('Subscription')} className={`flex items-center px-1 py-2 text-gray-300 hover:bg-[#5AD4FF] hover:text-black cursor-pointer rounded w-full text-left ${isOpen ? 'border-b' : 'border-none justify-center'}`}>
              <FaRegCreditCard className="mr-3" size={20} />
              {isOpen && <span>Subscription</span>}
            </button>
          </li>
          <li className="mt-5">
            <button onClick={() => onMenuItemClick('Payment')} className={`flex items-center px-1 py-2 text-gray-300 hover:bg-[#5AD4FF] hover:text-black cursor-pointer rounded w-full text-left ${isOpen ? 'border-b' : 'border-none justify-center'}`}>
              <FaDollarSign className="mr-3" size={20} />
              {isOpen && <span>Payment</span>}
            </button>
          </li>
          <li className="mt-5 w-full">
            <button onClick={() => onMenuItemClick('Notifications')} className={`flex items-center px-1 py-2 text-gray-300 hover:bg-[#5AD4FF] hover:text-black cursor-pointer rounded w-full text-left ${isOpen ? 'border-b' : 'border-none justify-center'}`}>
              <FaBell className="mr-3" size={20} />
              {isOpen && <span>Notifications</span>}
            </button>
          </li>
          <li className="mt-5 w-full">
            <button  className={`flex items-center px-1 py-2 text-gray-300 hover:bg-[#5AD4FF] hover:text-black cursor-pointer rounded w-full text-left ${isOpen ? 'border-b' : 'border-none justify-center'}`}>
              <MdLogout className="mr-3" size={20} />
              {isOpen && <span>Logout</span>}
            </button>
          </li>

        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;