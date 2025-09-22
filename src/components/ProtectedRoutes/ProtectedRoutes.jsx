import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppContext from "../contexts/AppContext";

export default function ProtectedRoute({ children, anonymous = false }) {
  const { isLoggedIn, setPendingRoute, setShowLoginModal, setActiveModal } =
    useContext(AppContext);

  const location = useLocation();

  useEffect(() => {
    if (!anonymous && !isLoggedIn) {
      // Save the intended route and trigger login modal
      setPendingRoute(location.pathname);
      setShowLoginModal(true);
      setActiveModal("login");
    }
  }, [
    isLoggedIn,
    anonymous,
    location.pathname,
    setPendingRoute,
    setShowLoginModal,
    setActiveModal,
  ]);

  // If user is not logged in and route is protected, don't render anything
  if (!anonymous && !isLoggedIn) {
    return null;
  }

  // If route is anonymous and user is logged in, redirect logic could go here
  // Example: redirect logged-in users away from login/register pages
  // But since you're using modals, you may not need this block

  return children;
}
