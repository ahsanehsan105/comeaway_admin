import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import companyname from '../../assets/companyname.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSignIn = (e) => {
    e.preventDefault();
    if (email === 'admin@gmail.com' && password === 'admin') {
      toast.success('Login Successful');
      onLogin();
      
      setTimeout(() => {
        navigate('/');
      }, 1000); // Delay navigation to allow the toast to show
    } else {
      toast.error('Invalid email or password');
    }
  };
  

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
          <div className="flex justify-center mb-6 gap-2">
            <img src={logo} alt="Logo" className="h-10 w-10" />
            <img src={companyname} alt="Company Name" className="h-10 w-60" />
          </div>
          <h2 className="text-2xl font-bold mb-6 text-white text-center">Login</h2>
          <form onSubmit={handleSignIn}>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-white leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-white mb-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-white hover:bg-gray-200 text-black w-full font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;