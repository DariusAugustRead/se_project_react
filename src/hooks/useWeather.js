import { useState, useEffect } from "react";
import { getWeather, filterWeatherData } from "../utils/weatherApi";

export default function useWeather(coordinates, APIkey) {
  const [weatherData, setWeatherData] = useState({
    city: "",
    temp: { F: 999, C: 999 },
    type: "",
    condition: "",
    isDay: false,
  });

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

  return { weatherData };
}
