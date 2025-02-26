import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function User() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState({
    id: '',
    name: '',
    statusOrCard: ''
  });

  const userData = {
    totalUsers: 500,
    activeUsers: 150,
    selectedCard: 'Premium Plan',
  };

  const dummyData = {
    'Total Users': [
      { id: 1, name: 'John Doe', status: 'Active' },
      { id: 2, name: 'Jane Smith', status: 'Inactive' },
    ],
    'Active Users': [
      { id: 1, name: 'John Doe', status: 'Active' },
      { id: 3, name: 'Michael Johnson', status: 'Active' },
    ],
    'Selected Card': [
      { id: 1, name: 'John Doe', card: 'Premium Plan' },
      { id: 4, name: 'Emily Davis', card: 'Premium Plan' },
    ],
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleSearchChange = (e) => {
    setSearchTerm({ ...searchTerm, [e.target.name]: e.target.value });
  };

  const filterData = (data) => {
    return data.filter((item) =>
      String(item.id).includes(searchTerm.id) &&
      item.name.toLowerCase().includes(searchTerm.name.toLowerCase()) &&
      (item.status || item.card).toLowerCase().includes(searchTerm.statusOrCard.toLowerCase())
    );
  };

  return (
    <div className='mx-auto mt-10 p-4'>
      <h1 className='text-gray-800 text-3xl font-bold mb-4 text-center'>User Statistics</h1>
      <div className='bg-white shadow-md rounded-lg p-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div
            className='bg-gray-100 p-4 rounded-lg cursor-pointer hover:bg-[#5AD4FF] hover:scale-105 transform transition-all duration-300'
            onClick={() => handleCardClick('Total Users')}
          >
            <h3 className='text-lg font-semibold text-gray-700'>Total Users</h3>
            <p className='text-gray-600'>{userData.totalUsers}</p>
          </div>
          <div
            className='bg-gray-100 p-4 rounded-lg cursor-pointer hover:bg-[#5AD4FF] hover:scale-105 transform transition-all duration-300'
            onClick={() => handleCardClick('Active Users')}
          >
            <h3 className='text-lg font-semibold text-gray-700'>Active Users</h3>
            <p className='text-gray-600'>{userData.activeUsers}</p>
          </div>
          <div
            className='bg-gray-100 p-4 rounded-lg cursor-pointer hover:bg-[#5AD4FF] hover:scale-105 transform transition-all duration-300'
            onClick={() => handleCardClick('Selected Card')}
          >
            <h3 className='text-lg font-semibold text-gray-700'>Selected Card</h3>
            <p className='text-gray-600'>{userData.selectedCard}</p>
          </div>
        </div>
        {selectedCard && (
          <div className='mt-6 overflow-auto'>
            <h2 className='text-gray-700 text-2xl font-semibold mb-4'>{selectedCard} Data</h2>
            <table className='min-w-full bg-white shadow-md rounded-lg  '>
              <thead>
                <tr>
                  <th className='relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    ID
                    <input
                      type='text'
                      name='id'
                      placeholder='Search by ID'
                      value={searchTerm.id}
                      onChange={handleSearchChange}
                      className='mt-2 p-2 border rounded w-full'
                    />
                  </th>
                  <th className='relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Name
                    <input
                      type='text'
                      name='name'
                      placeholder='Search by Name'
                      value={searchTerm.name}
                      onChange={handleSearchChange}
                      className='mt-2 p-2 border rounded w-full'
                    />
                  </th>
                  <th className='relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    {selectedCard === 'Selected Card' ? 'Card' : 'Status'}
                    <input
                      type='text'
                      name='statusOrCard'
                      placeholder={`Search by ${selectedCard === 'Selected Card' ? 'Card' : 'Status'}`}
                      value={searchTerm.statusOrCard}
                      onChange={handleSearchChange}
                      className='mt-2 p-2 border rounded w-full'
                    />
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200 '>
                {filterData(dummyData[selectedCard]).map((item) => (
                  <tr key={item.id} className='hover:scale-105 transform transition-all duration-300'>
                    <td className='px-6 py-4 whitespace-nowrap'>{item.id}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{item.name}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>{item.status || item.card}</td>
                    <td className='px-6 py-4 whitespace-nowrap'>
                      <div className='flex space-x-4'>
                        <FaEdit className='text-blue-500 cursor-pointer' />
                        <FaTrashAlt className='text-red-500 cursor-pointer' />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default User;