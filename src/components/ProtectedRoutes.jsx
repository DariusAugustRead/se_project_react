import { Navigate } from "react-router-dom";

function ProtectedRoutes({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoutes;
