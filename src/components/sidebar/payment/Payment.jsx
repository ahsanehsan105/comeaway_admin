import React, { useState } from 'react';

function Payment() {
  const [searchTerm, setSearchTerm] = useState({
    name: '',
    status: '',
    amount: '',
    date: ''
  });

  const payments = [
    { id: 1, name: 'John Doe', status: 'Paid', amount: '$50', date: '2025-01-15' },
    { id: 2, name: 'Jane Smith', status: 'Pending', amount: '$30', date: '2025-01-18' },
    { id: 3, name: 'Michael Johnson', status: 'Failed', amount: '$20', date: '2025-01-20' },
    { id: 4, name: 'Emily Davis', status: 'Paid', amount: '$45', date: '2025-01-22' },
    { id: 5, name: 'William Brown', status: 'Pending', amount: '$25', date: '2025-01-25' },
  ];

  const handleSearchChange = (e) => {
    setSearchTerm({ ...searchTerm, [e.target.name]: e.target.value });
  };

  const filterData = (data) => {
    return data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.name.toLowerCase()) &&
      item.status.toLowerCase().includes(searchTerm.status.toLowerCase()) &&
      item.amount.includes(searchTerm.amount) &&
      item.date.includes(searchTerm.date)
    );
  };

  return (
    <div className='mx-auto mt-10 p-4'>
      <h1 className='text-gray-800 text-3xl font-bold mb-4 text-center'>Payment Status</h1>
      <div className='bg-white shadow-md rounded-lg p-6 overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead>
            <tr>
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
                Status
                <input
                  type='text'
                  name='status'
                  placeholder='Search by Status'
                  value={searchTerm.status}
                  onChange={handleSearchChange}
                  className='mt-2 p-2 border rounded w-full'
                />
              </th>
              <th className='relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Amount
                <input
                  type='text'
                  name='amount'
                  placeholder='Search by Amount'
                  value={searchTerm.amount}
                  onChange={handleSearchChange}
                  className='mt-2 p-2 border rounded w-full'
                />
              </th>
              <th className='relative px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Date
                <input
                  type='text'
                  name='date'
                  placeholder='Search by Date'
                  value={searchTerm.date}
                  onChange={handleSearchChange}
                  className='mt-2 p-2 border rounded w-full'
                />
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {filterData(payments).map((payment) => (
              <tr key={payment.id}>
                <td className='px-6 py-4 whitespace-nowrap'>{payment.name}</td>
                <td className={`px-6 py-4 whitespace-nowrap ${payment.status === 'Paid' ? 'text-green-600' : payment.status === 'Pending' ? 'text-yellow-600' : 'text-red-600'}`}>{payment.status}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{payment.amount}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{payment.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Payment;