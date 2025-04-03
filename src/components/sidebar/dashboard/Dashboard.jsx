import React, { useState, useEffect, useContext } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import CountUp from 'react-countup';
import { AuthContext } from '../../../context/authContext';
import { getAllUsers, getAllUsersSubscription } from '../../../utils/API_SERVICE';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const { accessToken } = useContext(AuthContext);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalSubscriptions, setTotalSubscriptions] = useState(0);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const users = await getAllUsers(accessToken);
        const totalSubscription = await getAllUsersSubscription(accessToken);
        console.log(totalSubscription,">>>>>>Total Subscription");
        
        setTotalUsers(users.length); // Assuming the API returns an array of users
        setTotalSubscriptions(totalSubscription.length); // Assuming the API returns an array of subscriptions
      } catch (error) {
        console.error('Error fetching total users:', error);
      }
    };

    fetchTotalUsers();
  }, [accessToken]);

  const userTypesData = {
    labels: ['Premium', 'Standard'],
    datasets: [
      {
        data: [300, 700],
        backgroundColor: ['#5AD4FF', '#76e8b9'],
        hoverBackgroundColor: ['#5AD4FF', '#76e8b9'],
      },
    ],
  };

  const subscriptionData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Subscriptions Sold',
        data: [65, 59, 80, 81, 56, 55, 40, 45, 60, 75, 70, 90],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="text-center p-10 bg-gray-100 min-h-screen">
      <h1 className="font-bold text-4xl mb-10 text-gray-800">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="bg-white rounded-lg shadow-lg p-5">
          <h2 className="font-bold text-xl mb-3">Users Premium / Standard</h2>
          <Pie data={userTypesData} />
        </div>
        <div className="bg-white rounded-lg shadow-lg p-5 col-span-2">
          <h2 className="font-bold text-xl mb-3">Subscription Sold per Month</h2>
          <Bar data={subscriptionData} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-10">
        <div className="bg-white rounded-lg shadow-lg p-5">
          <h2 className="font-bold text-xl mb-3">Total Users</h2>
          <p className="text-3xl font-bold">
            <CountUp end={totalUsers} duration={2.5} />
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-5">
          <h2 className="font-bold text-xl mb-3">New Subscriptions</h2>
          <p className="text-3xl font-bold">
            <CountUp end={totalSubscriptions} duration={2.5} />
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-5">
          <h2 className="font-bold text-xl mb-3">Revenue</h2>
          <p className="text-3xl font-bold">
            <CountUp end={5000} duration={2.5} prefix="$" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;