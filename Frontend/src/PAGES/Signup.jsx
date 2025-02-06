import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

function Signup() {
  const { addUser } = useContext(UserContext); // Accessing the addUser function from context
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser(formData.username, formData.email, formData.password); // Pass form data to addUser
    navigate("/login"); // Redirect to login after signup
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto mt-10 border rounded">
      <h2 className="text-2xl mb-4">Signup</h2>
      <input
        className="block border p-2 w-full"
        type="text"
        name="username" // Fixed the name to "username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        className="block border p-2 w-full mt-2"
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        className="block border p-2 w-full mt-2"
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-3 w-full">
        Signup
      </button>
    </form>
  );
}

export default Signup;
