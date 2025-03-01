import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye } from 'react-icons/fa';

const UserManagement = ({ subscriptions }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [userIdSearch, setUserIdSearch] = useState('');
    const [userNameSearch, setUserNameSearch] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [subscriptionSearch, setSubscriptionSearch] = useState('');
    const [transactionIdSearch, setTransactionIdSearch] = useState('');
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

    const dummySubscriptionHistory = [
        { transactionId: 1, userId: 101, subscriptionName: 'Standard', startDate: '2022-01-01', endDate: '2023-01-01' },
        { transactionId: 2, userId: 101, subscriptionName: 'Premium', startDate: '2023-02-01', endDate: '2024-02-01' },
        { transactionId: 3, userId: 102, subscriptionName: 'Standard', startDate: '2022-03-01', endDate: '2023-03-01' },
        { transactionId: 4, userId: 103, subscriptionName: 'Premium', startDate: '2022-04-01', endDate: '2023-04-01' },
        { transactionId: 5, userId: 104, subscriptionName: 'Standard', startDate: '2022-05-01', endDate: '2023-05-01' },
        { transactionId: 6, userId: 105, subscriptionName: 'Premium', startDate: '2022-06-01', endDate: '2023-06-01' },
        { transactionId: 7, userId: 106, subscriptionName: 'Standard', startDate: '2022-07-01', endDate: '2023-07-01' },
        { transactionId: 8, userId: 107, subscriptionName: 'Premium', startDate: '2022-08-01', endDate: '2023-08-01' },
    ];

    const [subscriptionData, setSubscriptionData] = useState(dummySubscriptions);
    const [subscriptionHistory, setSubscriptionHistory] = useState(dummySubscriptionHistory);

    const handleStatusChange = (id) => {
        const updatedSubscriptions = subscriptionData.map(subscription =>
            subscription.id === id
                ? { ...subscription, status: subscription.status === 'active' ? 'inactive' : 'active' }
                : subscription
        );
        setSubscriptionData(updatedSubscriptions);
    };

    const handleStatusUpdate = () => {
        if (selectedUser) {
            const updatedSubscriptions = subscriptionData.map(subscription =>
                subscription.id === selectedUser.id
                    ? { ...subscription, status: selectedStatus }
                    : subscription
            );
            setSubscriptionData(updatedSubscriptions);
            toast.success('Status updated successfully');
        }
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

    const handleSubscriptionSearchChange = (e) => {
        setSubscriptionSearch(e.target.value);
    };

    const handleTransactionIdSearchChange = (e) => {
        setTransactionIdSearch(e.target.value);
    };

    const handleUserPreview = (user) => {
        setSelectedUser(user);
        setSelectedStatus(user.status);
    };

    const handleBackToTable = () => {
        setSelectedUser(null);
    };

    const filteredData = subscriptionData.filter(subscription =>
        subscription.userId.toString().includes(userIdSearch) && subscription.userName.toLowerCase().includes(userNameSearch.toLowerCase())
    );

    const filteredSubscriptionHistory = subscriptionHistory.filter(history =>
        history.userId === selectedUser?.userId &&
        history.subscriptionName.toLowerCase().includes(subscriptionSearch.toLowerCase()) &&
        history.transactionId.toString().includes(transactionIdSearch)
    );

    const offset = currentPage * itemsPerPage;
    const currentPageData = filteredData.slice(offset, offset + itemsPerPage);

    return (
        <div className="container mx-auto p-4">
            <div className="mb-10">
                <h1 className="text-4xl font-bold text-center mt-6">User Management</h1>
            </div>
            {selectedUser ? (
                <div className="container mx-auto p-4 bg-white rounded shadow-md flex">
                    <div className="w-2/3">
                        <button
                            onClick={handleBackToTable}
                            className="mb-4 px-4 py-2 bg-gray-400 text-white rounded"
                        >
                            Back
                        </button>
                        <div className="bg-gray-100 p-6 rounded shadow-md">
                            <h2 className="text-3xl font-bold mb-6 text-center">User Details</h2>
                            <div className="mb-4">
                                <p className="text-lg"><strong>User ID:</strong> {selectedUser.userId}</p>
                            </div>
                            <div className="mb-4">
                                <p className="text-lg"><strong>User Name:</strong> {selectedUser.userName}</p>
                            </div>
                            <div className="mb-4">
                                <p className="text-lg"><strong>Status:</strong> {selectedUser.status}</p>
                            </div>
                        </div>
                        <div className="width-600 bg-gray-100 p-6 rounded shadow-md mt-6">
                            <h2 className="text-3xl font-bold mb-6 text-center">Subscription History</h2>
                            <div className="mb-4 flex justify-between space-x-4">
                                <input
                                    type="text"
                                    placeholder="Search by Transaction ID"
                                    value={transactionIdSearch}
                                    onChange={handleTransactionIdSearchChange}
                                    className="px-4 py-2 border rounded w-full"
                                />
                                <input
                                    type="text"
                                    placeholder="Search by Subscription Name"
                                    value={subscriptionSearch}
                                    onChange={handleSubscriptionSearchChange}
                                    className="px-4 py-2 border rounded w-full"
                                />
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border-b border-gray-300 text-left bg-gray-100">Transaction ID</th>
                                            <th className="py-2 px-4 border-b border-gray-300 text-left bg-gray-100">Subscription Name</th>
                                            <th className="py-2 px-4 border-b border-gray-300 text-left bg-gray-100">Start Date</th>
                                            <th className="py-2 px-4 border-b border-gray-300 text-left bg-gray-100">End Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredSubscriptionHistory.map((history) => (
                                            <tr key={history.transactionId} className="hover:bg-gray-50">
                                                <td className="py-2 px-4 border-b border-gray-300">{history.transactionId}</td>
                                                <td className="py-2 px-4 border-b border-gray-300">{history.subscriptionName}</td>
                                                <td className="py-2 px-4 border-b border-gray-300">{history.startDate}</td>
                                                <td className="py-2 px-4 border-b border-gray-300">{history.endDate}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 pl-4">
                        <div className="bg-gray-100 p-6 rounded shadow-md mt-14">
                            <h2 className="text-2xl font-bold mb-4">Update Status</h2>
                            <label className="block mb-2 text-lg font-medium"><strong>Status:</strong></label>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="px-4 py-2 border rounded w-full mb-4"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                            <button
                                onClick={handleStatusUpdate}
                                className="px-4 py-2 text-white rounded w-full"
                                style={{ backgroundColor: '#439AB8' }}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
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
                                {currentPageData.map((subscription) => (
                                    <tr key={subscription.id} className="hover:bg-gray-50">
                                        <td className="py-2 px-4 border-b border-gray-300">{subscription.userId}</td>
                                        <td className="py-2 px-4 border-b border-gray-300">{subscription.userName}</td>
                                        <td className="py-2 px-4 border-b border-gray-300">{subscription.status}</td>
                                        <td className="py-2 px-4 border-b border-gray-300">
                                            <button
                                                onClick={() => handleUserPreview(subscription)}
                                                className="px-3 py-1 rounded text-white"
                                                style={{ backgroundColor: '#439AB8' }}
                                            >
                                                <FaEye />
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
            )}
            <ToastContainer />
        </div>
    );
};

export default UserManagement;