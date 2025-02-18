import { useNavigate } from "react-router-dom";
import AssetManagement from "./AssetManagement";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-center">Dashboard</h1>
            <AssetManagement />
            <button onClick={handleLogout} className="btn btn-error w-full mt-6">
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
