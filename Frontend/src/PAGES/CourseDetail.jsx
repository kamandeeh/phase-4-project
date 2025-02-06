import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { CourseContext } from "../Context/CourseContext";

function CourseDetail() {
  const { addOrder } = useContext(CourseContext);  // Use addOrder instead of purchaseCourse
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5001/courses/${id}`);
        const data = await response.json();
        if (response.ok) {
          setCourse(data);
        } else {
          setError("Failed to load course details.");
        }
      } catch (err) {
        setError("Error fetching course details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto mt-12 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">{course.title}</h2>
      <p className="text-lg text-gray-700 mb-4">{course.description}</p>
      <p className="text-xl font-bold text-green-600">${course.price}</p>

      {/* Button to trigger order placement */}
      <div className="mt-6">
        <button
          onClick={() => addOrder(course.id)}  // Trigger addOrder with course ID
          className="bg-blue-500 text-white px-6 py-2 rounded-lg text-lg hover:bg-blue-600 focus:outline-none transition duration-300"
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
}

export default CourseDetail;
