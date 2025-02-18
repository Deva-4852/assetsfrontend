import axios from "axios";

const API_URL = "https://assetsbackend.onrender.com";

const getToken = () => localStorage.getItem("token");

export const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    localStorage.setItem("token", response.data.token);
    return response.data;
};

export const signup = async (credentials) => {
    const response = await axios.post(`${API_URL}/signup`, credentials);
    return response.data;
};

export const fetchAssets = async () => {
    const response = await axios.get(`${API_URL}/assets`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
};

export const addAsset = async (asset) => {
    const response = await axios.post(`${API_URL}/assets`, asset, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
};
export const updateAsset = async (asset) => {
    const response = await axios.put(`${API_URL}/assets/${asset.id}`, asset, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
};

export const deleteAsset = async (id) => {
    const response = await axios.delete(`${API_URL}/assets/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
};
