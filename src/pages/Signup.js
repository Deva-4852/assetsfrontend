import { useState } from "react";
import { useMutation } from "react-query";
import { signup } from "../pages/apicall/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ username: "", password: "" });

    const signupMutation = useMutation(signup, {
        onSuccess: () => {
            alert("Signup successful! Please login.");
            navigate("/login");
        },
        onError: (error) => alert(error.response?.data?.message || "Signup failed"),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        signupMutation.mutate(credentials);
    };

    return (
        <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-center">Sign Up</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <input
                    type="text"
                    placeholder="Username"
                    className="input input-bordered w-full"
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered w-full mt-3"
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />
                <button type="submit" className="btn btn-primary w-full mt-3">
                    Sign Up
                </button>
            </form>
            <p className="mt-3 text-center">
                Already have an account?{" "}
                <a href="/login" className="text-blue-500">
                    Login
                </a>
            </p>
        </div>
    );
};

export default Signup;
