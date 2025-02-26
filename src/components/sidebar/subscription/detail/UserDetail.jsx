import React from 'react';
import { IoMdArrowBack } from "react-icons/io";
function UserDetail({ user, onBackClick }) {
  return (
    <div className='bg-white shadow-md rounded-lg p-6'>
      <button 
        onClick={onBackClick} 
        className='mb-4  py-2 px-4 rounded bg-gray-200 hover:bg-[#5AD4FF] hover:scale-105 transform transition-all duration-300'
      >
       <IoMdArrowBack  />
      </button>
      <h2 className='text-gray-700 text-2xl font-semibold mb-4'>{user.name}'s Subscription</h2>
      <p className='text-gray-600 text-xl mb-4'>{user.plan}</p>
      <p className='text-gray-600 text-xl mb-4'>{user.price}</p>
      <ul className='text-gray-600 mb-4'>
        {user.features.map((feature, index) => (
          <li key={index} className='mb-2'>{feature}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserDetail;