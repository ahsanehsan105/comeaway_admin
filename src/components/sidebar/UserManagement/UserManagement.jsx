import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const UserManagement = ({ subscriptions }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [userIdSearch, setUserIdSearch] = useState('');
    const [userNameSearch, setUserNameSearch] = useState('');
    const itemsPerPage = 5;

    // Dummy subscriptions data
    const dummySubscriptions = [
        { id: 1, userId: 101, userName: 'John Doe', status: 'active' },
        { id: 2, userId: 102, userName: 'Jane Doe', status: 'inactive' },
        { id: 3, userId: 103, userName: 'Alice Smith', status: 'active' },
        { id: 4, userId: 104, userName: 'Bob Johnson', status: 'inactive' },
        { id: 5, userId: 105, userName: 'Charlie Brown', status: 'active' },
        { id: 6, userId: 106, userName: 'David Williams', status: 'inactive' },
        { id: 7, userId: 107, userName: 'Eve Davis', status: 'active' },
    ];

    const [subscriptionData, setSubscriptionData] = useState(dummySubscriptions);

    const handleStatusChange = (id) => {
        const updatedSubscriptions = subscriptionData.map(subscription =>
            subscription.id === id
                ? { ...subscription, status: subscription.status === 'active' ? 'inactive' : 'active' }
                : subscription
        );
        setSubscriptionData(updatedSubscriptions);
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const handleUserIdSearchChange = (e) => {
        setUserIdSearch(e.target.value);
    };

    const handleUserNameSearchChange = (e) => {
        setUserNameSearch(e.target.value);
    };

    const filteredData = subscriptionData.filter(subscription =>
        subscription.userId.toString().includes(userIdSearch) && subscription.userName.toLowerCase().includes(userNameSearch.toLowerCase())
    );

    const offset = currentPage * itemsPerPage;
    const currentPageData = filteredData.slice(offset, offset + itemsPerPage);

    return (
        <div className="container mx-auto p-4">
            <div className="mb-10">
                <h1 className="text-4xl font-bold text-center mt-6">User Management</h1>
            </div>
            <div className="container mx-auto p-4 bg-white rounded shadow-md">
                <div className="mb-4 flex justify-between space-x-4">
                    <input
                        type="text"
                        placeholder="Search by User ID"
                        value={userIdSearch}
                        onChange={handleUserIdSearchChange}
                        className="px-4 py-2 border rounded w-full"
                    />
                    <input
                        type="text"
                        placeholder="Search by User Name"
                        value={userNameSearch}
                        onChange={handleUserNameSearchChange}
                        className="px-4 py-2 border rounded w-full"
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border-b border-gray-300 text-left bg-gray-100">User ID</th>
                                <th className="py-2 px-4 border-b border-gray-300 text-left bg-gray-100">User Name</th>
                                <th className="py-2 px-4 border-b border-gray-300 text-left bg-gray-100">Subscription Status</th>
                                <th className="py-2 px-4 border-b border-gray-300 text-left bg-gray-100">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPageData.map((subscription, index) => (
                                <tr key={subscription.id} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border-b border-gray-300">{subscription.userId}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">{subscription.userName}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">{subscription.status}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">
                                        <button
                                            onClick={() => handleStatusChange(subscription.id)}
                                            className={`px-3 py-1 rounded ${subscription.status === 'active' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                                                }`}
                                        >
                                            {subscription.status === 'active' ? 'Deactivate' : 'Activate'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 flex justify-end">
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        pageCount={Math.ceil(filteredData.length / itemsPerPage)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination flex space-x-2"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link px-3 py-1 border rounded"}
                        previousLinkClassName={"page-link px-3 py-1 border rounded"}
                        nextLinkClassName={"page-link px-3 py-1 border rounded"}
                        breakLinkClassName={"page-link px-3 py-1 border rounded"}
                        activeClassName={"active"}
                        activeLinkClassName={"bg-gray-300 text-white"}
                    />
                </div>
            </div>
        </div>
    );
};

export default UserManagement;