import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Auth from "../src/pages/auth/Auth";
import Assets from "../src/pages/Assets";

const App = () => {
    const [auth, setAuth] = useState(!!localStorage.getItem("token"));

    return (
        <Router>
            <Routes>
                <Route path="/" element={auth ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
                <Route path="/login" element={<Auth setAuth={setAuth} />} />
                <Route path="/dashboard" element={auth ? <Assets setAuth={setAuth} /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
