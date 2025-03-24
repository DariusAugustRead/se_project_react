import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";
import { useContext } from "react";

function Main({ weatherData, handleCardClick, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData?.temp[currentTemperatureUnit]}&deg;
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => item.weather === weatherData?.type)
            .map((filteredItem) => (
              <ItemCard
                key={filteredItem._id}
                item={filteredItem}
                onCardClick={handleCardClick}
              />
            ))}
        </ul>
      </section>
      <button className="cards__randomizer">
        <img
          src="../../assets/randomize-arrow.svg"
          alt="randomizer arrow"
          className="cards__randomizer-arrow"
        />
        Randomize
      </button>
    </main>
  );
}

export default Main;
