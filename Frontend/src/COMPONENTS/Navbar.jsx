import { Link } from "react-router-dom";

function Navbar({ logout }){


  return (
    <>
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <h2 className="text-2xl font-bold">CoursePlatform</h2> 
      <div>
            <Link to="/courses" className="mr-4">Courses</Link>          
            <Link to="/signup" className="mr-4">Signup</Link>
            <Link to="/login" className="mr-4">Login</Link>
            <Link onClick={logout} className="mr-4">Logout</Link>
      </div>
    </nav>
    </>
    
  );
};

export default Navbar;