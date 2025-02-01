import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // Here, add your login logic (e.g., API call)
    console.log("User Logged In: ", { email, password });
    alert("Login successful!");

    // Redirect to homepage after successful login
    navigate('courses');  // This will redirect to the homepage (root route)
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-500 rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-semibold mb-4">Login</h2>
      
      {/* Display error message */}
      {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

      <form onSubmit={handleLogin}>
        {/* Email Field */}
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="john.doe@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
