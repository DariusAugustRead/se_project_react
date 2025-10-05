import { useState, useEffect } from "react";
import { login, logout, register, checkToken } from "../utils/auth.js";

import { updateProfile } from "../utils/api.js";

export default function useAuth(navigate, closeActiveModal) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
      });
  }, []);

  const handleLogin = async ({ email, password }) => {
    try {
      const data = await login(email, password);
      localStorage.setItem("jwt", data.token);
      setIsLoggedIn(true);
      setCurrentUser(data.user);
      closeActiveModal();
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("jwt");
      setIsLoggedIn(false);
      setCurrentUser(null);
      closeActiveModal();
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleRegistration = async ({ name, avatar, email, password }) => {
    try {
      await register(name, avatar, email, password);
      closeActiveModal();
      await handleLogin({ email, password });
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  const handleUpdateUser = async (name, avatar) => {
    try {
      const token = localStorage.getItem("jwt");
      const updatedUser = await updateProfile(name, avatar, token);
      setCurrentUser(updatedUser);
      setIsLoggedIn(true);
      closeActiveModal();
    } catch (err) {
      console.error("Update profile failed:", err);
    }
  };

  return {
    isLoggedIn,
    currentUser,
    handleLogin,
    handleLogout,
    handleRegistration,
    handleUpdateUser,
  };
}
