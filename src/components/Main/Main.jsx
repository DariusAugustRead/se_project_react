import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";
import { useContext } from "react";

function Main({
  weatherData,
  handleCardClick,
  clothingItems,
  handleCardLike,
  userId,
  isLoggedIn,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const temp = weatherData?.temp?.[currentTemperatureUnit];

  const weatherType = weatherData?.type;

  const filteredItems = weatherType
    ? clothingItems.filter((item) => item.weather === weatherType)
    : clothingItems;

  return (
    <main>
      <WeatherCard weatherData={weatherData} />

      <section className="cards">
        <p className="cards__text">
          Today is {temp}&deg;{currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {filteredItems.map((item, index) => (
            <li key={item._id || `fallback-${index}`}>
              <ItemCard
                item={item}
                onCardClick={handleCardClick}
                handleCardLike={handleCardLike}
                userId={userId}
                isLoggedIn={isLoggedIn}
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
