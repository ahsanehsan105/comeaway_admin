import React from 'react';
import { IoMdArrowBack } from 'react-icons/io';

function UserDetails({ user, onBackClick }) {
  return (
    <div className='bg-white shadow-md rounded-lg p-6'>
      <button 
              onClick={onBackClick} 
              className='mb-4  py-2 px-4 rounded bg-gray-200 hover:bg-[#5AD4FF] hover:scale-105 transform transition-all duration-300'
            >
             <IoMdArrowBack  />
            </button>
      <h2 className='text-gray-700 text-2xl font-semibold mb-4'>{user.name}'s Sleep Data</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <div className='bg-gray-100 p-4 hover:bg-[#5AD4FF] rounded-lg hover:scale-105 transform transition-all duration-300'>
          <h3 className='text-lg font-semibold text-gray-700'>Total Sleep</h3>
          <p className='text-gray-600'>7 hours 45 minutes</p>
        </div>
        <div className='bg-gray-100 p-4 hover:bg-[#5AD4FF] rounded-lg hover:scale-105 transform transition-all duration-300'>
          <h3 className='text-lg font-semibold text-gray-700'>Deep Sleep</h3>
          <p className='text-gray-600'>2 hours 30 minutes</p>
        </div>
        <div className='bg-gray-100 p-4 hover:bg-[#5AD4FF] rounded-lg hover:scale-105 transform transition-all duration-300'>
          <h3 className='text-lg font-semibold text-gray-700'>REM Sleep</h3>
          <p className='text-gray-600'>1 hour 20 minutes</p>
        </div>
        <div className='bg-gray-100 p-4 hover:bg-[#5AD4FF] rounded-lg hover:scale-105 transform transition-all duration-300'>
          <h3 className='text-lg font-semibold text-gray-700'>Light Sleep</h3>
          <p className='text-gray-600'>3 hours 55 minutes</p>
        </div>
        <div className='bg-gray-100 p-4 hover:bg-[#5AD4FF] rounded-lg hover:scale-105 transform transition-all duration-300'>
          <h3 className='text-lg font-semibold text-gray-700'>Awake Time</h3>
          <p className='text-gray-600'>20 minutes</p>
        </div>
        <div className='bg-gray-100 p-4 hover:bg-[#5AD4FF] rounded-lg hover:scale-105 transform transition-all duration-300'>
          <h3 className='text-lg font-semibold text-gray-700'>Sleep Quality</h3>
          <p className='text-gray-600'>85%</p>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;