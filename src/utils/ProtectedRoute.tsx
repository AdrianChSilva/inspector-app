import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import Navigation from "./Navigation";

const ProtectedRoute = () => {
  const user = useUserStore((state) => state.user);
  return user ? (
    <div className="pb-16">
      <Outlet />
      <Navigation />
    </div>
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;
