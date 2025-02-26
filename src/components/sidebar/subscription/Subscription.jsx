import React, { useState } from 'react';
import UserDetail from './detail/UserDetail';
import UserList from './list/UserList';
function Subscription() {
  const [selectedUser, setSelectedUser] = useState(null);

  const users = [
    { id: 1, name: 'John Doe', plan: 'Basic Plan', price: '$5/month', features: ['Feature 1', 'Feature 2', 'Feature 3'] },
    { id: 2, name: 'Jane Smith', plan: 'Standard Plan', price: '$10/month', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'] },
    { id: 3, name: 'Michael Johnson', plan: 'Premium Plan', price: '$20/month', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'] },
    { id: 4, name: 'Emily Davis', plan: 'Standard Plan', price: '$10/month', features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'] },
    { id: 5, name: 'William Brown', plan: 'Basic Plan', price: '$5/month', features: ['Feature 1', 'Feature 2', 'Feature 3'] },
  ];

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleBackClick = () => {
    setSelectedUser(null);
  };

  return (
    <div className='mx-auto mt-10 p-4'>
      <h1 className='text-gray-800 text-3xl font-bold mb-4 text-center'>Subscription Details</h1>
      {selectedUser ? (
        <UserDetail user={selectedUser} onBackClick={handleBackClick} />
      ) : (
        <UserList users={users} onUserClick={handleUserClick} />
      )}
    </div>
  );
}

export default Subscription;