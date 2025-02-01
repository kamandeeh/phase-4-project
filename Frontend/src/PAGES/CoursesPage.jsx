import React from 'react';
import { useCourses } from '../Context/CourseContext'; // Import the useCourses hook

const CoursePage = () => {
  const { courses } = useCourses(); // Access courses from context

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-blue-700 text-white p-6 shadow-md">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-semibold">Available Courses</h1>
          <p className="text-xl mt-2">Enhance your skills with our expertly crafted courses.</p>
        </div>
      </header>

      {/* Courses Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.length === 0 ? (
            <p>No courses available at the moment.</p>
          ) : (
            courses.map((course) => (
              <div key={course.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                <img 
                  src={course.image_url} 
                  alt={course.title || 'Course Image'} 
                  className="w-full h-48 object-cover" 
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-blue-400 mb-4">{course.title || 'Untitled Course'}</h3>
                  <p className="text-gray-600 mb-4">{course.description || 'No description available.'}</p>
                  <a
                    href={`/courses/${course.id}`}
                    className="inline-block bg-green-400 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-blue-700 text-white py-8">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2025 My Website. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default CoursePage;
