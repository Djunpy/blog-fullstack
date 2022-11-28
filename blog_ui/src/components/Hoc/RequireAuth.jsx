import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/users/authSlice";

export const RequireAuth = ({ children }) => {
    const location = useLocation();
    const user = useSelector(selectCurrentUser);
    console.log(user);
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return children;
};
