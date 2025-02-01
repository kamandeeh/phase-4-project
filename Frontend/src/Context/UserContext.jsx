import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

// Custom Hook to use the UserContext
export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [authToken, setAuthToken] = useState(() => sessionStorage.getItem("token"));
    const [currentUser, setCurrentUser] = useState(null);

    const login = (email, password) => {
        fetch("https://phase-4-project-kf0b.onrender.com/login", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ email, password }),
        })
        .then((resp) => resp.json())
        .then((response) => {
            if (response.access_token) {
                sessionStorage.setItem("token", response.access_token);
                setAuthToken(response.access_token);

                fetch("https://phase-4-project-kf0b.onrender.com/current_user", {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${response.access_token}`,
                    },
                })
                .then((res) => res.json())
                .then((res) => {
                    if (res.email) {
                        setCurrentUser(res);
                        navigate("/"); // Redirect to home
                    }
                });
            } else {
                console.error("Login failed");
            }
        });
    };

    const logout = () => {
        fetch("https://phase-4-project-kf0b.onrender.com/logout", {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then((resp) => resp.json())
        .then((response) => {
            if (response.success) {
                sessionStorage.removeItem("token");
                setAuthToken(null);
                setCurrentUser(null);
                navigate("/login"); // Redirect after logout
            }
        });
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);

    const fetchCurrentUser = () => {
        if (!authToken) return;
        fetch("https://phase-4-project-kf0b.onrender.com/current_user", {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.email) setCurrentUser(res);
        });
    };

    return (
        <UserContext.Provider value={{ authToken, login, currentUser, logout }}>
            {children}
        </UserContext.Provider>
    );
};
