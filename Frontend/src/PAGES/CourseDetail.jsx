import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CourseContext } from "../Context/CourseContext";

const CourseDetail = () => {
  const { id } = useParams(); // Get course ID from URL
  const { courses } = useContext(CourseContext); // Access courses from context
  const [orderStatus, setOrderStatus] = useState(null); // Track order response

  const course = courses.find((course) => course.id === parseInt(id));

  if (!course) {
    return <p className="text-center text-red-600">Course not found.</p>;
  }

  // Function to handle order submission
  const handleOrder = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: course.id,
          courseName: course.title,
          price: course.price,
          userId: 1, // Replace with actual user ID (from auth context)
        }),
      });

      if (response.ok) {
        setOrderStatus("Order placed successfully!");
      } else {
        setOrderStatus("Failed to place order. Try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      setOrderStatus("An error occurred while ordering.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-4 text-blue-700">{course.title}</h2>
      <p className="text-gray-700 mb-2">{course.description}</p>
      <p className="text-lg font-semibold mb-4">Price: ${course.price}</p>

      {/* Order Button */}
      <button
        onClick={handleOrder}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
      >
        Order Course
      </button>

      {/* Order Status Message */}
      {orderStatus && (
        <p className="mt-4 text-center text-green-600 font-semibold">
          {orderStatus}
        </p>
      )}
    </div>
  );
};

export default CourseDetail;
