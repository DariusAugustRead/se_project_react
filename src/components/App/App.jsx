import { useEffect, useState } from "react";

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
import { getItems } from "../../utils/api.js";

import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";

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
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

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
    // const newId = Math.max(...clothingItems.map((item) => item._id)) + 1;
    setClothingItems((prevItems) => [
      { name, link: imageUrl, weather },
      ...prevItems,
    ]);
    closeActiveModal();
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
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            weatherData={weatherData}
            handleAddClick={handleAddClick}
            handleMobileUserModal={handleMobileUserModal}
          />
          <Routes>
            <Route
              path="/"
              element={
                // Data to cards here
                <Main
                  weatherData={weatherData}
                  onClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              // ...and here
              element={<Profile onCardClick={handleCardClick} />}
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          onClose={closeActiveModal}
          isOpen={activeModal === "add-garment"}
          onAddItemModalSubmit={handleAddItemModalSubmit}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
        />
        <MobileUserModal
          isOpen={activeModal === "mobile-modal"}
          onClose={closeActiveModal}
          onClick={handleMobileUserModal}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}
export default App;
