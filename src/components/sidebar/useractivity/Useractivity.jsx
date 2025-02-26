import React, { useState } from 'react';
import Userlist from './userList/Userlist';
import UserDetails from './userdetail/UserDetails';

function UserActivity() {
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Michael Johnson' },
    { id: 4, name: 'Emily Davis' },
    { id: 5, name: 'William Brown' },
  ];

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };
  const handleBackClick = () => {
    setSelectedUser(null);
  };

  return (
    <div className='mx-auto mt-10 p-4'>
      <h1 className='text-gray-800 text-3xl font-bold mb-4 text-center'>User Activity</h1>
      {selectedUser ? (
        <UserDetails user={selectedUser} onBackClick={handleBackClick} />
      ) : (
        <Userlist users={users} onUserClick={handleUserClick} />
      )}
    </div>
  );
}

export default UserActivity;