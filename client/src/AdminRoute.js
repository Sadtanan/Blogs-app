import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "./services/authorize";

const AdminRoute = () => {
    return getUser() ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminRoute;