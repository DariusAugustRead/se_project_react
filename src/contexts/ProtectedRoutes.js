import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppContext from "./AppContext";

export default function ProtectedRoute({ children, anonymous = false }) {
  const { isLoggedIn, setPendingRoute, setShowLoginModal, setActiveModal } =
    useContext(AppContext);

  const location = useLocation();

  useEffect(() => {
    if (!anonymous && !isLoggedIn) {
      setPendingRoute(location.pathname);
      setShowLoginModal(true);
      setActiveModal("");
    }
  }, [
    isLoggedIn,
    anonymous,
    location.pathname,
    setPendingRoute,
    setShowLoginModal,
    setActiveModal,
  ]);

  if (!anonymous && !isLoggedIn) {
    return null;
  }

  return children;
}
