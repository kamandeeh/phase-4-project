import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";

const AdminDashboard = () => {
  const { current_user, authToken } = useContext(UserContext);
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: "", description: "" });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5001/courses");
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleAddCourse = async () => {
    if (!newCourse.title || !newCourse.description) return alert("Fill in all fields");

    try {
      const response = await fetch("http://127.0.0.1:5001/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(newCourse),
      });

      if (!response.ok) throw new Error("Failed to add course");

      const createdCourse = await response.json();
      setCourses([...courses, createdCourse]);
      setNewCourse({ title: "", description: "" });
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:5001/courses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete course");

      setCourses(courses.filter((course) => course.id !== id));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleUpdateCourse = async (id, updatedCourse) => {
    try {
      const response = await fetch(`http://127.0.0.1:5001/courses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(updatedCourse),
      });

      if (!response.ok) throw new Error("Failed to update course");

      const updatedData = await response.json();
      setCourses(courses.map((course) => (course.id === id ? updatedData : course)));
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  if (!current_user || !currentUser.is_admin) return <p>Not authorized</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Admin Dashboard</h2>

      {/* Add Course Form */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Course Title"
          className="border p-2 mr-2"
          value={newCourse.title}
          onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Course Description"
          className="border p-2 mr-2"
          value={newCourse.description}
          onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
        />
        <button onClick={handleAddCourse} className="px-4 py-2 bg-green-600 text-white">Add Course</button>
      </div>

      {/* Courses List */}
      <ul>
        {courses.map((course) => (
          <li key={course.id} className="border-b p-4 flex justify-between">
            <div>
              <h3 className="text-xl">{course.title}</h3>
              <p>{course.description}</p>
            </div>
            <div>
              <button onClick={() => handleUpdateCourse(course.id, { title: "Updated Title", description: "Updated Description" })}
                className="px-3 py-1 bg-blue-500 text-white mr-2">Update</button>
              <button onClick={() => handleDeleteCourse(course.id)}
                className="px-3 py-1 bg-red-500 text-white">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
