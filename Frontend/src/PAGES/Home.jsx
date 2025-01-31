import React from "react";
import { useUser } from "../Context/UserContext";
import { Link } from "react-router-dom"; 

const Homepage = () => {
  const { user } = useUser(); // Get user info (role) from context

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-4">Welcome to the Course Management Platform</h2>
          <p className="text-lg mb-6">
            Manage and take courses to enhance your skills with ease and flexibility.
          </p>
          {!user && (
            <Link
              to="/signup"
              className="bg-white text-blue-700 px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-400 transition"
            >
              Get Started
            </Link>
          )}
        </div>
      </section>

      {/* Available Courses Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-semibold mb-8 text-black">Available Courses</h3>
          {/* Display available courses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sample Course Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="text-2xl font-semibold mb-4 text-black">Course 1: Introduction to React</h4>
              <p className="text-gray-600 mb-4">
                Learn the basics of React, a powerful JavaScript library for building user interfaces.
              </p>
              <Link to="/course/1" className="text-blue-700 hover:underline">
                View Course Details
              </Link>
            </div>
            {/* Add more courses here */}
          </div>
        </div>
      </section>

      {/* Admin Features Section - Visible Only for Admin */}
      {user?.role === "admin" && (
        <section className="py-16 px-6 bg-gray-200">
          <div className="max-w-7xl mx-auto text-center">
            <h3 className="text-3xl font-semibold mb-8 text-black">Admin Panel</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-2xl font-semibold mb-4 text-black">Add a New Course</h4>
                <p className="text-gray-600 mb-4">Add new courses to the platform for users to access.</p>
                <Link
                  to="/add-course"
                  className="bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-800 transition"
                >
                  Add Course
                </Link>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-2xl font-semibold mb-4 text-black">Manage Existing Courses</h4>
                <p className="text-gray-600 mb-4">Edit or delete existing courses on the platform.</p>
                <Link
                  to="/manage-courses"
                  className="bg-blue-700 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-800 transition"
                >
                  Manage Courses
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer Section */}
      <footer className="bg-blue-700 text-white py-8">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2025 Course Management Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
