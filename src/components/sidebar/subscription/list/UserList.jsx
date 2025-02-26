import React, { useState } from 'react';

function UserList({ users, onUserClick }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='bg-white shadow-md rounded-lg p-6'>
      <h2 className='text-gray-700 text-2xl font-semibold mb-4'>Users with Subscriptions</h2>
      <input
        type='text'
        placeholder='Search by Name'
        value={searchTerm}
        onChange={handleSearchChange}
        className='mb-4 p-2 border rounded md:w-1/4 w-full'
      />
      <ul className='divide-y divide-gray-200'>
        {filteredUsers.map((user) => (
          <li
            key={user.id}
            className='py-4 cursor-pointer hover:bg-[#5AD4FF] hover:text-black px-3 rounded-lg hover:scale-105 transform transition-all duration-300'
            onClick={() => onUserClick(user)}
          >
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;