import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-blue-700">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a href="https://flowbite.com" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
          </a>
        </div>
      </nav>

      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              <li>
                <a href="/" className="text-gray-900 dark:text-white hover:underline" aria-current="page">
                  Home
                </a>
              </li>
              <li>
                <a href="/courses" className="text-gray-900 dark:text-white hover:underline">
                  Courses
                </a>
              </li>
              <li>
                <a href="/signup" className="text-gray-900 dark:text-white hover:underline">
                  Signup
                </a>
              </li>
              <li>
                <a href="login" className="text-gray-900 dark:text-white hover:underline">
                  Login
                </a>
              </li>
              <li>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
