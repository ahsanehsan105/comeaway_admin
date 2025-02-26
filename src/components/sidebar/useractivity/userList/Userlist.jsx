import React from 'react';

function UserList({ users, onUserClick }) {
  return (
    <div className='bg-white shadow-md rounded-lg p-6'>
      <h2 className='text-gray-700 text-2xl font-semibold mb-4'>Users</h2>
      <ul className='divide-y divide-gray-200'>
        {users.map((user) => (
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