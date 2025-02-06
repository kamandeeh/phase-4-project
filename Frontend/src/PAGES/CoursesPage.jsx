import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CoursePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);  // Add loading state
  const [error, setError] = useState("");  // Add error state

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5001/courses"); // Adjust the URL to your API endpoint
        const data = await response.json();

        if (response.ok) {
          setCourses(data);  // Store the fetched courses in the state
        } else {
          setError("Failed to load courses");
        }
      } catch (err) {
        setError("Error fetching courses");
      } finally {
        setLoading(false);  // Set loading to false after the fetch completes
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>; // Show loading indicator

  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>; // Show error message

  return (
    <div className="p-6 max-w-4xl mx-auto mt-12 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Available Courses</h2>
      <ul className="space-y-4">
        {courses.map((course) => (
          <li key={course.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100">
            <Link to={`/courses/${course.id}`} className="text-blue-600 text-xl font-medium hover:text-blue-800 transition duration-300">
              {course.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CoursePage;
