import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./PAGES/Login";
import Signup from "./PAGES/Signup";
import Homepage from './PAGES/Home';
import CoursePage from "./PAGES/CoursesPage";
import CourseDetail from "./PAGES/CourseDetail";
import Navbar from "./COMPONENTS/Navbar";
import Footer from "./COMPONENTS/Footer";


function App() {
  return (
    <Router> {/* Wrap the entire app with BrowserRouter (Router) */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
      </Routes>
      <Footer />
    </Router> // Close the Router here
  );
}

export default App;
