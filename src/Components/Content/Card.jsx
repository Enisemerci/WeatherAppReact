import React, { useEffect, useState } from "react";
import "./Card.css";
import clearDay from "../../Assets/Icons/ClearDay.png";
import clearNight from "../../Assets/Icons/ClearNight.png";
import cloudyDay from "../../Assets/Icons/CloudyDay.png";
import cloudyNight from "../../Assets/Icons/CloudyNight.png";
import fewcloudDay from "../../Assets/Icons/FewcloudDay.png";
import fewcloudNight from "../../Assets/Icons/FewcloudNight.png";
import rainDay from "../../Assets/Icons/RainDay.png";
import rainNight from "../../Assets/Icons/RainNight.png";
import stormDay from "../../Assets/Icons/StormDay.png";
import stormNight from "../../Assets/Icons/StormNight.png";

const Card = ({ weatherData }) => {
  const [backgroundClass, setBackgroundClass] = useState("");

  useEffect(() => {
    if (weatherData && weatherData.list[0].weather[0].main) {
      const weatherMain = weatherData.list[0].weather[0].main.toLowerCase();
      const date = new Date(weatherData.list[0].dt_txt);
      const hour = date.getHours();
      if (hour >= 20 || hour < 6) {
        setBackgroundClass(`weather-bg-n-${weatherMain}`);
        return;
      }
      setBackgroundClass(`weather-bg-${weatherMain}`);
    }
  }, [weatherData]);

  let iconImagePath;

  if (weatherData && weatherData.list[0].weather[0].main) {
    const weatherMain = weatherData.list[0].weather[0].main.toLowerCase();
    const date = new Date(weatherData.list[0].dt_txt);
    const hour = date.getHours();

    switch (weatherMain) {
      case "clear":
        iconImagePath = clearDay;
        if (hour >= 20 || hour < 6) {
          iconImagePath = clearNight;
          break;
        }
        break;
      case "clouds":
        iconImagePath = fewcloudDay;
        if (hour >= 20 || hour < 6) {
          iconImagePath = fewcloudNight;
          break;
        }
        break;
      case "rain":
        iconImagePath = rainDay;
        if (hour >= 20 || hour < 6) {
          iconImagePath = rainNight;
          break;
        }
        break;
      case "haze":
        iconImagePath = cloudyDay;
        if (hour >= 20 || hour < 6) {
          iconImagePath = cloudyNight;
          break;
        }
        break;
      case "snow":
        iconImagePath = stormDay;
        if (hour >= 20 || hour < 6) {
          iconImagePath = stormNight;
          break;
        }
        break;
      case "broken clouds":
        iconImagePath = clearDay;
        if (hour >= 20 || hour < 6) {
          iconImagePath = clearNight;
          break;
        }
        break;

      default:
        iconImagePath = fewcloudDay; // Varsayılan ikon
    }
  }

  return (
    <div className={`card ${backgroundClass}`}>
      <h2 className="card-place">
        {weatherData.city.name}, {weatherData.city.country}
      </h2>
      <p className="card-date">{weatherData.list[0].dt_txt}</p>
      <img className="card-icon" src={iconImagePath} alt="" />
      <h1 className="card-degree">
        {Math.round(weatherData.list[0].main.temp - 273.15)}°C
      </h1>
      <h2 className="card-lmdegree">
        {Math.round(weatherData.list[0].main.temp_min - 273.15)}°C{" "}
        {Math.round(weatherData.list[0].main.temp_max - 273.15)}°C
      </h2>
      <p className="card-desc">{weatherData.list[0].weather[0].description}</p>
    </div>
  );
};

export default Card;
