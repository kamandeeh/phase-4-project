import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CourseContext } from "../Context/CourseContext";

const CourseDetail = () => {
  const { id } = useParams(); // Get course ID from URL
  const { courses, loading, error } = useContext(CourseContext); // Access courses from context
  const [orderStatus, setOrderStatus] = useState(null); // Track order response

  // Ensure `courses` is defined before searching
  if (loading) return <p className="text-center text-blue-600">Loading course details...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;
  if (!courses || courses.length === 0) return <p className="text-center text-red-600">No courses available.</p>;

  const course = courses.find((c) => c.id === parseInt(id));

  if (!course) {
    return <p className="text-center text-red-600">Course not found.</p>;
  }

  // Function to handle order submission
  const handleOrder = async () => {
    if (!course?.id || !course?.title || !course?.price) {
      setOrderStatus("Invalid course details.");
      return;
    }

    try {
      setOrderStatus("Placing order...");

      const response = await fetch("https://phase-4-project-kf0b.onrender.com/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course_id: course.id,
          courseName: course.title,
          price: course.price,
          user_id: 1, // TODO: Replace with actual user ID from auth context
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Order failed:", errorData);
        setOrderStatus(`Failed to place order: ${errorData.message || "Try again."}`);
        return;
      }

      setOrderStatus("✅ Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      setOrderStatus(" An error occurred while ordering. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-4 text-blue-400">{course.title}</h2>
      <p className="text-gray-700 mb-2">{course.description}</p>
      <p className="text-lg font-semibold mb-4">Price: ${course.price}</p>
      
      {/* Order Button */}
      <button
        onClick={handleOrder}
        className="bg-green-400 text-white px-4 py-2 rounded-lg hover:bg-red-400 transition"
      >
        Order Course
      </button>

      {/* Order Status Message */}
      {orderStatus && (
        <p className={`mt-4 text-center font-semibold ${orderStatus.includes("✅") ? "text-green-600" : "text-red-600"}`}>
          {orderStatus}
        </p>
      )}
    </div>
  );
};

export default CourseDetail;
