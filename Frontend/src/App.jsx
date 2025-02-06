import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./PAGES/Login";
import Signup from "./PAGES/Signup";
import Home from './PAGES/Home';
import CoursePage from "./PAGES/CoursesPage";
import CourseDetail from "./PAGES/CourseDetail";
import Navbar from "./COMPONENTS/Navbar";
import Footer from "./COMPONENTS/Footer";
import { UserProvider } from "./Context/UserContext";
import { CourseProvider } from "./Context/CourseContext";
import ProfilePage from "./PAGES/Profile"; 
import AdminDashboard from "./PAGES/AdminDashboard";



function App() {
  return (
    <Router>
      <UserProvider>
        <CourseProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/courses" element={<CoursePage />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
          </Routes>
          <Footer />
        </CourseProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
