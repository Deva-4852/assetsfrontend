import React, { useState } from "react";
import { useMutation } from "react-query";
import { login, signup } from "../apicall/api";
import { useNavigate } from "react-router-dom";

const Auth = ({ setAuth }) => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [credentials, setCredentials] = useState({ username: "", password: "" });

    const authMutation = useMutation(isLogin ? login : signup, {
        onSuccess: () => {
            if (isLogin) {
                setAuth(true);
                navigate("/dashboard");
            } else {
                alert("Signup successful! Please log in.");
                setIsLogin(true);
            }
        },
        onError: (error) => alert(error.response?.data?.message || "Something went wrong"),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        authMutation.mutate(credentials);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-3xl font-bold text-center">{isLogin ? "Login" : "Sign Up"}</h2>
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <input
                        type="text"
                        placeholder="Username"
                        className="input input-bordered w-full"
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="input input-bordered w-full"
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    />
                    <button type="submit" className="btn btn-primary w-full">
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button onClick={() => setIsLogin(!isLogin)} className="text-blue-500 hover:underline">
                        {isLogin ? "Sign up" : "Login"}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Auth;
