import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import { defaultClothingItems } from "../../utils/constants";
import MobileUserModal from "../MobileUserModal/MobileUserModal";
import {
  getItems,
  postItems,
  deleteItems,
  updateProfile,
} from "../../utils/api.js";

import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";

import ProtectedRoute from "../ProtectedRoutes.jsx";

import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import { register, login, checkToken } from "../../utils/auth.js";
import LoginModal from "../LoginModal/LoginModal.jsx";

import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import AppContext from "../../contexts/AppContext.js";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    city: "",
    temp: { F: 999, C: 999 },
    type: "",
    condition: "",
    isDay: false,
  });
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({
    imageUrl: "",
    name: "",
    weather: "",
  });
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [userData, setUserData] = useState({ username: "", email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [pendingRoute, setPendingRoute] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const navigate = useNavigate();

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleMobileUserModal = () => {
    setActiveModal("mobile-modal");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    return postItems({ name, weather, imageUrl })
      .then((res) => {
        setClothingItems((prevItems) => [
          { name, imageUrl, weather, _id: res._id },
          ...prevItems,
        ]);
      })
      .then(closeActiveModal);
  };

  const handleCardDelete = () => {
    deleteItems(selectedCard._id)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => {
            return item._id !== selectedCard._id;
          })
        );
      })
      .then(closeActiveModal)
      .catch(console.error);
  };

  useEffect(() => {
    const localWeather = JSON.parse(localStorage.getItem("weather"));

    if (localWeather) {
      setWeatherData(localWeather);
      return;
    }

    if (coordinates && APIkey) {
      getWeather(coordinates, APIkey)
        .then((data) => {
          const filteredData = filterWeatherData(data);
          setWeatherData(filteredData);
        })
        .catch(console.error);
    }
  }, [coordinates, APIkey]);

  useEffect(() => {
    getItems()
      .then((data) => {
        if (data == []) {
          setClothingItems(data);
        }
      })
      .catch(console.error);
  }, []);

  const handleRegistration = ({ name, avatar, email, password }) => {
    register(name, avatar, email, password)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Registration failed");
      })
      .then((data) => {
        closeActiveModal();
        handleLogin({ email, password });
      })
      .catch((err) => {
        console.error("Registration error: ", err);
      });
  };

  const handleLogin = ({ email, password }) => {
    login(email, password)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Login failed");
      })
      .then((data) => {
        localStorage.setItem("jwt", data.token);

        setIsLoggedIn(true);
        setUserData(data.user);
        closeActiveModal();

        if (pendingRoute && typeof pendingRoute === "string") {
          navigate(pendingRoute);
          setPendingRoute(null);
        }
      })
      .catch((err) => {
        console.error("Login error: ", err);
      });

    useEffect(() => {
      const token = localStorage.getItem("jwt");

      if (token) {
        checkToken(token)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            throw new Error("Token is invalid");
          })
          .then((userData) => {
            setUserData(userData);
            setIsLoggedIn(true);
          })
          .catch((err) => {
            localStorage.removeItem("jwt");
            console.error("Token validation failed: ", err);
          });
      }
    }, []);
  };

  const handleUpdateUser = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");

    updateProfile(name, avatar)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("No response from server");
      })
      .then((userData) => {
        setUserData(userData);
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch((err) => {
        localStorage.removeItem("jwt");
        console.error("Token validation failed: ", err);
      });
  };

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
            {selectedCard && (
              <ItemModal
                activeModal={activeModal}
                onClose={closeActiveModal}
                card={selectedCard}
                onClick={handleCardDelete}
              />
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
              isOpen={activeModal === "editProfile"}
              onClose={closeActiveModal}
              onUpdateUser={handleUpdateUser}
            />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}
export default App;
