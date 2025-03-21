import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";


const UserContext = createContext();

const AuthContext = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
          const verifyUser = async () => {
            const token = localStorage.getItem("token");
            if(!token){
                console.log("No token found, redirecting to login.");
                setUser(null);
                setLoading(false)
                return
            }
            
            try {
                const response = await axios.get("http://localhost:5000/api/auth/verify", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data.success) {
                    setUser(response.data.user);
                } else {
                    console.log("Token verification failed.");
                    localStorage.removeItem("token");
                    setUser(null);
                }
            } catch (error) {
                console.error("Error verifying token:", error);
                localStorage.removeItem("token");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
    verifyUser()
 } ,[])


 const login = (user, token) => {
    localStorage.setItem("token", token);
    setUser(user);
    console.log("User logged in:", user);
};

const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    console.log("User logged out");
};


    return (
        <UserContext.Provider value={{user, login, logout, loading}}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => useContext(UserContext);

export default AuthContext;
