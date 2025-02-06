import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const { current_user } = useContext(UserContext); // Get current user from UserContext
  const [courses, setCourses] = useState([]); // Store available courses
  const [purchasedCourses, setPurchasedCourses] = useState([]); // Store user’s purchased courses
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all available courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5001/courses'); 
        const data = await response.json();
        if (response.ok) {
          setCourses(data);
        } else {
          setError(data.message || 'Failed to load courses');
        }
      } catch (err) {
        setError('Error fetching courses');
      }
    };

    fetchCourses();
  }, []);

  // Add order function (formerly purchaseCourse)
  const addOrder = async (courseId) => {
    console.log("🔍 Checking user before placing order:", current_user);  // ✅ Debug user
    
    if (!current_user || !current_user.id) {  
      alert("You must be logged in to place an order.");
      return;
    }
  
    try {
      const response = await fetch('http://127.0.0.1:5001/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(current_user.authToken && { 'Authorization': `Bearer ${current_user.authToken}` }),
        },
        body: JSON.stringify({
          course_id: courseId,
          user_id: current_user.id,
        }),
      });
  
      const data = await response.json();
      console.log("📩 Order response:", data);  // ✅ Debug response
  
      if (response.ok) {
        alert("Order placed successfully!");
      } else {
        alert(`Error placing order: ${data.error}`);
      }
    } catch (err) {
      console.error("🔥 Order failed:", err);
      alert("Failed to place order. Try again later.");
    }
  };
  
  

  return (
    <CourseContext.Provider value={{ courses, purchasedCourses, addOrder, loading, error }}>
      {children}
    </CourseContext.Provider>
  );
};

export default CourseContext;
