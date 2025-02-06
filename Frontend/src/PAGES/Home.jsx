import React, { useContext } from 'react';
import { UserContext } from "../Context/UserContext";

const Home = () => {
  const { current_user, authToken, login } = useContext(UserContext);

  if (!authToken) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl font-semibold text-gray-600">Loading...</div>
      </div>
    ); // Show a loading state while authToken is being fetched
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center w-96 max-w-md">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Welcome to the Home Page</h1>
        {current_user ? (
          <div>
            <p className="text-xl text-gray-700 mb-4">Hello, <span className="font-semibold text-indigo-600">{current_user.username}</span>!</p>
            <button
              onClick={login}
              className="bg-green-600 text-white font-bold px-6 py-2 rounded-lg text-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
            >
              Get Started
            </button>
          </div>
        ) : (
          <div>
            <p className="text-xl text-gray-700 mb-4">Please log in or sign up to access your account.</p>
            <button
              className="text-blue-600 hover:text-blue-700 font-semibold"
              onClick={() => alert('Navigate to login/signup')}>
              Log in or Sign up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
