// ─── React & Router ─────────────────────────────
import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// ─── Styles ─────────────────────────────────────
import "./App.css";

// ─── Constants ──────────────────────────────────
import { coordinates, APIkey } from "../../utils/constants";

// ─── Contexts ───────────────────────────────────
import AppContext from "../../contexts/AppContext";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoutes.jsx";

// ─── Hooks ──────────────────────────────────────
import useAuth from "../../hooks/useAuth";
import useClothingItems from "../../hooks/useClothingItems";
import useWeather from "../../hooks/useWeather";

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
  const navigate = useNavigate();

  const [activeModal, setActiveModal] = useState("");
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const closeActiveModal = () => setActiveModal("");

  const {
    clothingItems,
    selectedCard,
    setSelectedCard,
    handleAddItemModalSubmit,
    handleCardDelete,
    handleCardLike,
  } = useClothingItems(closeActiveModal);

  const {
    isLoggedIn,
    currentUser,
    setcurrentUser,
    handleLogin,
    handleLogout,
    handleRegistration,
    handleUpdateUser,
  } = useAuth(navigate, closeActiveModal);

  const { weatherData } = useWeather(coordinates, APIkey);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleMobileUserModal = () => {
    setActiveModal("mobile-modal");
  };

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        currentUser,
        setcurrentUser,
        setActiveModal,
      }}
    >
      <CurrentUserContext.Provider value={{ currentUser, setcurrentUser }}>
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
                      userId={currentUser?._id || ""}
                      isLoggedIn={isLoggedIn}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute isLoggedIn={isLoggedIn}>
                      <Profile
                        onCardClick={handleCardClick}
                        clothingItems={clothingItems}
                        handleAddClick={handleAddClick}
                        setActiveModal={setActiveModal}
                        handleLogout={handleLogout}
                        handleCardLike={handleCardLike}
                        currentUser={currentUser}
                        isLoggedIn={isLoggedIn}
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
                  isOwn={selectedCard?.owner === currentUser?._id}
                />
              </>
            )}
            <MobileUserModal
              isOpen={activeModal === "mobile-modal"}
              onClose={closeActiveModal}
              handleAddClick={handleAddClick}
              currentUser={currentUser}
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
