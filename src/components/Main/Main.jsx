import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";
import { useContext } from "react";

function Main({ weatherData, handleCardClick, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // const filteredItems = clothingItems.filter(
  //   (item) => item.weather?.toLowerCase() === weatherData?.type.toLowerCase()
  // );

  const filteredItems = clothingItems;

  return (
    <main>
      <WeatherCard weatherData={weatherData} />

      <section className="cards">
        <p className="cards__text">
          Today is {weatherData?.temp[currentTemperatureUnit]}&deg;
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {filteredItems.map((item, index) => (
            <li key={item._id || `fallback-${index}`}>
              <ItemCard item={item} onCardClick={handleCardClick} />
            </li>
          ))}
        </ul>
      </section>
      {/* <button className="cards__randomizer">
        <img
          src="../../assets/randomize-arrow.svg"
          alt="randomizer arrow"
          className="cards__randomizer-arrow"
        />
        Randomize
      </button> */}
    </main>
  );
}

export default Main;
