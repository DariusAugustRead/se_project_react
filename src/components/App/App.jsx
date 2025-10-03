// ─── React & Router ─────────────────────────────
import { useCallback, useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// ─── Styles ─────────────────────────────────────
import "./App.css";

// ─── Constants ──────────────────────────────────
import { coordinates, APIkey } from "../../utils/constants";

// ─── Contexts ───────────────────────────────────
import AppContext from "../../contexts/AppContext";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../../contexts/ProtectedRoutes";

// ─── API & Utils ────────────────────────────────
import * as api from "../../utils/api";
import {
  getItems,
  postItems,
  deleteItems,
  updateProfile,
} from "../../utils/api";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { register, login, logout, checkToken } from "../../utils/auth";

// ─── Components ─────────────────────────────────
import AddItemModal from "../AddItemModal/AddItemModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ItemModal from "../ItemModal/ItemModal";
import LoginModal from "../LoginModal/LoginModal";
import Main from "../Main/Main";
import MobileUserModal from "../MobileUserModal/MobileUserModal";
import Profile from "../Profile/Profile";
import RegisterModal from "../RegisterModal/RegisterModal";

function App() {
  // ─── State ─────────────────────────────────────
  const [clothingItems, setClothingItems] = useState([]);
  const [weatherData, setWeatherData] = useState({
    city: "",
    temp: { F: 999, C: 999 },
    type: "",
    condition: "",
    isDay: false,
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pendingRoute, setPendingRoute] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const navigate = useNavigate();

  // ─── UI Handlers ───────────────────────────────
  const handleToggleSwitchChange = () =>
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));

  const handleAddClick = () => setActiveModal("add-garment");
  const handleMobileUserModal = () => setActiveModal("mobile-modal");
  const closeActiveModal = () => setActiveModal("");

  // ─── Modal Logic ───────────────────────────────
  const handleCardClick = useCallback(
    (card) => {
      setSelectedCard(card);
      setActiveModal("preview");
    },
    [userData]
  );

  // ─── Item Actions ──────────────────────────────
  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    return postItems({ name, weather, imageUrl })
      .then((res) => {
        const items = res.data;
        if (Array.isArray(items)) setClothingItems(items);
      })
      .then(closeActiveModal)
      .catch(console.error);
  };

  const handleCardDelete = () => {
    if (!selectedCard?._id) return;
    deleteItems(selectedCard._id)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== selectedCard._id)
        );
      })
      .then(closeActiveModal)
      .catch(console.error);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    const request = isLiked
      ? api.removeCardLike(id, token)
      : api.addCardLike(id, token);

    request.then((response) => {
      const updatedCard = response.data;
      if (!updatedCard?._id || !Array.isArray(updatedCard.likes)) return;

      setClothingItems((cards) =>
        cards.map((item) =>
          item._id === updatedCard._id
            ? { ...item, likes: [...updatedCard.likes] }
            : item
        )
      );
    });
  };

  // ─── Auth Handlers ─────────────────────────────
  const handleLogin = async ({ email, password }) => {
    try {
      const data = await login(email, password);
      localStorage.setItem("jwt", data.token);
      setIsLoggedIn(true);
      setUserData({
        _id: data.user._id,
        name: data.user.name,
        avatar: data.user.avatar,
        email: data.user.email,
      });
      closeActiveModal();
      navigate(pendingRoute?.trim() || "/");
      setPendingRoute(null);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("jwt");
      setIsLoggedIn(false);
      setUserData(null);
      setSelectedCard(null);
      closeActiveModal();
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleRegistration = async ({ name, avatar, email, password }) => {
    try {
      const res = await register(name, avatar, email, password);
      closeActiveModal();
      await handleLogin({ email, password });
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  const handleUpdateUser = async (name, avatar) => {
    try {
      const token = localStorage.getItem("jwt");
      const res = await updateProfile(name, avatar, token);
      setUserData(userData);
      setIsLoggedIn(true);
      closeActiveModal();
    } catch (err) {
      localStorage.removeItem("jwt");
      console.error("Token validation failed:", err);
    }
  };

  // ─── Effects ───────────────────────────────────
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    checkToken(token)
      .then((userData) => {
        setUserData(userData);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        localStorage.removeItem("jwt");
        console.error("Token validation failed:", err);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((res) => {
        const items = res.data;
        if (Array.isArray(items)) setClothingItems(items);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  useEffect(() => {
    const localWeather = JSON.parse(localStorage.getItem("weather"));
    if (localWeather) {
      setWeatherData(localWeather);
      return;
    }

    if (coordinates && APIkey) {
      getWeather(coordinates, APIkey)
        .then((data) => setWeatherData(filterWeatherData(data)))
        .catch(console.error);
    }
  }, [coordinates, APIkey]);

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        pendingRoute,
        setPendingRoute,
        showLoginModal,
        setShowLoginModal,
        setActiveModal,
      }}
    >
      <CurrentUserContext.Provider value={userData}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page">
            <div className="page__content">
              <Header
                weatherData={weatherData}
                handleAddClick={handleAddClick}
                handleMobileUserModal={handleMobileUserModal}
                isLoggedIn={isLoggedIn}
                handleRegistration={handleRegistration}
                handleLogin={handleLogin}
                setActiveModal={setActiveModal}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleCardLike={handleCardLike}
                      userId={userData?._id || ""}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile
                        onCardClick={handleCardClick}
                        clothingItems={clothingItems}
                        handleAddClick={handleAddClick}
                        setActiveModal={setActiveModal}
                        handleLogout={handleLogout}
                        isOwn={true}
                      />
                    </ProtectedRoute>
                  }
                />
              </Routes>
              <Footer />
            </div>
            <AddItemModal
              onClose={closeActiveModal}
              isOpen={activeModal === "add-garment"}
              onAddItemModalSubmit={handleAddItemModalSubmit}
            />
            {selectedCard && selectedCard.owner && (
              <>
                <ItemModal
                  activeModal={activeModal}
                  onClose={closeActiveModal}
                  card={selectedCard}
                  onClick={handleCardDelete}
                  handleCardLike={handleCardLike}
                  isOwn={selectedCard?.owner === userData?._id}
                />
              </>
            )}
            <MobileUserModal
              isOpen={activeModal === "mobile-modal"}
              onClose={closeActiveModal}
              onClick={handleMobileUserModal}
            />
            <RegisterModal
              isOpen={activeModal === "register"}
              onClose={closeActiveModal}
              onClick={handleRegistration}
              activeModal={activeModal}
              setActiveModal={setActiveModal}
            />
            <LoginModal
              isOpen={activeModal === "login"}
              onClose={closeActiveModal}
              onClick={handleLogin}
              activeModal={activeModal}
              setActiveModal={setActiveModal}
            />
            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onClose={closeActiveModal}
              onUpdateUser={handleUpdateUser}
              setActiveModal={setActiveModal}
            />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}
export default App;
