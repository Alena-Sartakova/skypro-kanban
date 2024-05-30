import { Navigate, Outlet } from "react-router-dom";
import { routesPath } from "./pages/routesPath";

export const PrivateRoute = ({ user }) => {
    return user ? <Outlet /> : <Navigate to={routesPath.LOGIN} />;
}