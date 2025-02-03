import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

function Navbar() {
  const { current_user, logout } = useContext(UserContext);

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-green-400">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
         <h1 className="text-2xl font-semibold dark:text-blue-900">AcademIQ</h1>
        </div>
      </nav>

      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <ul className="flex flex-row space-x-8 text-sm">
            <li><Link to="/" className="text-gray-900 dark:text-white hover:underline">Home</Link></li>
            <li><Link to="/courses" className="text-gray-900 dark:text-white hover:underline">Courses</Link></li>
            {!current_user ? (
              <>
                <li><Link to="/signup" className="text-gray-900 dark:text-white hover:underline">Signup</Link></li>
                <li><Link to="/login" className="text-gray-900 dark:text-white hover:underline">Login</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/profile" className="text-gray-900 dark:text-white hover:underline">Profile</Link></li>
                {current_user.is_admin && (
                  <li><Link to="/admin" className="text-gray-900 dark:text-white hover:underline">Admin</Link></li>
                )}
                <li><button onClick={logout} className="text-red-600 dark:text-red-400 hover:underline">Logout</button></li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
