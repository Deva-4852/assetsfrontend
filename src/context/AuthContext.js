import { createContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        try {
            const res = await axios.post("http://localhost:5000/login", { email, password });
            localStorage.setItem("token", res.data.token);
            setUser(email);
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const signup = async (email, password) => {
        try {
            await axios.post("http://localhost:5000/signup", { email, password });
            alert("Signup successful. Please log in.");
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
