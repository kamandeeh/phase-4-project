import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

// Custom Hook to use the UserContext
export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [authToken, setAuthToken] = useState(() => sessionStorage.getItem("token"));
    const [current_user, setCurrentUser] = useState(null);

    const signup = async (name, email, password) => {
        try {
            const response = await fetch("https://phase-4-project-kf0b.onrender.com/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                throw new Error("Signup failed");
            }

            const data = await response.json();
            if (data.access_token) {
                sessionStorage.setItem("token", data.access_token);
                setAuthToken(data.access_token);
                await fetchCurrentUser(data.access_token);
                navigate("/courses");
            } else {
                throw new Error(data.error || "Signup error");
            }
        } catch (error) {
            console.error("Signup error:", error.message);
            throw error;
        }
    };

    const login = async (email, password) => {
        try {
            const response = await fetch("https://phase-4-project-kf0b.onrender.com/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) throw new Error("Login failed");

            const data = await response.json();
            if (data.access_token) {
                sessionStorage.setItem("token", data.access_token);
                setAuthToken(data.access_token);
                await fetchCurrentUser(data.access_token);
                navigate("/courses");
            } else {
                throw new Error("Invalid credentials");
            }
        } catch (error) {
            console.error("Login error:", error.message);
            throw error;
        }
    };

    const fetchCurrentUser = async (token = authToken) => {
        if (!token) return;

        try {
            const response = await fetch("https://phase-4-project-kf0b.onrender.com/current_user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error("Failed to fetch user");

            const data = await response.json();
            if (data.email) setCurrentUser(data);
        } catch (error) {
            console.error("Fetch user error:", error.message);
        }
    };

    return (
        <UserContext.Provider value={{ authToken, login, signup, current_user }}>
            {children}
        </UserContext.Provider>
    );
};
