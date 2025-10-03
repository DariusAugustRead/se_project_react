import { useState, useEffect } from "react";
import { login, logout, register, checkToken } from "../utils/auth.js";

import { updateProfile } from "../utils/api.js";

export default function useAuth(navigate, closeActiveModal) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    checkToken(token)
      .then((user) => {
        setUserData(user);
        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        setIsLoggedIn(false);
      });
  }, []);

  const handleLogin = async ({ email, password }) => {
    const data = await login(email, password);
    localStorage.setItem("jwt", data.token);
    setIsLoggedIn(true);
    setUserData(data.user);
    closeActiveModal();
  };

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setUserData(null);
    closeActiveModal();
    navigate("/");
  };

  const handleRegistration = async ({ name, avatar, email, password }) => {
    await register(name, avatar, email, password);
    closeActiveModal();
    await handleLogin({ email, password });
  };

  const handleUpdateUser = async (name, avatar) => {
    const token = localStorage.getItem("jwt");
    const res = await updateProfile(name, avatar, token);
    setUserData(res.user);
    setIsLoggedIn(true);
    closeActiveModal();
  };

  return {
    isLoggedIn,
    userData,
    handleLogin,
    handleLogout,
    handleRegistration,
    handleUpdateUser,
  };
}
