import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [authToken, setAuthToken] = useState(() => sessionStorage.getItem("token"));
    const [current_user, setCurrentUser] = useState(null);

    console.log("Current user", current_user);

    // LOGIN
    const login = (email, password) => {
        fetch("http://127.0.0.1:5001/login", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then((resp) => resp.json())
        .then((response) => {
            if (response.access_token) {
                sessionStorage.setItem("token", response.access_token);
                setAuthToken(response.access_token);

                fetch('http://127.0.0.1:5001/current_user', {
                    method: "GET",
                    headers: {
                        'Content-type': 'application/json',
                        Authorization: `Bearer ${response.access_token}`,
                    },
                })
                .then((response) => response.json())
                .then((response) => {
                    if (response.email) {
                        setCurrentUser(response);
                    }
                });

                navigate("/");
            } else if (response.error) {
                console.error(response.error);
            } else {
                console.error("Failed to login");
            }
        });
    };

    // LOGOUT
    const logout = () => {
        fetch("http://127.0.0.1:5001/logout", {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then((resp) => resp.json())
        .then((response) => {
            if (response.success) {
                sessionStorage.removeItem("token");
                setAuthToken(null);
                setCurrentUser(null);

                navigate("/login");
            }
        });
    };

    // FETCH CURRENT USER
    useEffect(() => {
        fetchCurrentUser();
    }, []);

    const fetchCurrentUser = () => {
        if (authToken) {
            fetch('http://127.0.0.1:5001/current_user', {
                method: "GET",
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                },
            })
            .then((response) => response.json())
            .then((response) => {
                if (response.email) {
                    setCurrentUser(response);
                }
            });
        }
    };

    // ADD USER (Sign-up)
    const addUser = (username, email, password) => {
        fetch("http://127.0.0.1:5001/users", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        })
        .then((resp) => resp.json())
        .then((response) => {
            if (response.msg) {
                navigate("/login");
            } else if (response.error) {
                console.error(response.error);
            } else {
                console.error("Failed to add user");
            }
        });
    };

    // UPDATE USER
    const updateUser = () => {
        console.log("Updating user:");
    };

    // DELETE USER
    const deleteUser = async (userId) => {
        console.log("Deleting user:", userId);
    };

    const data = {
        authToken,
        login,
        current_user,
        logout,
        addUser,
        updateUser,
        deleteUser,
    };

    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    );
};
