import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AppContext from "../contexts/AppContext";

export default function ProtectedRoute({ children, anonymous = false }) {
  const { isLoggedIn } = useContext(AppContext);

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
}
