import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const navigate = useNavigate();
  const { authToken } = useContext(UserContext);

  const [courses, setCourses] = useState([]);
  const [courseDetails, setCourseDetails] = useState(null);

  const [onChange, setOnchange] = useState(true);

  useEffect(() => {
    fetch("https://phase-4-project-kf0b.onrender.com/courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        toast.error("Failed to fetch courses.");
      });
  }, [onChange]);

  const addCourse = (title, description, price, image) => {
    toast.loading("Adding course...");

    fetch("https://phase-4-project-kf0b.onrender.com/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ title, description, price, image }),
    })
      .then((resp) => resp.json())
      .then((response) => {
        if (response.success) {
          toast.dismiss();
          toast.success("Course added successfully!");
          setOnchange(!onChange);
        } else if (response.error) {
          toast.dismiss();
          toast.error(response.error);
        } else {
          toast.dismiss();
          toast.error("Failed to add course.");
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error("Failed to add course.");
        console.error("Error adding course:", error);
      });
  };

  const updateCourse = (id, title, description, price, image) => {
    toast.loading("Updating course...");

    fetch(`https://phase-4-project-kf0b.onrender.com/course/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ title, description, price, image }),
    })
      .then((resp) => resp.json())
      .then((response) => {
        if (response.success) {
          toast.dismiss();
          toast.success("Course updated successfully!");
          setOnchange(!onChange);
        } else if (response.error) {
          toast.dismiss();
          toast.error(response.error);
        } else {
          toast.dismiss();
          toast.error("Failed to update course.");
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error("Failed to update course.");
        console.error("Error updating course:", error);
      });
  };

  const deleteCourse = (id) => {
    toast.loading("Deleting course...");

    fetch(`https://phase-4-project-kf0b.onrender.com/course/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((resp) => resp.json())
      .then((response) => {
        if (response.success) {
          toast.dismiss();
          toast.success("Course deleted successfully!");
          setOnchange(!onChange);
          navigate("/");
        } else if (response.error) {
          toast.dismiss();
          toast.error(response.error);
        } else {
          toast.dismiss();
          toast.error("Failed to delete course.");
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error("Failed to delete course.");
        console.error("Error deleting course:", error);
      });
  };

  const getCourseDetails = (id) => {
    fetch(`https://phase-4-project-kf0b.onrender.com/course/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCourseDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching course details:", error);
        toast.error("Failed to fetch course details.");
      });
  };

  const data = {
    courses,
    courseDetails,
    addCourse,
    updateCourse,
    deleteCourse,
    getCourseDetails,
  };

  return <CourseContext.Provider value={data}>{children}</CourseContext.Provider>;
};

// Custom Hook to access the course context
export const useCourses = () => {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourses must be used within a CourseProvider");
  }
  return context;
};
