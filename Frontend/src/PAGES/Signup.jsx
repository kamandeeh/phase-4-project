import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext"; 

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { signup } = useUser();
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!name || !email || !password) {
            setError("Please fill in all fields.");
            setLoading(false);
            return;
        }

        try {
            await signup(name, email, password);
            navigate("/courses"); // Redirect after successful signup
        } catch (err) {
            setError(err.message || "Signup failed.");
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-gray-500 rounded-lg shadow-md">
            <h2 className="text-center text-2xl font-semibold mb-4">Signup</h2>

            {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

            <form onSubmit={handleSignup}>
                <div className="mb-6">
                    <label htmlFor="name" className="block text-sm font-medium text-white">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-white">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                        placeholder="john.doe@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-white">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
                        placeholder="•••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className={`w-full px-5 py-2.5 text-white font-medium rounded-lg text-sm text-center 
                        ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800'}`}
                    disabled={loading}
                >
                    {loading ? "Signing up..." : "Signup"}
                </button>
            </form>
        </div>
    );
};

export default Signup;
