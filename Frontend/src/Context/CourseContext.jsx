import React, { createContext, useContext, useState } from 'react';

// Creating a Context for the Course Data
export const CourseContext = createContext();

// A Provider Component to wrap around the app or the part of it that needs access to the courses data
export const CourseProvider = ({ children }) => {
  const [courses] = useState([
    {
      id: 1,
      title: "Introduction to Web Development",
      description: "Learn the basics of web development, including HTML, CSS, and JavaScript. Start building your first website today!",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYdAdQnrVDOSNpvaWU3ZGrH5gfngFCGZimcQ&s", // Replace with your image
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      description: "Take your JavaScript skills to the next level. Learn advanced concepts like closures, async programming, and more.",
      image: "https://via.placeholder.com/400x250", // Replace with your image
    },
    {
      id: 3,
      title: "React for Beginners",
      description: "Dive into React, one of the most popular JavaScript libraries, and learn how to build modern web apps with it.",
      image: "https://via.placeholder.com/400x250", // Replace with your image
    },
  ]);

  // Optionally, you can also manage selected course or other course-related state here.
  
  return (
    <CourseContext.Provider value={{ courses }}>
      {children}
    </CourseContext.Provider>
  );
};

// Custom Hook to use the Course Context
export const useCourses = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourses must be used within a CourseProvider");
  }
  return context;
};
