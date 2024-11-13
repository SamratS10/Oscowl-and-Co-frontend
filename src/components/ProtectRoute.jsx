import { Navigate, useLocation } from "react-router-dom";

const ProtectRoute = ({ isAuth, user, children }) => {
    const location = useLocation();
    console.log(user)
    // Redirect unauthenticated users to login unless already on auth pages
    if (!isAuth && !(location.pathname.includes("/login") || location.pathname.includes("/register"))) {
        return <Navigate to="/login" />;
    }

    // Redirect authenticated users away from login/register pages based on their role
    if (isAuth && (location.pathname.includes("/login") || location.pathname.includes("/register"))) {
        return <Navigate to="/" />;
    }


    // If all checks pass, render the children
    return <>{children}</>;
};

export default ProtectRoute;
