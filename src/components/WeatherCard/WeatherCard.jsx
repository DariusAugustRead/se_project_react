import cloudyDay from "../../assets/cloudyDay.png";

import "./WeatherCard.css";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F}&deg;F</p>
      <img src={cloudyDay} alt="Sunny Day" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
